import { leadRepository } from "./leadRepository";

export const followupRepository = {
  // Extract all followups across all leads
  getAllFollowups: () => {
    const leads = leadRepository.getAllLeads();
    return leads.flatMap(l => 
      l.followups.map(f => ({
        ...f,
        student: l.name,
        course: l.course,
        leadStatus: l.status
      }))
    );
  },

  getFollowupsByStatus: (status) => {
    const all = followupRepository.getAllFollowups();
    return all.filter(f => f.status === status);
  },

  addFollowup: (leadId, payload) => {
    const lead = leadRepository.getLeadById(leadId);
    if (lead) {
      const newFollowup = {
        id: `f_${Date.now()}`,
        leadId,
        assignedTo: payload.assignedTo || "telecaller_1",
        scheduledDate: payload.scheduledDate,
        scheduledTime: payload.scheduledTime,
        priority: payload.priority || "Medium",
        status: "Pending", // Always starts as Pending
        remarks: payload.remarks || "",
        createdAt: new Date().toISOString()
      };
      lead.followups.push(newFollowup);
      
      // Auto-add activity
      leadRepository.addActivity(leadId, "Follow-up Added", "Scheduled");
      return newFollowup;
    }
    return null;
  },

  updateFollowup: (id, payload) => {
    const leads = leadRepository.getAllLeads();
    for (const lead of leads) {
      const index = lead.followups.findIndex(f => f.id === id);
      if (index !== -1) {
        lead.followups[index] = { ...lead.followups[index], ...payload };
        
        // If completed, add completion timestamp and activity
        if (payload.status === "Completed" && !lead.followups[index].completedAt) {
          lead.followups[index].completedAt = new Date().toISOString();
          leadRepository.addActivity(lead.id, "Follow-up Completed", "Completed");
        }
        return lead.followups[index];
      }
    }
    return null;
  },

  deleteFollowup: (id) => {
    const leads = leadRepository.getAllLeads();
    for (const lead of leads) {
      const index = lead.followups.findIndex(f => f.id === id);
      if (index !== -1) {
        const deleted = lead.followups.splice(index, 1)[0];
        return deleted;
      }
    }
    return null;
  }
};
