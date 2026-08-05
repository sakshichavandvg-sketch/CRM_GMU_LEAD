import React from "react";
import { KPICard, KPICardSkeleton } from "@/components/dashboard-ui/KPICard";
import { Phone, PhoneCall, Clock, Mic } from "lucide-react";

function formatAvgDuration(seconds) {
  if (!seconds && seconds !== 0) return "—";
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function calcConnectedRate(connected, total) {
  if (!total) return "0%";
  return `${Math.round((connected / total) * 100)}%`;
}

export default function StitchKPISection({ data, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter">
        {[...Array(4)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  const totalCalls = data?.totalCalls ?? 0;
  const connectedCalls = data?.connectedCalls ?? 0;
  const avgDuration = data?.avgDuration ?? 0;
  const recordingsCount = data?.recordingsCount ?? 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-4 gap-grid-gutter">
      <KPICard
        title="Total Calls"
        value={totalCalls}
        subtitle="Total calls"
        icon={Phone}
        variant="blue"
      />
      <KPICard
        title="Connected Rate"
        value={calcConnectedRate(connectedCalls, totalCalls)}
        subtitle={`${connectedCalls} / ${totalCalls} Connected`}
        icon={PhoneCall}
        variant="success"
      />
      <KPICard
        title="Avg Duration"
        value={formatAvgDuration(avgDuration)}
        subtitle="Per call average"
        icon={Clock}
        variant="warning"
      />
      <KPICard
        title="Recordings"
        value={recordingsCount}
        subtitle="Available recordings"
        icon={Mic}
        variant="purple"
      />
    </section>
  );
}
