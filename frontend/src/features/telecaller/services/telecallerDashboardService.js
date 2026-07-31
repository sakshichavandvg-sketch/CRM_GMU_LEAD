import { telecallerLeadService } from "./telecallerLeadService";
import { telecallerFollowupService } from "./telecallerFollowupService";
import { callHistoryService } from "../voice/services/callHistoryService";
import { computeVoiceAnalytics, computeWeeklyPerformance, formatRecentActivity } from "../utils/telecallerMetrics";

export const telecallerDashboardService = {
  getDashboard: async () => {
    try {
      // 1. Fetch data concurrently
      const [leadsData, followupsData, callsData] = await Promise.all([
        telecallerLeadService.getMyLeads({ size: 100 }).catch(() => ({ leads: [] })),
        telecallerFollowupService.getFollowups({ tab: "all" }).catch(() => []),
        callHistoryService.getCallHistory().catch(() => [])
      ]);

      const leads = Array.isArray(leadsData?.leads) ? leadsData.leads : [];
      const followups = Array.isArray(followupsData) ? followupsData : [];
      const calls = Array.isArray(callsData) ? callsData : [];

      // 2. Compute metrics from single source of truth
      const voiceAnalytics = computeVoiceAnalytics(calls);
      
      const todayStr = new Date().toISOString().split("T")[0];

      const interestedCount = leads.filter(l => l.status === "INTERESTED" || l.stage === "Interested" || l.leadStatus === "INTERESTED").length;
      const admissionsCount = leads.filter(l => l.status === "ENROLLED" || l.stage === "Admission" || l.leadStatus === "ENROLLED").length;

      // 3. Compute dashboard summary
      const summary = {
        assigned: leads.length,
        callsToday: voiceAnalytics.callsToday, // Sourced from calls history
        connected: voiceAnalytics.connected, // Sourced from calls history
        interested: interestedCount,
        admissions: admissionsCount,
        goal: 68
      };

      const stageMapping = {
        "Lead In": ["NEW", "LEAD IN", "LEAD_IN"],
        "Contacted": ["CONTACTED", "IN_PROGRESS"],
        "Interested": ["INTERESTED"],
        "Application": ["APPLICATION", "APPLIED"],
        "Documents": ["DOCUMENTS", "DOCUMENT_VERIFICATION"],
        "Admission": ["ENROLLED", "ADMISSION", "ADMITTED"]
      };

      const pipeline = Object.entries(stageMapping).map(([stageName, matchingStatuses]) => {
        return {
          stage: stageName,
          count: leads.filter(l => {
            const s1 = (l.status || "").toUpperCase();
            const s2 = (l.stage || "").toUpperCase();
            const s3 = (l.leadStatus || "").toUpperCase();
            const s4 = (l.currentStage || "").toUpperCase();
            
            return matchingStatuses.includes(s1) || 
                   matchingStatuses.includes(s2) || 
                   matchingStatuses.includes(s3) || 
                   matchingStatuses.includes(s4) ||
                   s2 === stageName.toUpperCase() ||
                   s4 === stageName.toUpperCase();
          }).length
        };
      });

      const nextCalls = followups
        .filter(f => f.status === "Pending")
        .sort((a, b) => new Date(`${a.scheduledDate}T${a.scheduledTime}`) - new Date(`${b.scheduledDate}T${b.scheduledTime}`))
        .slice(0, 5)
        .map(f => ({
          id: f.leadId,
          name: f.student || f.leadName,
          course: f.course,
          time: f.scheduledTime,
          status: (f.priority || "Normal").toUpperCase()
        }));

      const todaysFocus = {
        highPriority: followups.filter(f => f.status === "Pending" && f.priority === "High" && f.scheduledDate === todayStr).length,
        overdueFollowups: followups.filter(f => f.status === "Missed" || (f.status === "Pending" && f.scheduledDate < todayStr)).length,
        callsRemaining: Math.max(0, 50 - summary.callsToday),
        nearConversion: leads.filter(l => l.temperature === "Hot" && l.status !== "ENROLLED").length
      };

      const analytics = Array.from({ length: 7 }).map((_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return { date: d.toISOString().split("T")[0], calls: 0, interested: 0 };
      });

      const weeklyPerformance = computeWeeklyPerformance(calls, interestedCount, admissionsCount);
      const activities = formatRecentActivity(calls, leads, 10);

      return {
        summary,
        nextCalls,
        todaysFocus,
        pipeline,
        analytics,
        weeklyPerformance,
        activities
      };
    } catch (error) {
      console.error("Dashboard calculation failed:", error);
      return null;
    }
  }
};
