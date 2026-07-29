const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/leads/auth/login",
    LOGOUT: "/api/leads/auth/logout",
    REFRESH: "/api/leads/auth/refresh",
    ME: "/api/leads/auth/me",
    PROFILE: "/api/leads/auth/profile",
    CHANGE_PASSWORD: "/api/leads/auth/change-password",
  },

  USERS: {
    LIST: "/api/leads/manager/users",
    CREATE: "/api/leads/manager/users",
    UPDATE: "/api/leads/manager/users",

    TOGGLE_STATUS: (slNo) =>
      `/api/leads/manager/users/${slNo}/status`,
  },

  LEADS: {
    LIST: "/api/leads/overview",
    COUNTS: "/api/leads/manager/leads/counts",

    CREATE: "/api/leads/manager/leads",
    UPDATE: "/api/leads/manager/leads",
    DELETE: (enquiryNo) =>
      `/api/leads/manager/leads/${enquiryNo}`,

    DETAIL: (leadId) => `/api/leads/${leadId}`,
    TIMELINE: (leadId) => `/api/leads/${leadId}/timeline`,
    NOTES: (leadId) => `/api/leads/${leadId}/notes`,

    ASSIGN: "/api/leads/manager/leads/assign",

    TRANSFER: "/api/leads/manager/leads/transfer",

    IMPORT: "/api/leads/manager/leads/import",

    EXPORT: "/api/leads/manager/export",

    FILTER_OPTIONS:
      "/api/leads/overview/filter-options",

    UPCOMING:
      "/api/leads/overview/followups/upcoming",

    OVERDUE:
      "/api/leads/overview/followups/overdue",

    GEO: {
      STATES: "/api/leads/geo/states",
      DISTRICTS: (state) => `/api/leads/geo/districts?state=${encodeURIComponent(state)}`,
      TALUKS: (district) => `/api/leads/geo/taluks?district=${encodeURIComponent(district)}`,
    },
  },

  DASHBOARD: {
    STATS: "/api/leads/dashboard/stats",
    ACTIVITY: "/api/leads/dashboard/activity",
  },

  REPORTS: {
    USERS: "/api/leads/calls/users",

    DATE_DETAILS:
      "/api/leads/calls/date-details",

    INDIVIDUAL:
      "/api/leads/calls/individual",

    SOURCE_LEADS:
      "/api/leads/calls/source-leads",

    DATEWISE_SUMMARY:
      "/api/leads/calls/datewise-summary",
  },

  TELECALLER: {
    DASHBOARD: "/api/leads/telecaller/dashboard",
    INTERACTIONS: "/api/leads/telecaller/interactions",
    LEADS: "/api/leads/telecaller/leads",
    LEAD_DETAILS: (enquiryNo) => `/api/leads/telecaller/leads/${enquiryNo}`,
    LEAD_TIMELINE: (enquiryNo) => `/api/leads/telecaller/leads/${enquiryNo}/timeline`,
    LEAD_NOTES: (enquiryNo) => `/api/leads/telecaller/leads/${enquiryNo}/notes`,
    LEAD_FILTER_OPTIONS: "/api/leads/telecaller/leads/filter-options",
    CALLS: "/api/leads/telecaller/calls",
    CALL_DETAILS: (callId) => `/api/leads/telecaller/calls/${callId}`,
    CALL_RECORDING_AUDIO: (callId) => `/api/leads/telecaller/calls/${callId}/recording`,
    FOLLOWUPS: "/api/leads/telecaller/followups",
    FOLLOWUP_DETAILS: (id) => `/api/leads/telecaller/followups/${id}`,
    AVATAR: "/api/leads/telecaller/profile/avatar",
    VOICE: {
      TOKEN: "/api/leads/telecaller/voice/token",
    }
  }
};
 

export default API_ENDPOINTS;