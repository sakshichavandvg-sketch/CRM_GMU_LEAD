import { mockLeadsDatabase } from "../database/mockLeadsDatabase";

export const leadRepository = {
  getAllLeads: () => mockLeadsDatabase,

  getLeads: (filters = {}, page = 0, size = 10) => {
    let filtered = [...mockLeadsDatabase];
    
    if (filters.search) {
      const search = filters.search.toLowerCase();
      filtered = filtered.filter(l => 
        l.name.toLowerCase().includes(search) || 
        l.mobileNo.includes(search) || 
        l.enquiryNo.toString().includes(search)
      );
    }
    
    if (filters.status && filters.status !== "ALL") {
      filtered = filtered.filter(l => l.status === filters.status);
    }

    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / size);
    const start = page * size;
    const paginatedLeads = filtered.slice(start, start + size);

    return {
      leads: paginatedLeads,
      currentPage: page,
      totalPages,
      totalItems
    };
  },

  getLeadById: (id) => {
    return mockLeadsDatabase.find(l => l.id === parseInt(id, 10));
  },

  updateLead: (id, updates) => {
    const index = mockLeadsDatabase.findIndex(l => l.id === parseInt(id, 10));
    if (index !== -1) {
      mockLeadsDatabase[index] = { ...mockLeadsDatabase[index], ...updates };
      return mockLeadsDatabase[index];
    }
    return null;
  },

  addActivity: (leadId, action, status) => {
    const lead = leadRepository.getLeadById(leadId);
    if (lead) {
      const newActivity = {
        id: `act_${Date.now()}`,
        action,
        status,
        time: new Date().toISOString()
      };
      // Insert at beginning (most recent first)
      lead.activities.unshift(newActivity);
      return newActivity;
    }
    return null;
  }
};
