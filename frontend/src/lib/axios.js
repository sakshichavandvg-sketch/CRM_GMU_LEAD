import axios from "axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";

const axiosInstance = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

let refreshPromise = null;

const logAuth = (message, ...args) => {
  if (process.env.NODE_ENV === "development") {
    console.log(message, ...args);
  }
};

axiosInstance.interceptors.request.use((config) => {
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    // Ignore non-authentication errors
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Infinite Retry Protection
    const url = originalRequest.url || "";
    if (
      url === API_ENDPOINTS.AUTH.LOGIN ||
      url === API_ENDPOINTS.AUTH.REFRESH ||
      url === API_ENDPOINTS.AUTH.LOGOUT
    ) {
      logAuth(" [Auth] Infinite retry protected URL, rejecting:", url);
      return Promise.reject(error);
    }

    // Don't retry the same request twice
    if (originalRequest._retry) {
      logAuth(" [Auth] Already retried once, rejecting");
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!refreshPromise) {
      logAuth(" [Auth] Refresh started");
      
      // Use a clean axios instance to avoid interceptor recursion
      refreshPromise = axios
        .post(
          `${env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
          {},
          { withCredentials: true }
        )
        .then(() => {
          logAuth(" [Auth] Refresh succeeded");
        })
        .catch((refreshError) => {
          logAuth(" [Auth] Refresh failed:", refreshError.response?.status);
          return Promise.reject(refreshError);
        })
        .finally(() => {
          refreshPromise = null;
        });
    } else {
      logAuth(" [Auth] Reusing existing refresh request");
    }

    try {
      await refreshPromise;
      logAuth(" [Auth] Retrying original request:", originalRequest.url);
      return axiosInstance(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }
);

// Initialize Frontend Development Mode mocks
if (env.FRONTEND_ONLY) {
  const { initializeMocks } = require("@/mocks/setup");
  initializeMocks(axiosInstance);
}

export default axiosInstance;
