import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { dashboardMetricsService } from "../services/dashboardMetricsService";

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

export const setupDashboardHandlers = (mock) => {
  mock.onGet(API_ENDPOINTS.TELECALLER.DASHBOARD).reply(() => {
    console.log("🌐 [MOCK API HIT] GET /api/leads/telecaller/dashboard");
    const dashboardData = dashboardMetricsService.getDashboardData();
    return getScenarioResponse({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboardData
    });
  });
};
