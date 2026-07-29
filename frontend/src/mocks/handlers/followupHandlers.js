import API_ENDPOINTS from "@/utils/apiEndpoints";
import { env } from "@/config/env";
import { followupRepository } from "../repositories/followupRepository";

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
  mock.onGet(new RegExp(`^${API_ENDPOINTS.TELECALLER.FOLLOWUPS}(\\?.*)?$`)).reply((config) => {
    console.log(`🌐 [MOCK API HIT] GET ${config.url}`);
    const params = new URLSearchParams(config.url.split('?')[1] || "");
    const tab = params.get('tab') || "today";
    
    // Very simple mock filtering based on tab, you can enhance this
    let followups = followupRepository.getAllFollowups();
    const todayStr = new Date().toISOString().split("T")[0];

    if (tab === "today") {
      followups = followups.filter(f => f.scheduledDate === todayStr && f.status !== "Completed");
    } else if (tab === "upcoming") {
      followups = followups.filter(f => f.scheduledDate > todayStr && f.status !== "Completed");
    } else if (tab === "overdue") {
      followups = followups.filter(f => f.scheduledDate < todayStr && f.status !== "Completed");
    } else if (tab === "completed") {
      followups = followups.filter(f => f.status === "Completed");
    }
    // if tab === 'all', return all followups.

    return getScenarioResponse({
      success: true,
      message: "Followups fetched successfully",
      data: followups
    });
  });

  // POST Create Followup
  mock.onPost(API_ENDPOINTS.TELECALLER.FOLLOWUPS).reply((config) => {
    const payload = JSON.parse(config.data);
    console.log("🌐 [MOCK API HIT] POST /api/leads/telecaller/followups", payload);
    const newFollowup = followupRepository.addFollowup(payload.leadId, payload);
    return getScenarioResponse({
      success: true,
      message: "Followup created successfully",
      data: newFollowup
    });
  });

  // PATCH Update Followup
  mock.onPatch(new RegExp(`^/api/leads/telecaller/followups/.*$`)).reply((config) => {
    const id = config.url.split("/").pop();
    const payload = JSON.parse(config.data);
    console.log(`🌐 [MOCK API HIT] PATCH /api/leads/telecaller/followups/${id}`, payload);
    const updated = followupRepository.updateFollowup(id, payload);
    return getScenarioResponse({
      success: true,
      message: "Followup updated successfully",
      data: updated
    });
  });

  // DELETE Followup
  mock.onDelete(new RegExp(`^/api/leads/telecaller/followups/.*$`)).reply((config) => {
    const id = config.url.split("/").pop();
    console.log(`🌐 [MOCK API HIT] DELETE /api/leads/telecaller/followups/${id}`);
    const deleted = followupRepository.deleteFollowup(id);
    return getScenarioResponse({
      success: true,
      message: "Followup deleted successfully",
      data: deleted
    });
  });
};
