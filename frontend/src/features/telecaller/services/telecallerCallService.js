import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const telecallerCallService = {
  getCalls: async (params) => {
    const { pageParam = 0, size = 10, search = "", ...filters } = params;
    
    const queryParams = new URLSearchParams({
      page: pageParam.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.TELECALLER.CALLS}?${queryParams.toString()}`
    );

    return response.data.data;
  },

  getCallDetails: async (callId) => {
    const response = await axiosInstance.get(API_ENDPOINTS.TELECALLER.CALL_DETAILS(callId));
    return response.data.data;
  },

  updateCall: async (callId, data) => {
    const response = await axiosInstance.patch(API_ENDPOINTS.TELECALLER.CALL_DETAILS(callId), data);
    return response.data.data;
  }
};
