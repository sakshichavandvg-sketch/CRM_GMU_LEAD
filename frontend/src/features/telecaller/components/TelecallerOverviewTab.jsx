"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { formatDisplayDate } from "@/utils/dateUtils";
import { User, Phone, Home, MapPin, Calendar, Clock, CheckCircle2, ChevronRight, Mail, AlertTriangle, ShieldAlert, Globe } from "lucide-react";

export default function TelecallerOverviewTab({ data, rawData, leadId }) {
  const router = useRouter();
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
    <div className="flex flex-col gap-6 pt-2">
      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="premium-card rounded-[20px] p-6 border border-gray-100">
            <div className="flex items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FDF2F8] text-[#831843] flex items-center justify-center">
                  <User size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Personal Information</h3>
                  <p className="text-xs text-gray-500">Overview of the lead details</p>
                </div>
              </div>
              <button
                onClick={() => router.push(`/telecaller/leads/${leadId}`)}
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B1538] hover:text-[#60102a] transition-colors"
              >
                Edit
              </button>
            </div>
            <div className="grid gap-4">
              {[
                { label: "Full Name", value: personalInfo.fullName, icon: User },
                { label: "Gender", value: personalInfo.gender, icon: AlertTriangle },
                { label: "Category", value: personalInfo.category, icon: ShieldAlert },
                { label: "Nationality", value: personalInfo.nationality, icon: Globe },
                { label: "Address", value: personalInfo.address, icon: Home },
                { label: "City / State", value: personalInfo.cityState, icon: MapPin },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-1">{label}</p>
                    <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="premium-card rounded-[20px] p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] text-[#1D4ED8] flex items-center justify-center">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Call Logs</h3>
                    <p className="text-xs text-gray-500">Recent call activity</p>
                  </div>
                </div>
                <button className="text-xs font-semibold text-[#8B1538] hover:text-[#60102a] transition-colors">
                  View All
                </button>
              </div>

              {totalCalls === 0 ? (
                <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                  No call logs available.
                </div>
              ) : (
                <div className="space-y-4">
                  {callLogs.slice(0, 3).map((call, idx) => (
                    <div key={idx} className="flex flex-col gap-2 rounded-[20px] border border-gray-100 bg-white p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{call.callerName || assignedName}</p>
                          <p className="text-xs text-gray-500">{formatDisplayDate(call.createdAt || call.time || call.date)}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-[11px] font-semibold ${String(call.status).toLowerCase() === "connected" ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                          <CheckCircle2 size={14} />
                          {call.status || "Pending"}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-600">
                        <p>{call.duration || call.length || "00:00"} min</p>
                        <p>{call.outcome || call.response || "No outcome recorded"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="premium-card rounded-[20px] p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#ECFDF5] text-[#15803D] flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">Assigned Telecaller</h3>
                    <p className="text-xs text-gray-500">Lead assignment summary</p>
                  </div>
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gray-500">{assignedDate}</span>
              </div>

              <div className="rounded-[20px] bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-3xl bg-[#F8FAFC] flex items-center justify-center text-[#1D4ED8] font-semibold text-lg">
                    {assignedName.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-lg font-semibold text-gray-900">{assignedName}</p>
                    <p className="text-sm text-gray-500">Telecaller</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="rounded-3xl bg-white border border-gray-100 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Calls</p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">{totalCalls}</p>
                  </div>
                  <div className="rounded-3xl bg-white border border-gray-100 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Connected</p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">{connectedCalls}</p>
                  </div>
                  <div className="rounded-3xl bg-white border border-gray-100 p-4 text-center">
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-500">Talk Time</p>
                    <p className="mt-2 text-xl font-semibold text-gray-900">{rawData?.talkTime || "00:00"}</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 mt-6 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-gray-400" />
                  <span>{assignedEmail}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-gray-400" />
                  <span>{assignedPhone || "N/A"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <div className="premium-card rounded-[20px] p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#FEF3C7] text-[#92400E] flex items-center justify-center">
                  <Calendar size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Follow-up Tasks</h3>
                  <p className="text-xs text-gray-500">Upcoming lead actions</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-[#8B1538] hover:text-[#60102a] transition-colors">
                Add New Task
              </button>
            </div>

            {followups.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                No follow-up tasks scheduled.
              </div>
            ) : (
              <div className="space-y-4">
                {followups.slice(0, 4).map((task) => (
                  <div key={task.id || task.leadId || task.name} className="rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{task.name || task.leadName || "Lead Task"}</p>
                        <p className="text-xs text-gray-500">{formatDisplayDate(task.date || task.scheduledDate || task.createdAt)}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] bg-[#F0FDF4] text-[#166534] border border-[#DCFCE7]">
                        {task.status || "Pending"}
                      </span>
                    </div>
                    {task.remarks && <p className="mt-3 text-sm text-gray-600">{task.remarks}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="premium-card rounded-[20px] p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#F3F4F6] text-[#374151] flex items-center justify-center">
                  <ChevronRight size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">Recent Activity</h3>
                  <p className="text-xs text-gray-500">Latest updates on this lead</p>
                </div>
              </div>
              <button className="text-xs font-semibold text-[#8B1538] hover:text-[#60102a] transition-colors">
                View All
              </button>
            </div>

            {activities.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
                No recent activity.
              </div>
            ) : (
              <div className="space-y-4">
                {activities.slice(0, 5).map((item, index) => (
                  <div key={item.id || index} className="flex items-start gap-4 rounded-3xl border border-gray-100 bg-white p-4 shadow-sm">
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-3xl bg-[#FFE4E6] text-[#B91C1C]">
                      <AlertTriangle size={18} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{item.title || item.action || item.type || "Activity logged"}</p>
                      <p className="text-xs text-gray-500 mt-1">{item.description || item.notes || item.remarks || "No additional information."}</p>
                      <p className="text-[11px] text-gray-400 mt-2">{formatDisplayDate(item.createdAt || item.time || item.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
