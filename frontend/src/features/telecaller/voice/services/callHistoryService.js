import axios from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

export const callHistoryService = {
  /**
   * Fetch call history for the authenticated telecaller.
   * @returns {Promise<Array>} Array of interaction records.
   */
  getCallHistory: async ({ page = 0, size = 100 } = {}) => {
    try {
      const response = await axios.get(`${API_ENDPOINTS.TELECALLER.CALLS}?page=${page}&size=${size}`);
      // Assuming response.data could be a list, or an object containing 'content' (Spring Page) or 'calls'
      return Array.isArray(response.data) ? response.data : (response.data?.content || response.data?.calls || []);
    } catch (error) {
      console.warn("Failed to fetch call history:", error?.message || error);
      throw error;
    }
  },
};
