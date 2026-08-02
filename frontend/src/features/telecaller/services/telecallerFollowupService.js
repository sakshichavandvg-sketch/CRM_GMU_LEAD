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

    const url = `${API_ENDPOINTS.TELECALLER.FOLLOWUPS}?${queryParams.toString()}`;
    
    // 1 & 2: Log URL and Query Parameters
    console.log("1. Full Request URL:", url);
    console.log("2. Query Parameters:", queryParams.toString());

    // 3: Log Request Headers (can be extracted via axios interceptors or request config, but we'll try to log what axiosInstance holds as defaults)
    console.log("3. Default Request Headers:", Object.keys(axiosInstance.defaults.headers).reduce((acc, key) => {
      if (key !== 'common') acc[key] = axiosInstance.defaults.headers[key];
      return acc;
    }, { ...axiosInstance.defaults.headers.common }));
    
    // 5: Try to extract user info from localStorage if present
    try {
      const userStr = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
      console.log("5. Current Logged-in Telecaller:", userStr ? JSON.parse(userStr) : "Not found in localStorage");
    } catch (e) {
      console.log("5. Current Logged-in Telecaller: Error parsing");
    }

    const response = await axiosInstance.get(url);

    // 4: Raw response body
    console.log("4. Raw Response Body:", response.data);

    const followups = response.data?.data?.content || [];
    console.log("Mapped followups:", followups);

    return followups;
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
