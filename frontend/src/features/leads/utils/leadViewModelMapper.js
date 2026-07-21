export const mapLeadToViewModel = (rawLead) => {
  if (!rawLead) return null;

  return {
    header: {
      name: rawLead.name || "Unknown",
      course: rawLead.course || "Not specified",
      priority: rawLead.priority || null, 
    },
    status: {
      currentStatus: rawLead.status || "N/A",
      stage: rawLead.stage || "N/A", 
      readOnly: rawLead.readOnly || false, 
      score: rawLead.score || null, 
    },
    contact: {
      mobile: rawLead.mobileNo || "N/A",
      email: rawLead.email || "N/A",
      locationStr: [rawLead.taluk, rawLead.district, rawLead.state].filter(Boolean).join(", ") || "N/A",
      state: rawLead.state || "N/A",
      district: rawLead.district || "N/A",
      taluk: rawLead.taluk || "N/A",
    },
    lead: {
      source: rawLead.source || "N/A",
      opinion: rawLead.opinion || "N/A",
      programme: rawLead.programme || "N/A",
      discipline: rawLead.discipline || "N/A",
      college: rawLead.collegeStudied || "N/A",
    },
    assignment: {
      telecaller: rawLead.telecallerName || "Unassigned", 
      assignee: rawLead.assignee || "Unassigned", 
    },
    admin: {
      remarks: rawLead.remarks || "No remarks available.",
      createdBy: rawLead.createdBy || "System", 
    },
    timeline: rawLead.activities || [],
    notes: rawLead.notes || [
      { id: 1, author: "Alice Smith", createdAt: new Date().toISOString(), content: "Called the lead, asked to call back tomorrow." },
      { id: 2, author: "Alice Smith", createdAt: new Date(Date.now() - 86400000).toISOString(), content: "Initial consultation completed." },
    ],
  };
};
