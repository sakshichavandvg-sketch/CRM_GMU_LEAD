import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const telecallerFollowupService = {
  getFollowups: async (params) => {
    const { tab = "today", ...filters } = params;
    
    const queryParams = new URLSearchParams({
      tab: tab.toString(),
    });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.TELECALLER.FOLLOWUPS}?${queryParams.toString()}`
    );

    return response.data.data;
  },

  createFollowup: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TELECALLER.FOLLOWUPS, data);
    return response.data.data;
  },

  updateFollowup: async (id, data) => {
    const response = await axiosInstance.patch(API_ENDPOINTS.TELECALLER.FOLLOWUP_DETAILS(id), data);
    return response.data.data;
  },

  deleteFollowup: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.TELECALLER.FOLLOWUP_DETAILS(id));
    return response.data.data;
  }
};
