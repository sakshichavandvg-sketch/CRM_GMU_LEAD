import React from "react";
import {
  Phone, PhoneIncoming, PhoneOutgoing, Clock, TrendingUp, Timer, Zap, BarChart3, Target, AlertCircle, Mic, Headphones
} from "lucide-react";
import { useVoiceAnalytics } from "../hooks/useVoiceAnalytics";
import { formatDuration } from "../utils/callMapper";
import { KPICard, KPICardSkeleton } from "@/components/dashboard-ui/KPICard";

const AnalyticsSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {[...Array(6)].map((_, i) => (
      <KPICardSkeleton key={i} />
    ))}
  </div>
);

export default function AnalyticsCards() {
  const { analytics, isLoading } = useVoiceAnalytics();

  if (isLoading) return <AnalyticsSkeleton />;

  const cards = [
    {
      label: "Calls Today",
      value: analytics.callsToday,
      icon: Phone,
      variant: "blue",
    },
    {
      label: "Connected",
      value: analytics.connected,
      icon: PhoneOutgoing,
      variant: "success",
    },
    {
      label: "Busy",
      value: analytics.busy,
      icon: AlertCircle,
      variant: "warning",
    },
    {
      label: "No Response",
      value: analytics.noResponse,
      icon: PhoneIncoming,
      variant: "danger",
    },
    {
      label: "Avg Duration",
      value: formatDuration(analytics.avgDuration),
      icon: Timer,
      variant: "purple",
    },
    {
      label: "Total Time",
      value: formatDuration(analytics.totalDuration),
      icon: Clock,
      variant: "info",
    },
    {
      label: "Longest Call",
      value: formatDuration(analytics.longestCall),
      icon: TrendingUp,
      variant: "cyan",
    },
    {
      label: "Shortest Call",
      value: formatDuration(analytics.shortestCall),
      icon: Zap,
      variant: "orange",
    },
    {
      label: "Connection %",
      value: `${analytics.connectionRate}%`,
      icon: BarChart3,
      variant: "blue",
    },
    {
      label: "Busy %",
      value: `${analytics.busyRate}%`,
      icon: Target,
      variant: "danger",
    },
    // NEW CARDS
    {
      label: "Recording %",
      value: `${analytics.recordingRate}%`,
      icon: Mic,
      variant: "purple",
    },
    {
      label: "Avg Talk Time",
      value: formatDuration(analytics.avgTalkTime),
      icon: Headphones,
      variant: "success",
    },
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
      <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Today's Analytics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => (
          <KPICard
            key={card.label}
            title={card.label}
            value={card.value}
            icon={card.icon}
            variant={card.variant}
          />
        ))}
      </div>
    </div>
  );
}
