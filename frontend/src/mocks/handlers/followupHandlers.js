import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { telecallerData } from "../telecaller/data";

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

export const setupFollowupHandlers = (mock) => {
  // GET Followups
  mock.onGet(new RegExp(`^${API_ENDPOINTS.TELECALLER.FOLLOWUPS}(\\?.*)?$`)).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Followups fetched successfully",
      data: telecallerData.followups
    });
  });

  // POST Create Followup
  mock.onPost(API_ENDPOINTS.TELECALLER.FOLLOWUPS).reply((config) => {
    const payload = JSON.parse(config.data);
    return getScenarioResponse({
      success: true,
      message: "Followup created successfully",
      data: { id: Math.floor(Math.random() * 1000), ...payload }
    });
  });

  // PATCH Update Followup
  mock.onPatch(new RegExp(`^/api/leads/telecaller/followups/.*$`)).reply((config) => {
    const payload = JSON.parse(config.data);
    return getScenarioResponse({
      success: true,
      message: "Followup updated successfully",
      data: payload
    });
  });

  // DELETE Followup
  mock.onDelete(new RegExp(`^/api/leads/telecaller/followups/.*$`)).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Followup deleted successfully",
      data: { success: true }
    });
  });
};
