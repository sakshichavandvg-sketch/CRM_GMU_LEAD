"use client";

import React from "react";
import { Phone, PhoneCall, Clock, Mic } from "lucide-react";
import { KPICard, KPICardSkeleton } from "@/components/dashboard-ui/KPICard";

function formatAvgDuration(seconds) {
  if (!seconds && seconds !== 0) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}

function calcConnectedRate(connected, total) {
  if (!total) return "0%";
  return `${Math.round((connected / total) * 100)}%`;
}

export default function TelecallerSummary({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  const totalCalls = data?.totalCalls ?? 0;
  const connectedCalls = data?.connectedCalls ?? 0;
  const avgDuration = data?.avgDuration ?? 0;
  const recordingsCount = data?.recordingsCount ?? 0;

  const kpis = [
    {
      title: "Total Calls",
      value: totalCalls,
      icon: Phone,
      variant: "blue",
      trend: data?.callsTrend ?? null,
      trendDirection: "up",
    },
    {
      title: "Connected Rate",
      value: calcConnectedRate(connectedCalls, totalCalls),
      icon: PhoneCall,
      variant: "success",
      trend: null,
    },
    {
      title: "Avg Duration",
      value: formatAvgDuration(avgDuration),
      icon: Clock,
      variant: "warning",
      trend: null,
    },
    {
      title: "Recordings",
      value: recordingsCount,
      icon: Mic,
      variant: "purple",
      trend: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <KPICard
          key={kpi.title}
          title={kpi.title}
          value={kpi.value}
          icon={kpi.icon}
          variant={kpi.variant}
          trend={kpi.trend}
          trendDirection={kpi.trendDirection}
        />
      ))}
    </div>
  );
}
