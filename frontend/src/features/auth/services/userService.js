import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const userService = {
  getCurrentUser: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.AUTH.ME);
    return response.data;
  },
};

export default userService;