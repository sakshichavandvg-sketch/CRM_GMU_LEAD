import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { dashboardData } from "../dashboard/data";

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
    return getScenarioResponse({
      success: true,
      message: "Dashboard fetched successfully",
      data: dashboardData
    });
  });

  // Admin dashboard if applicable
  mock.onGet(API_ENDPOINTS.DASHBOARD?.STATS).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: dashboardData.stats
    });
  });
  
  mock.onGet(API_ENDPOINTS.DASHBOARD?.ACTIVITY).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Dashboard activity fetched successfully",
      data: dashboardData.recentActivities
    });
  });
};
