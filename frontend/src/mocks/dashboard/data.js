export const dashboardData = {
  stats: {
    totalLeads: 150,
    converted: 45,
    followUps: 30,
    pending: 75,
  },
  recentActivities: [
    { id: 1, action: "Call Logged", details: "Connected with Rahul Sharma", time: "2026-07-31T10:00:00Z" },
    { id: 2, action: "Status Changed", details: "Lead #1002 changed to Interested", time: "2026-07-31T11:30:00Z" },
    { id: 3, action: "Follow-up Added", details: "Follow-up for Amit Kumar", time: "2026-07-31T12:15:00Z" }
  ],
  recentCalls: [
    { id: 101, contactName: "Rahul Sharma", duration: "05:20", status: "Answered", time: "2026-07-31T09:15:00Z" },
    { id: 102, contactName: "Priya Patel", duration: "01:00", status: "Missed", time: "2026-07-31T12:00:00Z" },
    { id: 103, contactName: "Amit Kumar", duration: "12:30", status: "Answered", time: "2026-07-31T14:45:00Z" }
  ],
  charts: [
    { date: "2026-07-27", calls: 12, leads: 5 },
    { date: "2026-07-28", calls: 19, leads: 8 },
    { date: "2026-07-29", calls: 15, leads: 6 },
    { date: "2026-07-30", calls: 22, leads: 10 },
    { date: "2026-07-31", calls: 8, leads: 3 }
  ]
};
