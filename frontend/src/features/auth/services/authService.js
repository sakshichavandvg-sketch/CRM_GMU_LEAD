import axiosInstance from "@/lib/axios";

const authService = {
  /**
   * Login User
   * @param {Object} credentials
   * @param {string} credentials.username
   * @param {string} credentials.password
   */
  login: async (credentials) => {
    console.log(credentials)
    const response = await axiosInstance.post(
      "/api/leads/auth/login",   // <-- updated path
      credentials
    );

    console.log("Login Response:", response.data); // Log the response data

    return response.data;
  },
};

export default authService;
