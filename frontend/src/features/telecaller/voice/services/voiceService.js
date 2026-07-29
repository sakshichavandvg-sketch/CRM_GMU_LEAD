import api from "@/lib/axios"; // Assuming api is configured in axios
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const voiceService = {
  /**
   * Fetch a Twilio Access Token for the authenticated telecaller.
   * @returns {Promise<string>} The JWT token string.
   */
  getVoiceToken: async () => {
    try {
      const res = await api.get(API_ENDPOINTS.TELECALLER.VOICE.TOKEN);
      return res.data?.data?.token || res.data?.data || res.data?.token || res.data;
    } catch (error) {
      console.warn("Failed to fetch voice token:", error?.message || error);
      throw error;
    }
  },
};
