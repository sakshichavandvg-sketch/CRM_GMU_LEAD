import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const telecallerInteractionService = {
  logCall: async (payload) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TELECALLER.INTERACTIONS, payload);
    return response.data.data;
  }
};
