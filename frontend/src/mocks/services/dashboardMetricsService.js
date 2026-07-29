import { leadRepository } from "../repositories/leadRepository";
import { followupRepository } from "../repositories/followupRepository";

export const dashboardMetricsService = {
  getDashboardData: () => {
    const leads = leadRepository.getAllLeads();
    const followups = followupRepository.getAllFollowups();
    
    const todayStr = new Date().toISOString().split("T")[0];

    // Summary calculations
    const summary = {
      assigned: leads.length,
      callsToday: leads.reduce((sum, lead) => 
        sum + lead.activities.filter(a => a.action === "Call Logged" && a.time.startsWith(todayStr)).length
      , 0),
      connected: leads.reduce((sum, lead) => 
        sum + lead.activities.filter(a => a.action === "Call Logged" && a.status === "Connected" && a.time.startsWith(todayStr)).length
      , 0),
      interested: leads.filter(l => l.status === "INTERESTED").length,
      admissions: leads.filter(l => l.status === "ENROLLED").length,
      goal: 68 // Static for now, could be derived from user settings
    };

    // Pipeline funnel
    const stages = ["Lead In", "Contacted", "Interested", "Application", "Documents", "Admission"];
    const pipeline = stages.map(stageName => ({
      stage: stageName,
      count: leads.filter(l => l.stage === stageName).length
    }));

    // Next Calls (Priority Followups)
    const nextCalls = followups
      .filter(f => f.status === "Pending")
      .sort((a, b) => {
        // High priority first, then by time
        const priorityScore = { "High": 3, "Medium": 2, "Low": 1 };
        const scoreA = priorityScore[a.priority] || 0;
        const scoreB = priorityScore[b.priority] || 0;
        if (scoreA !== scoreB) return scoreB - scoreA;
        return new Date(`${a.scheduledDate}T${a.scheduledTime}`) - new Date(`${b.scheduledDate}T${b.scheduledTime}`);
      })
      .slice(0, 5) // top 5
      .map(f => ({
        id: f.leadId, // linking directly to lead
        name: f.student,
        course: f.course,
        time: f.scheduledTime,
        status: f.priority.toUpperCase()
      }));

    // Focus widget stats
    const todaysFocus = {
      highPriority: followups.filter(f => f.status === "Pending" && f.priority === "High" && f.scheduledDate === todayStr).length,
      overdueFollowups: followups.filter(f => f.status === "Missed").length,
      callsRemaining: Math.max(0, 50 - summary.callsToday), // Target of 50 calls
      nearConversion: leads.filter(l => l.temperature === "Hot" && l.status !== "ENROLLED").length
    };

    // Analytics (Last 7 days mock)
    const analytics = Array.from({ length: 7 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dStr = d.toISOString().split("T")[0];
      
      const callsOnDay = leads.reduce((sum, lead) => 
        sum + lead.activities.filter(a => a.action === "Call Logged" && a.time.startsWith(dStr)).length
      , 0);

      const interestedOnDay = leads.reduce((sum, lead) => 
        sum + lead.activities.filter(a => a.action === "Status Changed" && a.status === "Interested" && a.time.startsWith(dStr)).length
      , 0);

      return {
        date: dStr,
        calls: callsOnDay,
        interested: interestedOnDay
      };
    });

    // Weekly performance
    const weeklyPerformance = {
      calls: { current: summary.callsToday * 5, target: 350 },
      interested: { current: summary.interested, target: 100 },
      admissions: { current: summary.admissions, target: 15 }
    };

    // Activities (Global recent activities)
    const allActivities = leads.flatMap(l => 
      l.activities.map(a => ({
        ...a,
        leadName: l.name
      }))
    ).sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 10);

    return {
      summary,
      nextCalls,
      todaysFocus,
      pipeline,
      analytics,
      weeklyPerformance,
      activities: allActivities
    };
  }
};
