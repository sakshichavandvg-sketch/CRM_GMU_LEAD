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
      const resData = response.data?.data || response.data;
      return Array.isArray(resData) ? resData : (resData?.content || resData?.calls || []);
    } catch (error) {
      console.warn("Failed to fetch call history:", error?.message || error);
      throw error;
    }
  },

  /**
   * Fetch a specific recording by interaction ID.
   * Handles both Blob (audio file) and JSON (recording URL) responses.
   * @param {string|number} interactionId
   * @returns {Promise<Blob|Object>} The recording Blob or JSON object.
   */
  getRecording: async (interactionId) => {
    try {
      const response = await axios.get(API_ENDPOINTS.TELECALLER.VOICE.RECORDING(interactionId), {
        responseType: 'blob' // Expect blob, fallback to text/json parsing if needed
      });
      
      const contentType = response.headers['content-type'] || response.headers['Content-Type'];
      if (contentType && contentType.includes('application/json')) {
        const text = await response.data.text();
        return JSON.parse(text);
      }
      
      return response.data;
    } catch (error) {
      console.warn(`Failed to fetch recording for ${interactionId}:`, error?.message || error);
      throw error;
    }
  },
};
