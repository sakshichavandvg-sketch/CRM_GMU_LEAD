"use client";

import React from "react";
import { KPICard } from "@/components/dashboard-ui/KPICard";
import { Phone, PhoneOutgoing, Clock, Mic, TrendingUp, CalendarDays } from "lucide-react";

export default function CallReportsStats({ stats = {} }) {
  const kpiConfig = [
    {
      key: "totalCalls",
      label: "Total Calls",
      icon: Phone,
      variant: "blue",
      value: stats.totalCalls ?? "—",
      trend: undefined,
      note: "Total volume",
    },
    {
      key: "connectedCalls",
      label: "Connected",
      icon: PhoneOutgoing,
      variant: "success",
      value: stats.connectedCalls ?? "—",
      trend: undefined,
      note: "Answered calls",
    },
    {
      key: "avgDuration",
      label: "Avg Duration",
      icon: Clock,
      variant: "orange",
      value: stats.avgDuration ?? "—",
      trend: undefined,
      note: "Per call avg",
    },
    {
      key: "recordings",
      label: "Recordings",
      icon: Mic,
      variant: "purple",
      value: stats.recordings ?? "—",
      trend: undefined,
      note: "Available files",
    },
    {
      key: "successRate",
      label: "Success Rate",
      icon: TrendingUp,
      variant: "primary",
      value: stats.successRate ? `${stats.successRate}%` : "—",
      trend: undefined,
      note: "Conversion",
    },
    {
      key: "todaysCalls",
      label: "Today's Calls",
      icon: CalendarDays,
      variant: "danger",
      value: stats.todaysCalls ?? "—",
      trend: undefined,
      note: "Active today",
    },
  ];

  return (
    <section className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
      {kpiConfig.map((kpi) => (
        <KPICard
          key={kpi.key}
          title={kpi.label}
          value={kpi.value}
          icon={kpi.icon}
          variant={kpi.variant}
          trend={kpi.trend}
          subtitle={kpi.note}
        />
      ))}
    </section>
  );
}
