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

    CREATE: "/api/leads/manager/leads",
    UPDATE: "/api/leads/manager/leads",
    DELETE: (enquiryNo) =>
      `/api/leads/manager/leads/${enquiryNo}`,

    DETAIL: (enquiryNo) =>
      `/api/leads/overview/${enquiryNo}`,

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
  },

  DASHBOARD: {
    STATS: "/api/leads/dashboard/stats",
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
};
 

export default API_ENDPOINTS;