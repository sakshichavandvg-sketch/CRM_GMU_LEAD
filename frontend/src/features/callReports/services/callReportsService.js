import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const callReportsService = {
  /**
   * Fetch aggregated performance summary per telecaller.
   * Maps to: GET /api/leads/calls/users
   * @param {Object} params - { page, size, search, dateFrom, dateTo }
   */
  getTelecallerPerformance: async (params = {}) => {
    const { page = 0, size = 10, search = "", dateFrom = "", dateTo = "" } = params;

    const queryParams = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);

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
    const { page = 0, size = 10, search = "", status = "", dateFrom = "", dateTo = "" } = params;

    const queryParams = new URLSearchParams({
      userId: userId.toString(),
      page: page.toString(),
      size: size.toString(),
    });

    if (search) queryParams.append("search", search);
    if (status) queryParams.append("status", status);
    if (dateFrom) queryParams.append("dateFrom", dateFrom);
    if (dateTo) queryParams.append("dateTo", dateTo);

    const response = await axiosInstance.get(
      `${API_ENDPOINTS.REPORTS.INDIVIDUAL}?${queryParams.toString()}`
    );

    return response.data?.data ?? response.data;
  },
};

export default callReportsService;
