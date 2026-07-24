export const mapLeadToViewModel = (rawLead) => {
  console.log("🧩 [MAPPER] Received raw data:", rawLead);
  if (!rawLead) return null;

  return {
    header: {
      name: rawLead?.student?.name || rawLead?.name || "Unknown",
      course: rawLead?.education?.course || rawLead?.course || "Not specified",
      priority: rawLead?.lead?.temperature || rawLead?.priority || null, 
    },
    status: {
      currentStatus: rawLead?.lead?.status || rawLead?.status || "N/A",
      stage: rawLead?.lead?.stage || rawLead?.stage || "N/A", 
      readOnly: rawLead?.readOnly || false, 
      score: rawLead?.score || null, 
    },
    contact: {
      mobile: rawLead?.student?.mobile || rawLead?.mobileNo || "N/A",
      email: rawLead?.student?.email || rawLead?.email || "N/A",
      locationStr: [rawLead?.location?.city, rawLead?.location?.district, rawLead?.location?.state].filter(Boolean).join(", ") || "N/A",
      state: rawLead?.location?.state || rawLead?.state || "N/A",
      district: rawLead?.location?.district || rawLead?.district || "N/A",
      taluk: rawLead?.location?.city || rawLead?.taluk || "N/A", // API uses city instead of taluk
    },
    lead: {
      source: rawLead?.lead?.source || rawLead?.source || "N/A",
      opinion: rawLead?.lead?.temperature || rawLead?.opinion || "N/A",
      programme: rawLead?.education?.programme || rawLead?.programme || "N/A",
      discipline: rawLead?.education?.discipline || rawLead?.discipline || "N/A",
      college: rawLead?.education?.college || rawLead?.collegeStudied || "N/A",
    },
    assignment: {
      telecaller: rawLead?.lead?.assignedTo?.name || rawLead?.telecallerName || "Unassigned", 
      assignee: rawLead?.assignee || "Unassigned", 
    },
    admin: {
      remarks: rawLead?.remarks || "No remarks available.",
      createdBy: rawLead?.createdBy || "System", 
    },
    timeline: [],
    notes: [],
  };
};
