import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";

import overviewSuccess from "../responses/leads/overview.json";
import filterOptionsSuccess from "../responses/leads/filter-options.json";
import { leadRepository } from "../repositories/leadRepository";

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
  mock.onGet(new RegExp(`^${API_ENDPOINTS.LEADS.LIST}(\\?.*)?$`)).reply(() => getScenarioResponse(overviewSuccess));

  mock.onGet(API_ENDPOINTS.LEADS.COUNTS).reply(() => {
    return getScenarioResponse({
      success: true,
      message: "Lead counts fetched successfully",
      data: {
        all: 132,
        hot: 15,
        cold: 42,
        allotted: 87,
        notAllotted: 45,
        notConsulted: 18,
        opinionReassign: 9
      }
    });
  });

  mock.onGet(API_ENDPOINTS.LEADS.FILTER_OPTIONS).reply(() => getScenarioResponse(filterOptionsSuccess));

  // Mock for telecaller leads list
  mock.onGet(new RegExp(`^${API_ENDPOINTS.TELECALLER.LEADS}(\\?.*)?$`)).reply((config) => {
    console.log(`🌐 [MOCK API HIT] GET ${config.url}`);
    const params = new URLSearchParams(config.url.split('?')[1] || "");
    const page = parseInt(params.get('page') || "0", 10);
    const size = parseInt(params.get('size') || "10", 10);
    const search = params.get('search') || "";
    const status = params.get('status') || "ALL";

    const responseData = leadRepository.getLeads({ search, status }, page, size);

    return getScenarioResponse({
      success: true,
      message: "My Leads fetched successfully",
      data: responseData
    });
  });

  // Mock for telecaller lead details
  mock.onGet(new RegExp(`^/api/leads/telecaller/leads/(\\d+)$`)).reply((config) => {
    console.log(`🌐 [MOCK API HIT] GET ${config.url}`);
    const match = config.url.match(/\/leads\/(\d+)$/);
    const enquiryNo = match ? parseInt(match[1], 10) : 0;
    
    if (enquiryNo === 999) {
      return [403, { success: false, message: "Forbidden - You do not have permissions" }];
    }
    
    const lead = leadRepository.getLeadById(enquiryNo);
    if (!lead || enquiryNo === 404) {
      return [404, { success: false, message: "Lead not found" }];
    }

    // Merge dummy properties not present in basic model if needed, but we keep it clean
    return getScenarioResponse({
      success: true,
      message: "Lead details fetched successfully",
      data: lead
    });
  });

  // Mock for telecaller interactions (Log Call)
  mock.onPost(API_ENDPOINTS.TELECALLER.INTERACTIONS).reply((config) => {
    const payload = JSON.parse(config.data);
    console.log("🌐 [MOCK API HIT] POST /api/leads/telecaller/interactions with payload:", payload);
    
    const { enquiryNo, type, action, remarks } = payload;
    
    // Add activity
    if (enquiryNo) {
      leadRepository.addActivity(enquiryNo, "Call Logged", "Connected");
    }

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
