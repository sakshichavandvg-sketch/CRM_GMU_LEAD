import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const dashboardService = {
  getStats: async (params) => {
    const { data } = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS, { params });
    return data.data; // Assuming the standard envelope { success, message, data: { overall: ... } }
  },
};

export default dashboardService;
