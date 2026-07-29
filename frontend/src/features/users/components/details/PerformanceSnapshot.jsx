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
      colorClass: "bg-blue-50",
      iconColorClass: "text-blue-600",
    },
    {
      title: "Converted Leads",
      value: kpi.convertedLeads,
      icon: TrendingUp,
      colorClass: "bg-emerald-50",
      iconColorClass: "text-emerald-600",
    },
    {
      title: "Calls Today",
      value: kpi.callsToday,
      icon: Phone,
      colorClass: "bg-amber-50",
      iconColorClass: "text-amber-600",
    },
    {
      title: "Calls This Month",
      value: kpi.callsThisMonth,
      icon: CalendarDays,
      colorClass: "bg-purple-50",
      iconColorClass: "text-purple-600",
    },
    {
      title: "Conversion Rate",
      value: `${kpi.conversionRate}%`,
      icon: Target,
      colorClass: "bg-rose-50",
      iconColorClass: "text-[#6F1D28]",
    },
    {
      title: "Pending Follow-ups",
      value: kpi.pendingFollowUps,
      icon: Clock,
      colorClass: "bg-red-50",
      iconColorClass: "text-red-600",
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
          colorClass={metric.colorClass}
          iconColorClass={metric.iconColorClass}
        />
      ))}
    </div>
  );
}
