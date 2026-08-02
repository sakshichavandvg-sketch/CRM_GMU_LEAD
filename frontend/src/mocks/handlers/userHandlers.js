import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { usersData } from "../users/data";

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

export const setupUserHandlers = (mock) => {
  mock.onGet(new RegExp(`^${API_ENDPOINTS.USERS.LIST}(\\?.*)?$`)).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Users fetched successfully",
      data: {
        content: usersData.list,
        totalElements: usersData.list.length,
        totalPages: 1,
        number: 0,
        size: 10
      }
    });
  });
};
