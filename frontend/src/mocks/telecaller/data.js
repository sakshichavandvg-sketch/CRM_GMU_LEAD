export const telecallerData = {
  followups: [
    { id: 301, leadId: 1001, name: "Rahul Sharma", date: "2026-08-01T10:00:00Z", status: "Pending", remarks: "Call back tomorrow" },
    { id: 302, leadId: 1003, name: "Amit Kumar", date: "2026-08-02T14:30:00Z", status: "Pending", remarks: "Discuss Data Science course details" }
  ],
  notifications: [
    { id: 401, message: "New lead assigned: Rahul Sharma", time: "2026-07-31T09:00:00Z", read: false },
    { id: 402, message: "Follow-up overdue for Neha Singh", time: "2026-07-30T16:00:00Z", read: true }
  ],
  assignments: [
    { id: 501, leadId: 1001, name: "Rahul Sharma", assignedAt: "2026-07-31T09:00:00Z" },
    { id: 502, leadId: 1003, name: "Amit Kumar", assignedAt: "2026-07-29T09:15:00Z" }
  ],
  leads: [
    { enquiryNo: 1001, name: "Rahul Sharma", status: "New", phone: "9876543210", email: "rahul.sharma@example.in", course: "B.Tech Computer Science", city: "Bangalore" },
    { enquiryNo: 1003, name: "Amit Kumar", status: "Follow-up", phone: "7654321098", email: "amit.kumar@example.in", course: "MBA Marketing", city: "Mumbai" },
    { enquiryNo: 1004, name: "Neha Singh", status: "Interested", phone: "6543210987", email: "neha.singh@example.in", course: "BCA", city: "Pune" }
  ],
  interactions: [
    { id: 601, leadId: 1001, type: "Call", action: "Answered", remarks: "Requested syllabus", time: "2026-07-31T10:00:00Z" },
    { id: 602, leadId: 1003, type: "Call", action: "Missed", remarks: "No answer", time: "2026-07-30T14:30:00Z" }
  ],
  notes: [
    { id: 201, leadId: 1001, content: "Student expressed strong interest in B.Tech Computer Science.", createdBy: "Senior Telecaller", createdAt: "2026-07-31T10:00:00Z" },
    { id: 202, leadId: 1003, content: "Discussed course fees and hostel facilities.", createdBy: "Senior Telecaller", createdAt: "2026-07-29T11:00:00Z" }
  ]
};
