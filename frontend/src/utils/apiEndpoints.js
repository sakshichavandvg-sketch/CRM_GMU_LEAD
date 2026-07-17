const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/leads/auth/login",
    LOGOUT: "/leads/auth/logout",
    REFRESH: "/leads/auth/refresh",
    ME: "/leads/auth/me",
    PROFILE: "/leads/auth/profile",
    CHANGE_PASSWORD: "/leads/auth/change-password",
  },

  USERS: {
    LIST: "/leads/manager/users",
    CREATE: "/leads/manager/users",
    UPDATE: "/leads/manager/users",

    TOGGLE_STATUS: (slNo) =>
      `/leads/manager/users/${slNo}/status`,
  },

  LEADS: {
    LIST: "/leads/overview",

    CREATE: "/leads/manager/leads",
    UPDATE: "/leads/manager/leads",

    DETAIL: (enquiryNo) =>
      `/leads/overview/${enquiryNo}`,

    ASSIGN: "/leads/manager/leads/assign",

    TRANSFER: "/leads/manager/leads/transfer",

    IMPORT: "/leads/manager/leads/import",

    EXPORT: "/leads/manager/export",

    FILTER_OPTIONS:
      "/leads/overview/filter-options",

    UPCOMING:
      "/leads/overview/followups/upcoming",

    OVERDUE:
      "/leads/overview/followups/overdue",
  },

  DASHBOARD: {
    STATS: "/leads/dashboard/stats",
  },

  REPORTS: {
    USERS: "/leads/calls/users",

    DATE_DETAILS:
      "/leads/calls/date-details",

    INDIVIDUAL:
      "/leads/calls/individual",

    SOURCE_LEADS:
      "/leads/calls/source-leads",

    DATEWISE_SUMMARY:
      "/leads/calls/datewise-summary",
  },
};

export default API_ENDPOINTS;