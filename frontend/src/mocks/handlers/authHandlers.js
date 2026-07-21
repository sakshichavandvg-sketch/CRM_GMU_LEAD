import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";

import loginSuccess from "../responses/auth/login.json";
import meSuccess from "../responses/auth/me.json";
import refreshSuccess from "../responses/auth/refresh.json";
import logoutSuccess from "../responses/auth/logout.json";

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
      return [400, { success: false, message: "Validation failed", errors: { email: "Invalid email" } }];
    case "server-error":
      return [500, { success: false, message: "Internal server error" }];
    case "success":
    default:
      return [200, successData];
  }
};

export const setupAuthHandlers = (mock) => {
  mock.onPost(API_ENDPOINTS.AUTH.LOGIN).reply(() => getScenarioResponse(loginSuccess));

  mock.onGet(API_ENDPOINTS.AUTH.ME).reply(() => getScenarioResponse(meSuccess));

  mock.onPost(API_ENDPOINTS.AUTH.REFRESH).reply(() => getScenarioResponse(refreshSuccess));

  mock.onPost(API_ENDPOINTS.AUTH.LOGOUT).reply(() => getScenarioResponse(logoutSuccess));
};
