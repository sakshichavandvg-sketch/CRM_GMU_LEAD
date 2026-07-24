export const USER_QUERY_KEYS = {
  all: ["users"],
  
  list: (filters) => [...USER_QUERY_KEYS.all, "list", filters],
  
  telecallerDashboard: (empId) => [
    ...USER_QUERY_KEYS.all,
    "telecaller-dashboard",
    empId,
  ],
  
  telecallerLeads: (empId, filters) => [
    ...USER_QUERY_KEYS.all,
    "telecaller-leads",
    empId,
    filters,
  ],
};
