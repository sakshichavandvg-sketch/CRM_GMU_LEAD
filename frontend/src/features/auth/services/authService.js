import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const authService = {
  async login(payload) {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );
    console.log("Login response:", data); //  Console display
    return data;
  },

  async logout() {
    const { data } = await axiosInstance.post(
      API_ENDPOINTS.AUTH.LOGOUT
    );
    console.log("Logout response:", data); //  Console display
    return data;
  },
};

export default authService;
