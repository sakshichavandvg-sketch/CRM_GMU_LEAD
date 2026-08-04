import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";
import { mapFollowup } from "../mappers/telecallerViewModelMapper";

export const telecallerFollowupService = {
  getFollowups: async (params) => {
    const { tab = "today", ...filters } = params;
    
    const queryParams = new URLSearchParams({
      tab: tab.toString(),
    });
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) queryParams.append(key, value);
    });

    const url = `${API_ENDPOINTS.TELECALLER.FOLLOWUPS}?${queryParams.toString()}`;
    
    const response = await axiosInstance.get(url);
    const data = response.data?.data;
    
    let combined = data?.content || [];
    const totalPages = data?.totalPages || 1;
    const totalElements = data?.totalElements || combined.length;
    
    if (totalPages > 1) {
      for (let i = 1; i < totalPages; i++) {
        const nextParams = new URLSearchParams(queryParams);
        nextParams.set('page', i);
        
        const nextResponse = await axiosInstance.get(`${API_ENDPOINTS.TELECALLER.FOLLOWUPS}?${nextParams.toString()}`);
        const nextContent = nextResponse.data?.data?.content || [];
        combined = combined.concat(nextContent);
      }
    }

    console.log(
      "[Followups] Loaded",
      combined.length,
      "records across",
      totalPages,
      "pages"
    );

    return combined.map(mapFollowup);
  },

  createFollowup: async (data) => {
    const response = await axiosInstance.post(API_ENDPOINTS.TELECALLER.FOLLOWUPS, data);
    return mapFollowup(response.data.data);
  },

  updateFollowup: async (id, data) => {
    console.log("[telecallerFollowupService] ========== PAYLOAD INSIDE SERVICE ==========");
    console.log("[telecallerFollowupService] ID:", id);
    console.log("[telecallerFollowupService] Data before axios:", JSON.stringify(data, null, 2));
    const response = await axiosInstance.patch(API_ENDPOINTS.TELECALLER.FOLLOWUP_DETAILS(id), data);
    console.log("[telecallerFollowupService] Response status:", response.status);
    console.log("[telecallerFollowupService] Response body:", JSON.stringify(response.data, null, 2));
    return mapFollowup(response.data.data);
  },

  deleteFollowup: async (id) => {
    const response = await axiosInstance.delete(API_ENDPOINTS.TELECALLER.FOLLOWUP_DETAILS(id));
    return response.data.data;
  }
};
