export const leadColumns = [
  { key: "sl", label: "SL NO" },
  { key: "student", label: "STUDENT NAME" },
  { key: "phone", label: "PHONE" },
  { key: "course", label: "COURSE" },
  { key: "source", label: "SOURCE" },
  { key: "status", label: "STATUS", type: "status" },
  { key: "priority", label: "PRIORITY", type: "priority" },
];

export const leadData = [
  {
    sl: 1,
    student: "Rahul Sharma",
    phone: "+91 9876543210",
    course: "MBA",
    source: "Website",
    status: "New",
    priority: "High",
  },
  {
    sl: 2,
    student: "Sneha Reddy",
    phone: "+91 9876543211",
    course: "BCA",
    source: "Facebook",
    status: "Interested",
    priority: "Medium",
  },
  {
    sl: 3,
    student: "Kiran Patel",
    phone: "+91 9876543212",
    course: "BBA",
    source: "Walk In",
    status: "Contacted",
    priority: "Low",
  },
];

export const userColumns = [
  { key: "sl", label: "SL NO" },
  { key: "role", label: "ROLE" },
  { key: "name", label: "NAME" },
  { key: "email", label: "EMAIL" },
  { key: "phone", label: "PHONE" },
  { key: "status", label: "STATUS", type: "status" },
];

export const userData = [
  {
    sl: 1,
    role: "Admin",
    name: "Rajesh Kumar",
    email: "rajesh@gmu.edu",
    phone: "+91 9876543201",
    status: "Active",
  },
  {
    sl: 2,
    role: "Telecaller",
    name: "Priya Singh",
    email: "priya@gmu.edu",
    phone: "+91 9876543202",
    status: "Active",
  },
  {
    sl: 3,
    role: "Telecaller",
    name: "Anjali Patel",
    email: "anjali@gmu.edu",
    phone: "+91 9876543203",
    status: "Inactive",
  },
];

export const reportColumns = [
  { key: "sl", label: "SL NO" },
  { key: "date", label: "DATE" },
  { key: "caller", label: "CALLER" },
  { key: "lead", label: "LEAD" },
  { key: "duration", label: "DURATION" },
  { key: "status", label: "STATUS", type: "status" },
];

export const reportData = [
  {
    sl: 1,
    date: "15 Jul 2026",
    caller: "Priya Singh",
    lead: "Rahul Sharma",
    duration: "04:12",
    status: "Connected",
  },
  {
    sl: 2,
    date: "15 Jul 2026",
    caller: "Anjali Patel",
    lead: "Kiran Patel",
    duration: "01:45",
    status: "No Answer",
  },
  {
    sl: 3,
    date: "16 Jul 2026",
    caller: "Priya Singh",
    lead: "Sneha Reddy",
    duration: "03:28",
    status: "Connected",
  },
];