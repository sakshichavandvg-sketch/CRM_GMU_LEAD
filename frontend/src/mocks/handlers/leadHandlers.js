import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";

import overviewSuccess from "../responses/leads/overview.json";
import filterOptionsSuccess from "../responses/leads/filter-options.json";

/**
 * Utility to return response based on the configured mock scenario
 */
const getScenarioResponse = (successData) => {
  const scenario = env.MOCK_SCENARIO;

  switch (scenario) {
    case "unauthorized":
      return [401, { success: false, message: "Unauthorized access" }];
    case "forbidden":
      return [403, { success: false, message: "Forbidden - You do not have permissions" }];
    case "validation":
      return [400, { success: false, message: "Validation failed" }];
    case "server-error":
      return [500, { success: false, message: "Internal server error" }];
    case "success":
    default:
      return [200, successData];
  }
};

export const setupLeadHandlers = (mock) => {
  // We use a regular expression for LIST to match query parameters if needed
  mock.onGet(new RegExp(`^${API_ENDPOINTS.LEADS.LIST}(\\?.*)?$`)).reply(() => getScenarioResponse(overviewSuccess));

  mock.onGet(API_ENDPOINTS.LEADS.FILTER_OPTIONS).reply(() => getScenarioResponse(filterOptionsSuccess));
};
