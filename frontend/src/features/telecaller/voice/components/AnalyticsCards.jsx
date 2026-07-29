import React from "react";
import {
  Phone, PhoneIncoming, PhoneOutgoing, Clock, TrendingUp, Timer, Zap, BarChart3, Target, AlertCircle, Mic, Headphones
} from "lucide-react";
import { useVoiceAnalytics } from "../hooks/useVoiceAnalytics";
import { formatDuration } from "../utils/callMapper";

const AnalyticsSkeleton = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="bg-white border border-[#ECECEC] rounded-[16px] p-4 animate-pulse">
        <div className="w-8 h-8 bg-gray-100 rounded-lg mb-3" />
        <div className="w-12 h-6 bg-gray-100 rounded mb-1" />
        <div className="w-16 h-3 bg-gray-100 rounded" />
      </div>
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
      icon: <Phone size={16} />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Connected",
      value: analytics.connected,
      icon: <PhoneOutgoing size={16} />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Busy",
      value: analytics.busy,
      icon: <AlertCircle size={16} />,
      color: "bg-amber-50 text-amber-600",
    },
    {
      label: "No Response",
      value: analytics.noResponse,
      icon: <PhoneIncoming size={16} />,
      color: "bg-red-50 text-red-600",
    },
    {
      label: "Avg Duration",
      value: formatDuration(analytics.avgDuration),
      icon: <Timer size={16} />,
      color: "bg-purple-50 text-purple-600",
    },
    {
      label: "Total Time",
      value: formatDuration(analytics.totalDuration),
      icon: <Clock size={16} />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Longest Call",
      value: formatDuration(analytics.longestCall),
      icon: <TrendingUp size={16} />,
      color: "bg-teal-50 text-teal-600",
    },
    {
      label: "Shortest Call",
      value: formatDuration(analytics.shortestCall),
      icon: <Zap size={16} />,
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "Connection %",
      value: `${analytics.connectionRate}%`,
      icon: <BarChart3 size={16} />,
      color: "bg-cyan-50 text-cyan-600",
    },
    {
      label: "Busy %",
      value: `${analytics.busyRate}%`,
      icon: <Target size={16} />,
      color: "bg-rose-50 text-rose-600",
    },
    // NEW CARDS
    {
      label: "Recording %",
      value: `${analytics.recordingRate}%`,
      icon: <Mic size={16} />,
      color: "bg-fuchsia-50 text-fuchsia-600",
    },
    {
      label: "Avg Talk Time",
      value: formatDuration(analytics.avgTalkTime),
      icon: <Headphones size={16} />,
      color: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
      <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Today's Analytics</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {cards.map((card) => (
          <div
            key={card.label}
            className="flex flex-col gap-2 p-4 rounded-[14px] border border-[#ECECEC] hover:shadow-sm transition-shadow"
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.color}`}>
              {card.icon}
            </div>
            <span className="text-[20px] font-[700] text-gray-900 leading-tight">{card.value}</span>
            <span className="text-xs text-gray-500 font-[500]">{card.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
