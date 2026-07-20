export const LEAD_KEYS = {
  all: ["leads"],
  lists: () => [...LEAD_KEYS.all, "list"],
  list: (filters) => [...LEAD_KEYS.lists(), filters],
  
  overviewLists: () => [...LEAD_KEYS.all, "overview"],
  overview: (filters) => [...LEAD_KEYS.overviewLists(), filters],
  
  filterOptions: () => [...LEAD_KEYS.all, "filterOptions"],
  
  details: () => [...LEAD_KEYS.all, "detail"],
  detail: (id) => [...LEAD_KEYS.details(), id],
  
  // Placeholders for future consistency
  assign: () => [...LEAD_KEYS.all, "assign"],
  transfer: () => [...LEAD_KEYS.all, "transfer"],
  import: () => [...LEAD_KEYS.all, "import"],
  export: () => [...LEAD_KEYS.all, "export"],
};

