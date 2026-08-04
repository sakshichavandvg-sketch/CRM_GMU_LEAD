import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDisplayDate } from "@/utils/dateUtils";
import { User, Phone, Home, MapPin, Calendar, Clock, CheckCircle2, ChevronRight, Mail, AlertTriangle, ShieldAlert, Globe } from "lucide-react";
import ScheduleFollowupModal from "./followups/ScheduleFollowupModal";
import { useFollowups } from "@/features/telecaller/hooks/useFollowups";

export default function TelecallerOverviewTab({ data, rawData, leadId }) {
  const router = useRouter();
  const [isScheduleFollowupOpen, setIsScheduleFollowupOpen] = useState(false);

  // Fetch all followups to pass to modal for duplicate validation
  const { data: allFollowupsData } = useFollowups("all");
  const allFollowups = Array.isArray(allFollowupsData) ? allFollowupsData : [];

  if (!data) return null;

  const contact = data.contact || {};
  const assignment = data.assignment || {};
  const personalInfo = {
    fullName: data.header?.name || "N/A",
    gender: rawData?.student?.gender || rawData?.gender || "N/A",
    category: rawData?.student?.category || rawData?.category || "N/A",
    nationality: rawData?.student?.nationality || rawData?.nationality || "N/A",
    address: contact.locationStr || rawData?.address || rawData?.location?.address || "N/A",
    cityState: [contact.taluk || rawData?.city, contact.state || rawData?.state].filter(Boolean).join(", ") || "N/A",
  };

  const callLogs = Array.isArray(rawData?.calls) ? rawData.calls : rawData?.callLogs || [];
  const followups = Array.isArray(rawData?.followups) ? rawData.followups : rawData?.followUpTasks || [];
  const activities = Array.isArray(rawData?.timeline) ? rawData.timeline : rawData?.activities || [];

  const totalCalls = callLogs.length;
  const connectedCalls = callLogs.filter((call) => String(call.status).toLowerCase() === "connected").length;
  const assignedName = assignment.telecaller || assignment.assignee || "Unassigned";
  const assignedPhone = assignment.phone || "N/A";
  const assignedEmail = assignment.email || "N/A";
  const assignedDate = formatDisplayDate(assignment.assignedDate) || "N/A";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-2">
      {/* Left Column (Personal Info & Follow-up Tasks) */}
      <div className="lg:col-span-5 space-y-6">
        {/* Personal Information */}
        <section className="premium-card rounded-[22px] p-[28px]" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <User className="text-primary" size={20} />
              <h3 className="font-headline-md text-headline-md text-gray-900">Personal Information</h3>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-outline-variant border-dashed">
              <span className="text-on-surface-variant font-label-lg">Full Name</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.fullName}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant border-dashed">
              <span className="text-on-surface-variant font-label-lg">Gender</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.gender}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant border-dashed">
              <span className="text-on-surface-variant font-label-lg">Category</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.category}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-outline-variant border-dashed">
              <span className="text-on-surface-variant font-label-lg">Nationality</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.nationality}</span>
            </div>
            <div className="flex justify-between items-start py-2 border-b border-outline-variant border-dashed text-right">
              <span className="text-on-surface-variant font-label-lg mr-4">Address</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.address}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-on-surface-variant font-label-lg">City / State</span>
              <span className="font-body-md font-semibold text-on-surface">{personalInfo.cityState}</span>
            </div>
          </div>
          <button className="w-full mt-6 py-3 border border-outline-variant rounded-xl text-primary font-label-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2">
            View More Details
            <ChevronRight size={18} className="rotate-90" />
          </button>
        </section>

        {/* Follow-up Tasks */}
        <section className="premium-card rounded-[22px] p-[28px]" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-primary" size={20} />
              <h3 className="font-headline-md text-headline-md text-gray-900">Follow-up Tasks</h3>
            </div>
          </div>
          {followups.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              No follow-up tasks scheduled.
            </div>
          ) : (
            <div className="space-y-4">
              {followups.slice(0, 4).map((task, idx) => (
                <div key={task.id || idx} className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant">
                  <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <AlertTriangle size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <p className="font-body-md font-bold text-gray-900">{task.name || task.title || task.leadName || "Task"}</p>
                      <span className="text-[10px] font-bold text-red-600 uppercase">{task.priority || "High"}</span>
                    </div>
                    <p className="text-on-surface-variant text-[11px]">Due: {formatDisplayDate(task.date || task.dueDate || task.scheduledDate)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <button 
            onClick={() => setIsScheduleFollowupOpen(true)}
            className="w-full mt-6 py-3 border border-primary rounded-xl text-primary font-label-lg hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
          >
            <Clock size={18} />
            Add New Task
          </button>
        </section>
      </div>

      {/* Right Column (Call Logs, Assigned Telecaller, Recent Activity) */}
      <div className="lg:col-span-7 space-y-6">
        {/* Call Logs */}
        <section className="premium-card rounded-[22px] p-[28px] overflow-hidden" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              <h3 className="font-headline-md text-headline-md text-gray-900">Call Logs</h3>
            </div>
            <button className="text-primary font-label-lg hover:underline">View All</button>
          </div>
          {totalCalls === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              No call logs available.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr class="text-[11px] uppercase tracking-wider text-on-surface-variant font-bold border-b border-outline-variant">
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Duration</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Outcome</th>
                  </tr>
                </thead>
                <tbody className="text-body-md">
                  {callLogs.slice(0, 4).map((call, idx) => {
                    const isConnected = String(call.status).toLowerCase() === "connected";
                    return (
                      <tr key={idx} className="border-b border-outline-variant group hover:bg-surface-container-low transition-colors">
                        <td className="py-4">
                          <div className="flex flex-col">
                            <span className="font-semibold text-gray-900">{formatDisplayDate(call.createdAt || call.date || call.time)}</span>
                            <span className="text-on-surface-variant text-[11px]">{call.timeOnly || "11:30 AM"}</span>
                          </div>
                        </td>
                        <td className="py-4">{call.duration || "02:45"}</td>
                        <td className="py-4">
                          <div className={`flex items-center gap-1 ${isConnected ? "text-green-600" : "text-red-600"}`}>
                            {isConnected ? <Phone size={16} /> : <Phone className="rotate-45 text-red-600" size={16} />}
                            {call.status || "Connected"}
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${isConnected ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                            {call.outcome || call.response || "Discussed"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Assigned Telecaller */}
        <section className="premium-card rounded-[22px] p-[28px]" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-primary-container text-white flex items-center justify-center font-bold text-lg">
              {assignedName.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-headline-md text-headline-md text-gray-900">{assignedName}</h4>
              <p className="text-on-surface-variant text-label-md">Senior Telecaller • Assigned On {assignedDate}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-surface-container-low rounded-lg p-3 text-center border border-outline-variant">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Calls</p>
              <p className="text-body-lg font-bold text-gray-900">{totalCalls}</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-3 text-center border border-outline-variant">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Conn.</p>
              <p className="text-body-lg font-bold text-gray-900">{connectedCalls}</p>
            </div>
            <div className="bg-surface-container-low rounded-lg p-3 text-center border border-outline-variant">
              <p className="text-[10px] text-on-surface-variant uppercase font-bold">Talk Time</p>
              <p className="text-body-lg font-bold text-gray-900">{rawData?.talkTime || "04:35"}</p>
            </div>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="premium-card rounded-[22px] p-[28px]" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Clock className="text-primary" size={20} />
              <h3 className="font-headline-md text-headline-md text-gray-900">Recent Activity</h3>
            </div>
            <button className="text-primary font-label-lg hover:underline">View All</button>
          </div>
          {activities.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
              No recent activity.
            </div>
          ) : (
            <div className="space-y-8 relative timeline-line">
              {activities.slice(0, 4).map((item, index) => (
                <div key={item.id || index} className="relative flex gap-6">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0 z-10 border-4 border-white">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h5 className="font-body-lg font-bold text-gray-900">{item.title || item.action || "Call connected by " + assignedName}</h5>
                      <span className="text-on-surface-variant text-[11px]">{formatDisplayDate(item.createdAt || item.date || item.time)}</span>
                    </div>
                    <p className="text-on-surface-variant text-body-md mt-1">{item.description || item.notes || "Duration: 02:45 • Outcome: Discussed options."}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Schedule Followup Modal */}
      {isScheduleFollowupOpen && (
        <ScheduleFollowupModal
          isOpen={isScheduleFollowupOpen}
          onClose={() => setIsScheduleFollowupOpen(false)}
          initialLeadId={leadId || rawData?.enquiryNo}
          allFollowups={allFollowups}
        />
      )}
    </div>
  );
}
