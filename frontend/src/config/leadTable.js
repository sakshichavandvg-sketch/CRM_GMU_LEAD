export const leadColumns = [
  { key: "sl", label: "SL No" },

  { key: "name", label: "Name" },

  { key: "course", label: "Course" },

  { key: "source", label: "Source" },

  {
    key: "status",
    label: "Status",
    type: "status",
  },

  {
    key: "priority",
    label: "Priority",
    type: "priority",
  },

  { key: "assigned", label: "Assigned To" },

  {
    key: "action",
    label: "",
    type: "action",
  },
];

export const leadData = [
  {
    id: 1,
    sl: 1,
    name: "Priya Sharma",
    course: "MBA",
    source: "Website",
    status: "NEW",
    priority: "High",
    assigned: "Sunita",
  },
  {
    id: 2,
    sl: 2,
    name: "Rahul Kumar",
    course: "BCA",
    source: "Facebook",
    status: "CONTACTED",
    priority: "Medium",
    assigned: "Ravi",
  },
  {
    id: 3,
    sl: 3,
    name: "Sneha Patel",
    course: "B.Tech",
    source: "Referral",
    status: "INTERESTED",
    priority: "Low",
    assigned: "Aarti",
  },
];