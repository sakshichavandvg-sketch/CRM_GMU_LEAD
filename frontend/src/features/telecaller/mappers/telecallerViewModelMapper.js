export const mapDashboard = (rawData) => {
  if (!rawData) return null;

  return {
    summary: rawData.summary || {
      assigned: 0,
      callsToday: 0,
      connected: 0,
      interested: 0,
      admissions: 0,
      goal: 0
    },
    nextCalls: Array.isArray(rawData.nextCalls) ? rawData.nextCalls : [],
    todaysFocus: rawData.todaysFocus || {
      highPriority: 0,
      overdueFollowups: 0,
      callsRemaining: 0,
      nearConversion: 0
    },
    pipeline: Array.isArray(rawData.pipeline) ? rawData.pipeline : [],
    analytics: Array.isArray(rawData.analytics) ? rawData.analytics : [],
    weeklyPerformance: rawData.weeklyPerformance || {
      calls: { current: 0, target: 1 },
      interested: { current: 0, target: 1 },
      admissions: { current: 0, target: 1 }
    },
    activities: Array.isArray(rawData.activities) ? rawData.activities : [],
  };
};

export const mapLeadOverview = (rawLead) => {
  if (!rawLead) return null;
  return {
    enquiryNo: rawLead.enquiryNo,
    name: rawLead.name || "Unknown",
    mobileNo: rawLead.mobileNo || "N/A",
    course: rawLead.course || "N/A",
    status: rawLead.status || "N/A",
    opinion: rawLead.opinion || "N/A",
    state: rawLead.state || "N/A",
    district: rawLead.district || "N/A",
    source: rawLead.source || "N/A",
    callCount: rawLead.callCount || 0,
  };
};

export const mapLeadDetail = (rawLead) => {
  if (!rawLead) return null;
  
  // Reuse structure expected by existing admin Lead Detail page where applicable
  const mapped = {
    header: {
      name: rawLead.name || "Unknown",
      course: rawLead.course || "N/A",
      priority: rawLead.temperature || rawLead.priority || null,
    },
    status: {
      currentStatus: rawLead.status || "N/A",
      stage: rawLead.stage || "N/A",
      readOnly: true, // Telecallers usually have read-only access to core details
    },
    contact: {
      mobile: rawLead.mobileNo || "N/A",
      email: rawLead.email || "N/A",
      locationStr: [rawLead.city, rawLead.district, rawLead.state].filter(Boolean).join(", ") || "N/A",
      state: rawLead.state || "N/A",
      district: rawLead.district || "N/A",
      taluk: rawLead.city || rawLead.taluk || "N/A",
    },
    lead: {
      source: rawLead.source || "N/A",
      opinion: rawLead.opinion || "N/A",
      programme: rawLead.programme || "N/A",
      discipline: rawLead.discipline || "N/A",
      college: rawLead.collegeStudied || "N/A",
    },
    timeline: Array.isArray(rawLead.timeline) ? rawLead.timeline : [],
    notes: Array.isArray(rawLead.notes) ? rawLead.notes : [],
  };

  return {
    ...mapped,
    rawData: rawLead,
  };
};

export const mapFollowup = (raw) => {
  if (!raw) return null;
  return {
    id: raw.id,
    leadId: raw.leadId || raw.enquiryNo,
    enquiryNo: raw.enquiryNo || raw.leadId,
    name: raw.leadName || raw.student || "Unknown Lead",
    phone: raw.mobileNo || raw.phone || raw.mobile || "N/A",
    course: raw.course || "B.Tech",
    priority: raw.priority
      ? raw.priority.charAt(0).toUpperCase() + raw.priority.slice(1).toLowerCase()
      : null,
    scheduledDate: raw.scheduledDate || raw.date,
    scheduledTime: raw.scheduledTime || raw.time,
    status: raw.status || raw.leadStatus || raw.stage || "PENDING",
    remarks: raw.nextAction || raw.remarks || raw.notes || "",
    createdAt: raw.createdAt,
  };
};
