import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { authData } from "../auth/data";

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
  mock.onPost(API_ENDPOINTS.AUTH.LOGIN).reply((config) => {
    try {
      const { email, password } = JSON.parse(config.data);
      if (email === "admin" && password === "admin123") {
        return getScenarioResponse({ success: true, message: "Login successful", data: authData.admin });
      }
      if (email === "telecaller" && password === "tele123") {
        return getScenarioResponse({ success: true, message: "Login successful", data: authData.telecaller });
      }
      return [401, { success: false, message: "Invalid credentials" }];
    } catch (e) {
      return [400, { success: false, message: "Bad Request" }];
    }
  });

  mock.onGet(API_ENDPOINTS.AUTH.ME).reply((config) => {
    // 1. Check if an explicit mock role is set in the environment
    if (env.MOCK_ROLE === "admin") {
      return getScenarioResponse({ success: true, message: "Profile fetched", data: authData.admin.user });
    }
    if (env.MOCK_ROLE === "telecaller") {
      return getScenarioResponse({ success: true, message: "Profile fetched", data: authData.telecaller.user });
    }

    // 2. Fallback to extracting role from the token
    const authHeader = config.headers?.Authorization || "";
    if (authHeader.includes("dummy_telecaller_token")) {
      return getScenarioResponse({
        success: true,
        message: "Profile fetched successfully",
        data: authData.telecaller.user
      });
    }
    return getScenarioResponse({
      success: true,
      message: "Profile fetched successfully",
      data: authData.admin.user
    });
  });

  mock.onPost(API_ENDPOINTS.AUTH.REFRESH).reply(() => getScenarioResponse({ success: true }));

  mock.onPost(API_ENDPOINTS.AUTH.LOGOUT).reply(() => getScenarioResponse({ success: true }));
};
