import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const userService = {
  async getCurrentUser() {
     console.log("Fetching current user...");
    const { data } = await axiosInstance.get(
      API_ENDPOINTS.AUTH.ME
    );
    console.log("response", data);

    return data;
  },
};

export default userService;