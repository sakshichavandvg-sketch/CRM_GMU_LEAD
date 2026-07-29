import { telecallerLeadService } from "./telecallerLeadService";
import { telecallerFollowupService } from "./telecallerFollowupService";

export const telecallerDashboardService = {
  getDashboard: async () => {
    try {
      // 1. Fetch real leads assigned to this telecaller
      const leadsData = await telecallerLeadService.getMyLeads({ size: 100 }).catch(() => ({ leads: [] }));
      const leads = Array.isArray(leadsData?.leads) ? leadsData.leads : [];

      // 2. Try fetching followups (might 404 on real backend if not implemented)
      let followups = [];
      try {
        const followupsData = await telecallerFollowupService.getFollowups({ tab: "all" });
        followups = Array.isArray(followupsData) ? followupsData : [];
      } catch (e) {
        console.warn("Followups endpoint not ready on real backend, falling back to empty followups.");
      }

      const todayStr = new Date().toISOString().split("T")[0];

      // 3. Compute real-time metrics
      const summary = {
        assigned: leads.length,
        callsToday: leads.reduce((sum, lead) => 
          sum + (lead.activities || []).filter(a => a.action === "Call Logged" && a.time?.startsWith(todayStr)).length
        , 0),
        connected: leads.reduce((sum, lead) => 
          sum + (lead.activities || []).filter(a => a.action === "Call Logged" && a.status === "Connected" && a.time?.startsWith(todayStr)).length
        , 0),
        interested: leads.filter(l => l.status === "INTERESTED" || l.stage === "Interested" || l.leadStatus === "INTERESTED").length,
        admissions: leads.filter(l => l.status === "ENROLLED" || l.stage === "Admission" || l.leadStatus === "ENROLLED").length,
        goal: 68
      };

      const stages = ["Lead In", "Contacted", "Interested", "Application", "Documents", "Admission"];
      const pipeline = stages.map(stageName => ({
        stage: stageName,
        count: leads.filter(l => l.stage === stageName || (l.leadStatus && l.leadStatus.toLowerCase() === stageName.toLowerCase())).length
      }));

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
        return { date: d.toISOString().split("T")[0], calls: 0, interested: 0 }; // Stub for now
      });

      const weeklyPerformance = {
        calls: { current: summary.callsToday * 5, target: 350 },
        interested: { current: summary.interested, target: 100 },
        admissions: { current: summary.admissions, target: 15 }
      };

      const activities = leads.flatMap(l => 
        (l.activities || []).map(a => ({ ...a, leadName: l.name || l.studentName }))
      ).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

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
