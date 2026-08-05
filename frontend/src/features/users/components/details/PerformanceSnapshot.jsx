"use client";

import { Users, Phone, CalendarDays, TrendingUp, Target, Clock } from "lucide-react";
import { KPICard } from "@/components/dashboard-ui/KPICard";

export default function PerformanceSnapshot({ kpi }) {
  if (!kpi) return null;

  const metrics = [
    {
      title: "Assigned Leads",
      value: kpi.assignedLeads,
      icon: Users,
      variant: "blue",
    },
    {
      title: "Converted Leads",
      value: kpi.convertedLeads,
      icon: TrendingUp,
      variant: "success",
    },
    {
      title: "Calls Today",
      value: kpi.callsToday,
      icon: Phone,
      variant: "warning",
    },
    {
      title: "Calls This Month",
      value: kpi.callsThisMonth,
      icon: CalendarDays,
      variant: "purple",
    },
    {
      title: "Conversion Rate",
      value: `${kpi.conversionRate}%`,
      icon: Target,
      variant: "danger",
    },
    {
      title: "Pending Follow-ups",
      value: kpi.pendingFollowUps,
      icon: Clock,
      variant: "primary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-5">
      {metrics.map((metric, index) => (
        <KPICard 
          key={index}
          title={metric.title}
          value={metric.value}
          icon={metric.icon}
          variant={metric.variant}
        />
      ))}
    </div>
  );
}
