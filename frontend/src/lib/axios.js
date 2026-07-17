import axios from "axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log(" Response success:", response.config.url, response.status);
    return response;
  },

  async (error) => {
    const originalRequest = error.config;
    console.log(" Response error caught:", error.response?.status, originalRequest?.url);

    // Ignore non-authentication errors
    if (error.response?.status !== 401) {
      console.log(" Non-401 error, passing through");
      return Promise.reject(error);
    }

    // Don't retry the same request twice
    if (originalRequest._retry) {
      console.log(" Already retried once, rejecting");
      return Promise.reject(error);
    }

    // Don't try to refresh if the refresh request itself failed
    if (originalRequest.url === API_ENDPOINTS.AUTH.REFRESH) {
      console.log(" Refresh request itself failed, rejecting");
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    console.log(" Attempting token refresh...");

    try {
      await axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH);
      console.log(" Refresh successful, retrying original request:", originalRequest.url);

      return axiosInstance(originalRequest);
    } catch (refreshError) {
      console.log(" Refresh failed:", refreshError.response?.status);
      return Promise.reject(refreshError);
    }
  }
);

export default axiosInstance;
