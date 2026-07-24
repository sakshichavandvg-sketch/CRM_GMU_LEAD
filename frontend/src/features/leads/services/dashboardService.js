import axiosInstance from "@/lib/axios";
import API_ENDPOINTS from "@/utils/apiEndpoints";

const normalizeStats = (raw) => {
  const overall = raw.overall || {};
  return [
    {
      id: 1,
      title: "Total Leads",
      value: overall.total || 0,
      subtitle: "All time",
      type: "success",
    },
    {
      id: 2,
      title: "Active Leads",
      value: overall.alloted || 0,
      subtitle: "In Pipeline",
      type: "default",
    },
    {
      id: 3,
      title: "New Today",
      value: overall.recent || 0,
      subtitle: "Recent Leads",
      type: "default",
    },
    {
      id: 4,
      title: "Pending Assign",
      value: overall.notAlloted || 0,
      subtitle: "Requires Action",
      type: "warning",
    },
    {
      id: 5,
      title: "Conversion Rate",
      value: overall.conversionRate || "--",
      subtitle: "Pending backend support",
      type: "default",
    },
    {
      id: 6,
      title: "Telecallers",
      value: overall.activeTelecallers || "--",
      subtitle: "Pending backend support",
      type: "default",
    },
    {
      id: 7,
      title: "Admissions",
      value: overall.totalAdmissions || "--",
      subtitle: "Pending backend support",
      type: "default",
    },
  ];
};

const normalizeTemperature = (raw) => {
  const overall = raw.overall || {};
  return {
    hot: overall.hot || 0,
    cold: overall.cold || 0,
  };
};

const normalizeSourceAnalytics = (raw) => {
  const sources = raw.sourceStats || [];
  return sources.map((item) => ({
    label: item.groupName || "Unknown",
    value: item.total || 0,
  }));
};

const normalizeRecentLeads = (raw) => {
  if (!raw || !raw.leads) return [];
  return raw.leads.map((lead) => ({
    id: lead.enquiryNo,
    student: lead.name || "Unknown",
    course: lead.course || "--",
    assignedTo: lead.callerName || "Unassigned",
    status: lead.status || "ENQUIRY",
    priority: lead.opinion === "Interested" || lead.opinion === "Warm" ? "Hot" : "Normal",
  }));
};

const normalizeUpcomingFollowups = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.map((lead) => ({
    id: lead.enquiryNo,
    student: lead.name || "Unknown",
    course: lead.course || "--",
    time: lead.followupDate ? new Date(lead.followupDate).toLocaleDateString() : "Today",
    priority: lead.opinion === "Interested" ? "High" : lead.opinion === "Warm" ? "Medium" : "Low",
  }));
};

const normalizeOverdueFollowups = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.map((lead) => ({
    id: lead.enquiryNo,
    student: lead.name || "Unknown",
    course: lead.course || "--",
    time: lead.followupDate ? new Date(lead.followupDate).toLocaleDateString() : "Overdue",
    priority: lead.opinion === "Interested" ? "High" : lead.opinion === "Warm" ? "Medium" : "Low",
  }));
};

const normalizeActivityTimeline = (raw) => {
  if (!Array.isArray(raw)) return [];
  return raw.map((activity) => ({
    id: activity.id || Math.random().toString(),
    title: activity.title || "Activity",
    description: activity.description || "",
    time: activity.time ? new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
    color: activity.color || "bg-blue-500",
  }));
};

const extractData = (res) => (res.status === "fulfilled" ? res.value.data.data || res.value.data : null);

const dashboardService = {
  getStats: async (params) => {
    const [statsRes, leadsRes, upcomingRes, overdueRes, activityRes] = await Promise.allSettled([
      axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS, { params }),
      axiosInstance.get(API_ENDPOINTS.LEADS.LIST, { params: { ...params, size: 5 } }),
      axiosInstance.get(API_ENDPOINTS.LEADS.UPCOMING, { params }),
      axiosInstance.get(API_ENDPOINTS.LEADS.OVERDUE, { params }),
      axiosInstance.get(API_ENDPOINTS.DASHBOARD.ACTIVITY, { params }),
    ]);

    const statsData = extractData(statsRes);
    if (!statsData) {
      throw new Error("Dashboard stats unavailable");
    }

    const recentData = extractData(leadsRes);
    const upcomingData = extractData(upcomingRes);
    const overdueData = extractData(overdueRes);
    const activityData = extractData(activityRes);

    return {
      stats: normalizeStats(statsData),
      temperature: normalizeTemperature(statsData),
      charts: {
        sourceAnalytics: normalizeSourceAnalytics(statsData),
        pipeline: [], // TODO: Awaiting backend support for stage-based pipeline
      },
      tables: {
        recentLeads: {
          data: recentData ? normalizeRecentLeads(recentData) : null,
          error: leadsRes.status === "rejected" ? leadsRes.reason : null,
        },
        followups: {
          upcoming: {
            data: upcomingData ? normalizeUpcomingFollowups(upcomingData) : null,
            error: upcomingRes.status === "rejected" ? upcomingRes.reason : null,
          },
          overdue: {
            data: overdueData ? normalizeOverdueFollowups(overdueData) : null,
            error: overdueRes.status === "rejected" ? overdueRes.reason : null,
          },
        },
      },
      timeline: {
        data: activityData ? normalizeActivityTimeline(activityData) : null,
        error: activityRes.status === "rejected" ? activityRes.reason : null,
      },
    };
  },
};

export default dashboardService;
