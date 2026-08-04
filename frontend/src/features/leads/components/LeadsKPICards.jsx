"use client";

import React from "react";

const kpiConfig = [
  {
    key: "all",
    label: "All Leads",
    icon: "group",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    trend: { text: "12% vs last month", icon: "trending_up", color: "text-green-600" },
  },
  {
    key: "new",
    label: "New Leads",
    icon: "notifications_active",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-600",
    note: "Requires immediate action",
  },
  {
    key: "hot",
    label: "Hot Leads",
    icon: "local_fire_department",
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    note: "Active nurturing phase",
  },
  {
    key: "alloted",
    label: "Alloted",
    icon: "check_circle",
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    trend: { text: "24% Conversion Rate", icon: "verified", color: "text-green-600" },
  },
  {
    key: "not-consulted",
    label: "Not Consulted",
    icon: "call_missed",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    note: "Overdue follow-ups",
  },
  {
    key: "opinion-reassign",
    label: "Opinion Reassign",
    icon: "sync_alt",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    note: "Pending verification",
  },
];

export default function LeadsKPICards({ counts = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiConfig.map(({ key, label, icon, iconBg, iconColor, trend, note }) => {
        const count = counts[key];
        return (
          <div
            key={key}
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:-translate-y-0.5 transition-transform"
          >
            <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
              <span className={`material-symbols-outlined text-[20px] ${iconColor}`}>{icon}</span>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-400 mb-0.5">{label}</p>
              <h3 className="text-2xl font-bold text-gray-900">
                {count !== undefined ? count.toLocaleString() : "–"}
              </h3>
            </div>
            {trend && (
              <div className={`flex items-center gap-1 text-xs font-medium ${trend.color}`}>
                <span className="material-symbols-outlined text-[14px]">{trend.icon}</span>
                <span>{trend.text}</span>
              </div>
            )}
            {note && (
              <p className="text-xs text-gray-400">{note}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
