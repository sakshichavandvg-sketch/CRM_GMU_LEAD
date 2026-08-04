import React from "react";
import { KPICardSkeleton } from "@/components/dashboard-ui/KPICard";

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
      {/* Total Calls */}
      <div className="bg-white p-card-padding rounded-[24px] main-shadow border border-outline-variant/50 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-blue-600 text-3xl">call</span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wider">Total Calls</p>
          <h2 className="font-kpi-value text-kpi-value text-on-surface">{totalCalls}</h2>
          <p className="text-on-surface-variant text-[11px]">Total calls</p>
        </div>
      </div>
      {/* Connected Rate */}
      <div className="bg-white p-card-padding rounded-[24px] main-shadow border border-outline-variant/50 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-emerald-600 text-3xl">phone_enabled</span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wider">Connected Rate</p>
          <h2 className="font-kpi-value text-kpi-value text-on-surface">{calcConnectedRate(connectedCalls, totalCalls)}</h2>
          <p className="text-on-surface-variant text-[11px]">{connectedCalls} / {totalCalls} Connected</p>
        </div>
      </div>
      {/* Avg Duration */}
      <div className="bg-white p-card-padding rounded-[24px] main-shadow border border-outline-variant/50 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-orange-500 text-3xl">timer</span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wider">Avg Duration</p>
          <h2 className="font-kpi-value text-kpi-value text-on-surface">{formatAvgDuration(avgDuration)}</h2>
          <p className="text-on-surface-variant text-[11px]">Per call average</p>
        </div>
      </div>
      {/* Recordings */}
      <div className="bg-white p-card-padding rounded-[24px] main-shadow border border-outline-variant/50 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center">
          <span className="material-symbols-outlined text-purple-600 text-3xl">mic</span>
        </div>
        <div>
          <p className="text-on-surface-variant font-label-sm text-label-sm mb-1 uppercase tracking-wider">Recordings</p>
          <h2 className="font-kpi-value text-kpi-value text-on-surface">{recordingsCount}</h2>
          <p className="text-on-surface-variant text-[11px]">Available recordings</p>
        </div>
      </div>
    </section>
  );
}
