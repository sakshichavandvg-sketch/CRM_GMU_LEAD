// Utility to get a date offset by days
const getDateWithOffset = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
};

const getOnlyDate = (days) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
};

const getOnlyTime = (hoursOffset) => {
  const d = new Date();
  d.setHours(d.getHours() + hoursOffset);
  return d.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
};

export const mockLeadsDatabase = Array.from({ length: 35 }).map((_, i) => {
  const statusPool = ["NEW", "FOLLOW_UP", "INTERESTED", "NOT_INTERESTED", "ENROLLED"];
  const stagePool = ["Lead In", "Contacted", "Interested", "Application", "Documents", "Admission"];
  const coursePool = ["B.Tech", "MBA", "BBA", "B.Sc", "B.Com"];
  const opinionPool = ["Likely to Join", "Checking Fees", "Needs Time", "Call Back", ""];
  
  const status = statusPool[i % statusPool.length];
  const stage = stagePool[i % stagePool.length];

  const lead = {
    id: 1000 + i, // use id or enquiryNo interchangeably
    enquiryNo: 1000 + i,
    name: `Student Name ${i + 1}`,
    mobileNo: `+91 9876543${String(i).padStart(3, '0')}`,
    email: `student${i + 1}@example.com`,
    course: coursePool[i % coursePool.length],
    status: status,
    stage: stage,
    opinion: opinionPool[i % opinionPool.length],
    callCount: i % 4,
    source: ["Website", "Social Media", "Referral", "Walk-in"][i % 4],
    state: "Karnataka",
    district: ["Bengaluru", "Mysuru", "Mangaluru"][i % 3],
    city: "Bengaluru",
    taluk: "Central",
    temperature: ["Hot", "Warm", "Cold"][i % 3],
    assignedTo: "telecaller_1",
    lastContact: getDateWithOffset(Math.floor(Math.random() * -7)),
    
    // Arrays attached to lead
    followups: [],
    documents: [],
    activities: [],
    notes: [],
    calls: []
  };

  // Generate mock activities for analytics
  if (i % 2 === 0) {
    lead.activities.push({
      id: `act_${i}_1`,
      action: "Call Logged",
      status: "Connected",
      time: getDateWithOffset(0) // Today
    });
  }
  
  if (lead.status === "INTERESTED") {
    lead.activities.push({
      id: `act_${i}_2`,
      action: "Status Changed",
      status: "Interested",
      time: getDateWithOffset(-1)
    });
  }

  // Generate some mock followups
  // Pending today
  if (i % 5 === 0) {
    lead.followups.push({
      id: `f_${i}_1`,
      leadId: lead.id,
      assignedTo: "telecaller_1",
      scheduledDate: getOnlyDate(0),
      scheduledTime: getOnlyTime(1), // +1 hr from now
      priority: ["High", "Medium", "Low"][i % 3],
      status: "Pending", // Pending, Completed, Missed
      remarks: "Call back to discuss fee structure",
      createdAt: getDateWithOffset(-1)
    });
  }
  
  // Missed/Overdue
  if (i % 7 === 0) {
    lead.followups.push({
      id: `f_${i}_2`,
      leadId: lead.id,
      assignedTo: "telecaller_1",
      scheduledDate: getOnlyDate(-1), // Yesterday
      scheduledTime: "14:00",
      priority: "High",
      status: "Missed",
      remarks: "Urgent follow-up needed",
      createdAt: getDateWithOffset(-3)
    });
  }

  // Completed
  if (i % 4 === 0) {
    lead.followups.push({
      id: `f_${i}_3`,
      leadId: lead.id,
      assignedTo: "telecaller_1",
      scheduledDate: getOnlyDate(0),
      scheduledTime: "10:00",
      priority: "Medium",
      status: "Completed",
      remarks: "Student requested brochure",
      completedAt: new Date().toISOString(),
      createdAt: getDateWithOffset(-2)
    });
  }

  return lead;
});
