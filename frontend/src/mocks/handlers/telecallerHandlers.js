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

export const setupTelecallerHandlers = (mock) => {
  mock.onGet(new RegExp(`^${API_ENDPOINTS.TELECALLER.LEADS}(\\?.*)?$`)).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "My Leads fetched successfully",
      data: {
        content: telecallerData.leads,
        totalElements: telecallerData.leads.length,
        totalPages: 1,
        number: 0,
        size: 10
      }
    });
  });

  mock.onGet(new RegExp(`^/api/leads/telecaller/leads/(\\d+)$`)).reply((config) => {
    const match = config.url.match(/\/leads\/(\d+)$/);
    const enquiryNo = match ? parseInt(match[1], 10) : 0;
    const lead = telecallerData.leads.find(l => l.enquiryNo === enquiryNo) || telecallerData.leads[0];
    return getScenarioResponse({
      success: true,
      message: "Lead details fetched successfully",
      data: lead
    });
  });

  mock.onPost(API_ENDPOINTS.TELECALLER.INTERACTIONS).reply((config) => {
    const payload = JSON.parse(config.data);
    return getScenarioResponse({
      success: true,
      message: "Interaction logged successfully",
      data: {
        interactionId: Math.floor(Math.random() * 10000),
        ...payload,
        createdAt: new Date().toISOString()
      }
    });
  });
};
