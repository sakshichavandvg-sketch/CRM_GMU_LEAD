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
    const baseLead = telecallerData.leads.find(l => l.enquiryNo === enquiryNo) || telecallerData.leads[0];

    // Dynamically join mock relationships
    const assignmentRecord = telecallerData.assignments.find(a => a.leadId === baseLead.enquiryNo);
    const assignment = {
      telecaller: "Senior Telecaller",
      assignee: "Senior Telecaller",
      phone: "9999999999",
      email: "telecaller@gmu.edu",
      assignedDate: assignmentRecord ? assignmentRecord.assignedAt : "2026-07-31T09:00:00Z",
      assignedBy: "System",
      status: "ACTIVE"
    };

    const followups = telecallerData.followups.filter(f => f.leadId === baseLead.enquiryNo || f.enquiryNo === baseLead.enquiryNo);
    const calls = telecallerData.interactions.filter(i => i.leadId === baseLead.enquiryNo || i.enquiryNo === baseLead.enquiryNo);
    const notes = telecallerData.notes.filter(n => n.leadId === baseLead.enquiryNo);
    const timeline = calls.map(c => ({
      id: c.id,
      title: `${c.type || "Call"} ${c.action || "Log"}`,
      description: c.remarks || "",
      createdAt: c.time || new Date().toISOString()
    }));

    const leadDetail = {
      ...baseLead,
      assignment,
      followups,
      calls,
      notes,
      timeline
    };

    return getScenarioResponse({
      success: true,
      message: "Lead details fetched successfully",
      data: leadDetail
    });
  });

  // GET notes for a lead
  mock.onGet(new RegExp(`^/api/leads/telecaller/leads/(\\d+)/notes$`)).reply((config) => {
    const match = config.url.match(/\/leads\/(\d+)\/notes$/);
    const enquiryNo = match ? parseInt(match[1], 10) : 0;
    const notes = telecallerData.notes.filter(n => n.leadId === enquiryNo);
    return getScenarioResponse({
      success: true,
      message: "Notes fetched successfully",
      data: notes
    });
  });

  // PATCH update note content
  mock.onPatch(new RegExp(`^/api/leads/telecaller/leads/(\\d+)/notes/(\\d+)$`)).reply((config) => {
    const match = config.url.match(/\/leads\/(\d+)\/notes\/(\d+)$/);
    const noteId = match ? parseInt(match[2], 10) : 0;
    const payload = JSON.parse(config.data);
    const noteIndex = telecallerData.notes.findIndex(n => n.id === noteId);
    
    if (noteIndex !== -1) {
      telecallerData.notes[noteIndex].content = payload.content;
      return getScenarioResponse({
        success: true,
        message: "Note updated successfully",
        data: telecallerData.notes[noteIndex]
      });
    }

    return getScenarioResponse({
      success: false,
      message: "Note not found"
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
