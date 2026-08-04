"use client";

import React from "react";

const STATS = [
  {
    label: "TOTAL CALLS",
    value: "—",
    icon: "call",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "—",
    trendBg: "bg-green-100",
    trendColor: "text-green-700",
    trendIcon: "trending_up",
    subtext: "vs last month",
  },
  {
    label: "CONNECTED",
    value: "—",
    icon: "call_made",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    trend: "—",
    trendBg: "bg-surface-container",
    trendColor: "text-on-surface-variant",
    subtext: "Success rate",
  },
  {
    label: "AVG DURATION",
    value: "—",
    icon: "timer",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    trend: "—",
    trendBg: "bg-orange-50",
    trendColor: "text-orange-700",
    subtext: "Per call avg",
  },
  {
    label: "RECORDINGS",
    value: "—",
    icon: "mic",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    trend: "—",
    trendBg: "bg-purple-50",
    trendColor: "text-purple-700",
    subtext: "Available files",
  },
  {
    label: "SUCCESS RATE",
    value: "—",
    icon: "trending_up",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-600",
    trend: "—",
    trendBg: "bg-sky-50",
    trendColor: "text-sky-700",
    subtext: "Conversion",
  },
  {
    label: "TODAY'S CALLS",
    value: "—",
    icon: "calendar_today",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    trend: "—",
    trendBg: "bg-red-50",
    trendColor: "text-red-700",
    subtext: "vs yesterday",
  },
];

export default function CallReportsStats() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-horizontal_gap mb-vertical_gap">
      {STATS.map((stat, i) => (
        <div
          key={i}
          className="bg-surface-container-lowest p-6 rounded-[24px] glass-card flex flex-col gap-4 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
        >
          <div className="flex justify-between items-start">
            <div
              className={`w-12 h-12 rounded-full ${stat.iconBg} flex items-center justify-center ${stat.iconColor}`}
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>
                {stat.icon}
              </span>
            </div>
            <span
              className={`${stat.trendBg} ${stat.trendColor} font-label-md py-1 px-3 rounded-full flex items-center gap-1`}
            >
              {stat.trendIcon && (
                <span className="material-symbols-outlined text-[16px]">
                  {stat.trendIcon}
                </span>
              )}
              {stat.trend}
            </span>
          </div>
          <div>
            <p className="font-label-md text-on-surface-variant tracking-wider uppercase m-0">
              {stat.label}
            </p>
            <h2 className="font-headline-md text-headline-md mt-1 m-0">
              {stat.value}
            </h2>
            <p className="font-description text-secondary mt-1 m-0">
              {stat.subtext}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
