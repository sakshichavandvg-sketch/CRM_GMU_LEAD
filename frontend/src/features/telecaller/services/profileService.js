import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const profileService = {
  getProfile: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
    return response.data.data;
  },

  updateProfile: async (data) => {
    const response = await axiosInstance.put(API_ENDPOINTS.AUTH.PROFILE, data);
    return response.data.data;
  },

  changePassword: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
    return response.data.data;
  },

  uploadAvatar: async (formData) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TELECALLER.AVATAR, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  }
};
