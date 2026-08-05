"use client";

import React from "react";
import { KPICard } from "@/components/dashboard-ui/KPICard";
import { Users, Zap, Flame, CheckCircle2, PhoneMissed, RefreshCcw } from "lucide-react";

const kpiConfig = [
  {
    key: "all",
    label: "All Leads",
    icon: Users,
    variant: "blue",
    trend: "12% vs last month",
    trendDirection: "up",
    note: undefined,
  },
  {
    key: "new",
    label: "New Leads",
    icon: Zap,
    variant: "orange",
    trend: undefined,
    note: "Requires immediate action",
  },
  {
    key: "hot",
    label: "Hot Leads",
    icon: Flame,
    variant: "danger",
    trend: undefined,
    note: "Active nurturing phase",
  },
  {
    key: "alloted",
    label: "Alloted",
    icon: CheckCircle2,
    variant: "success",
    trend: "24% Conversion Rate",
    trendDirection: "up",
    note: undefined,
  },
  {
    key: "not-consulted",
    label: "Not Consulted",
    icon: PhoneMissed,
    variant: "primary",
    trend: undefined,
    note: "Overdue follow-ups",
  },
  {
    key: "opinion-reassign",
    label: "Opinion Reassign",
    icon: RefreshCcw,
    variant: "default",
    trend: undefined,
    note: "Pending verification",
  },
];

export default function LeadsKPICards({ counts = {} }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
      {kpiConfig.map(({ key, label, icon, variant, trend, trendDirection, note }) => (
        <KPICard
          key={key}
          title={label}
          value={counts[key]}
          icon={icon}
          variant={variant}
          trend={trend}
          trendDirection={trendDirection}
          subtitle={note}
        />
      ))}
    </div>
  );
}
