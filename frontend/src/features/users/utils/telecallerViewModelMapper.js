const normalizeAvatarPath = (avatarPath) => {
  if (!avatarPath) return null;
  if (typeof avatarPath !== "string") return String(avatarPath);
  if (avatarPath.startsWith("/uploads/avatars/")) {
    return avatarPath.replace("/uploads/avatars/", "/files/");
  }
  return avatarPath;
};

export function mapProfile(profileRaw) {
  if (!profileRaw) return null;

  return {
    slNo: profileRaw?.slNo || null,
    empId: profileRaw?.empId || "N/A",
    name: profileRaw?.name || "Unknown User",
    email: profileRaw?.email || "N/A",
    phone: profileRaw?.phoneNo || profileRaw?.phone || "N/A",
    role: profileRaw?.role || "Telecaller",
    department: profileRaw?.department || profileRaw?.manager || "N/A",
    reportingManager: profileRaw?.reportingManager || profileRaw?.manager || "N/A",
    joiningDate: profileRaw?.joiningDate || profileRaw?.joinDate || null,
    status: profileRaw?.status || "INACTIVE",
    avatar: normalizeAvatarPath(profileRaw?.photo || profileRaw?.avatar || null),
  };
}

export function mapWorkload(workloadRaw) {
  if (!workloadRaw) return { pending: 0, completedToday: 0, capacity: 0 };
  
  return {
    pending: workloadRaw?.pending || 0,
    completedToday: workloadRaw?.completedToday || 0,
    capacity: workloadRaw?.capacity || 0,
  };
}

export function mapKpis(kpiRaw) {
  if (!kpiRaw) return null;

  return {
    assignedLeads: kpiRaw?.assignedLeads || 0,
    convertedLeads: kpiRaw?.convertedLeads || 0,
    callsToday: kpiRaw?.callsToday || 0,
    callsThisMonth: kpiRaw?.callsThisMonth || 0,
    conversionRate: kpiRaw?.conversionRate || 0,
    pendingFollowUps: kpiRaw?.pendingFollowUps || 0,
  };
}

export function mapCharts(rawDashboard) {
  return {
    callsPerformance: rawDashboard?.callsPerformance || [],
    callOutcomes: rawDashboard?.callOutcomes || [],
    leadPipeline: rawDashboard?.leadPipeline || [],
  };
}

export function mapAssignedLeads(leadsRaw) {
  if (!Array.isArray(leadsRaw)) return [];

  return leadsRaw.map(lead => ({
    enquiryNo:
      lead?.id ??
      lead?.leadId ??
      lead?.enquiryNo ??
      lead?.enquiry_number ??
      lead?.enqNo ??
      null,

    studentName: lead?.studentName ?? lead?.name ?? lead?.student?.name ?? "N/A",
    
    mobile: lead?.mobile ?? lead?.student?.mobile ?? "N/A",
    
    status: lead?.status ?? lead?.lead?.status ?? "N/A",
    
    stage: lead?.stage ?? lead?.lead?.stage ?? "N/A",
    
    course: lead?.course ?? lead?.education?.course ?? "N/A",
    
    source: lead?.source ?? lead?.lead?.source ?? "N/A",
    
    temperature: lead?.temperature ?? lead?.opinion ?? lead?.lead?.temperature ?? "N/A",
    
    assignedDate: lead?.assignedDate ?? lead?.date ?? lead?.createdAt ?? null,
  }));
}

export function mapDashboard(raw) {
  if (!raw) return null;

  return {
    profile: mapProfile(raw?.profile),
    workload: mapWorkload(raw?.workload),
    kpi: mapKpis(raw?.kpi),
    ...mapCharts(raw),
    assignedLeads: mapAssignedLeads(raw?.assignedLeads || raw?.leads || []),
  };
}
