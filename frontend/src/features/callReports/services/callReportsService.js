import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const callReportsService = {
  /**
   * Fetch aggregated performance summary per telecaller.
   * Maps to: GET /api/leads/calls/users
   * @param {Object} params - { page, size, search, dateFrom, dateTo }
   */
  getTelecallerPerformance: async (params = {}) => {
    const { page = 0, size = 10, search = "", date = "" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    if (date) {
      queryParams.append("dateFrom", `${date}T00:00:00`);
      queryParams.append("dateTo", `${date}T23:59:59`);
    }

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.REPORTS.USERS}?${queryParams.toString()}`
    );

    return response.data?.data ?? response.data;
  },

  /**
   * Fetch paginated call logs for a specific telecaller.
   * Maps to: GET /api/leads/calls/individual
   * @param {string|number} userId - The telecaller's user ID
   * @param {Object} params - { page, size, search, status, dateFrom, dateTo }
   */
  getTelecallerCallLogs: async (userId, params = {}) => {
    const { page = 0, size = 10, search = "", status = "", dateFrom = "", dateTo = "", direction = "", hasRecording = "" } = params;

    const queryParams = new URLSearchParams({
      empId: userId.toString(),
      page: page.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    if (status) queryParams.append("status", status.toUpperCase().replace(" ", "_"));
    if (dateFrom && dateTo) {
      queryParams.append("dateFrom", `${dateFrom}T00:00:00`);
      queryParams.append("dateTo", `${dateTo}T23:59:59`);
    } else if (dateFrom) {
      queryParams.append("dateFrom", `${dateFrom}T00:00:00`);
    } else if (dateTo) {
      queryParams.append("dateTo", `${dateTo}T23:59:59`);
    }
    if (direction) queryParams.append("direction", direction.toUpperCase());
    if (hasRecording) queryParams.append("hasRecording", hasRecording);

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.REPORTS.INDIVIDUAL}?${queryParams.toString()}`
    );

    const responseData = response.data?.data ?? response.data;
    
    // Normalize identifier: interactionId -> callId
    if (responseData?.content && Array.isArray(responseData.content)) {
      responseData.content = responseData.content.map(call => ({
        ...call,
        callId: call.callId || call.interactionId || call.id
      }));
    } else if (Array.isArray(responseData)) {
      return responseData.map(call => ({
        ...call,
        callId: call.callId || call.interactionId || call.id
      }));
    }

    return responseData;
  },
};

export default callReportsService;
