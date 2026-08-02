export const leadsData = {
  list: [
    { enquiryNo: 1001, name: "Rahul Sharma", status: "New", phone: "9876543210", email: "rahul.sharma@example.in", source: "Website", createdAt: "2026-07-31T10:00:00Z" },
    { enquiryNo: 1002, name: "Priya Patel", status: "Interested", phone: "8765432109", email: "priya.patel@example.in", source: "Facebook", createdAt: "2026-07-30T14:30:00Z" },
    { enquiryNo: 1003, name: "Amit Kumar", status: "Follow-up", phone: "7654321098", email: "amit.kumar@example.in", source: "Google", createdAt: "2026-07-29T09:15:00Z" },
    { enquiryNo: 1004, name: "Neha Singh", status: "Converted", phone: "6543210987", email: "neha.singh@example.in", source: "Referral", createdAt: "2026-07-28T16:45:00Z" },
    { enquiryNo: 1005, name: "Suresh Reddy", status: "Lost", phone: "5432109876", email: "suresh.reddy@example.in", source: "Website", createdAt: "2026-07-27T11:20:00Z" }
  ],
  counts: {
    all: 5,
    hot: 1,
    cold: 1,
    allotted: 3,
    notAllotted: 2,
    notConsulted: 1,
    opinionReassign: 0
  },
  filterOptions: {
    statuses: ["New", "Interested", "Follow-up", "Converted", "Lost"],
    sources: ["Website", "Facebook", "Google", "Referral"]
  }
};
