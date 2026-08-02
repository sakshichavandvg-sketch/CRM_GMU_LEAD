import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { leadsData } from "../leads/data";

const getScenarioResponse = (successData) => {
  const scenario = env.MOCK_SCENARIO;
  switch (scenario) {
    case "unauthorized": return [401, { success: false, message: "Unauthorized access" }];
    case "forbidden": return [403, { success: false, message: "Forbidden" }];
    case "validation": return [400, { success: false, message: "Validation failed" }];
    case "server-error": return [500, { success: false, message: "Internal server error" }];
    case "success":
    default: return [200, successData];
  }
};

export const setupLeadHandlers = (mock) => {
  mock.onGet(new RegExp(`^${API_ENDPOINTS.LEADS.LIST}(\\?.*)?$`)).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Leads fetched successfully",
      data: {
        content: leadsData.list,
        totalElements: leadsData.list.length,
        totalPages: 1,
        number: 0,
        size: 10
      }
    });
  });

  mock.onGet(API_ENDPOINTS.LEADS.COUNTS).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Lead counts fetched successfully",
      data: leadsData.counts
    });
  });

  mock.onGet(API_ENDPOINTS.LEADS.FILTER_OPTIONS).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Filter options fetched successfully",
      data: leadsData.filterOptions
    });
  });
};
