"use client";

import { Users, Phone, CalendarDays, TrendingUp, Target, Clock } from "lucide-react";

export default function PerformanceSnapshot({ kpi }) {
  if (!kpi) return null;

  const metrics = [
    {
      title: "Assigned Leads",
      value: kpi.assignedLeads,
      icon: Users,
      color: "bg-blue-50 text-blue-600 border border-blue-100",
    },
    {
      title: "Converted Leads",
      value: kpi.convertedLeads,
      icon: TrendingUp,
      color: "bg-emerald-50 text-emerald-600 border border-emerald-100",
    },
    {
      title: "Calls Today",
      value: kpi.callsToday,
      icon: Phone,
      color: "bg-amber-50 text-amber-600 border border-amber-100",
    },
    {
      title: "Calls This Month",
      value: kpi.callsThisMonth,
      icon: CalendarDays,
      color: "bg-purple-50 text-purple-600 border border-purple-100",
    },
    {
      title: "Conversion Rate",
      value: `${kpi.conversionRate}%`,
      icon: Target,
      color: "bg-rose-50 text-[#6F1D28] border border-rose-100",
    },
    {
      title: "Pending Follow-ups",
      value: kpi.pendingFollowUps,
      icon: Clock,
      color: "bg-red-50 text-red-600 border border-red-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`p-2 rounded-full ${metric.color}`}>
              <metric.icon size={18} strokeWidth={1.5} />
            </div>
            <span className="text-sm font-medium text-gray-500">{metric.title}</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</div>
        </div>
      ))}
    </div>
  );
}
