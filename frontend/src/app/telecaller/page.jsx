"use client";

import { useState, useEffect } from "react";
import { useTelecallerDashboard } from "@/features/telecaller/hooks/useTelecallerDashboard";
import { useVoice } from "@/features/telecaller/voice/context/VoiceProvider";

// Header
import DashboardHeader from "@/features/telecaller/components/header/DashboardHeader";

// KPI
import KPISection from "@/features/telecaller/components/kpi/KPISection";
import TodaysFocus from "@/features/telecaller/components/kpi/TodaysFocus";
import TodayGoalGauge from "@/features/telecaller/components/kpi/TodayGoalGauge";

// Actions
import NextCallsCard from "@/features/telecaller/components/actions/NextCallsCard";
import QuickActions from "@/features/telecaller/components/actions/QuickActions";

// Pipeline & Analytics
import PipelineSection from "@/features/telecaller/components/pipeline/PipelineSection";
import AnalyticsTrends from "@/features/telecaller/components/analytics/AnalyticsTrends";
import WeeklyPerformance from "@/features/telecaller/components/analytics/WeeklyPerformance";

// Followups & Activity
import UpcomingFollowups from "@/features/telecaller/components/followups/UpcomingFollowups";
import RecentActivity from "@/features/telecaller/components/activity/RecentActivity";

// Modals
import LogCallModal from "@/features/telecaller/components/LogCallModal";

export default function TelecallerDashboard() {
  const { data, isLoading, error } = useTelecallerDashboard();
  const [isLogCallOpen, setIsLogCallOpen] = useState(false);
  const [selectedEnquiryNo, setSelectedEnquiryNo] = useState(null);
  
  const { postCallEnquiryNo, setPostCallEnquiryNo } = useVoice();

  // If a call just ended, open the log call modal automatically
  useEffect(() => {
    if (postCallEnquiryNo) {
      setSelectedEnquiryNo(postCallEnquiryNo);
      setIsLogCallOpen(true);
      setPostCallEnquiryNo(null);
    }
  }, [postCallEnquiryNo, setPostCallEnquiryNo]);

  const handleCloseLogCall = () => {
    setIsLogCallOpen(false);
    setSelectedEnquiryNo(null);
  };

  // If there's a hard error loading the whole dashboard (e.g. 500)
  if (error) {
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 rounded-2xl border border-red-100">
        Failed to load dashboard data. Please refresh.
      </div>
    );
  }

  // The page acts as a lightweight composition layer. 
  // It passes isLoading and specific data slices to widgets.
  // Each widget is responsible for rendering its own skeleton if isLoading is true,
  // or its own empty state if data is missing.

  return (
    <div 
      className="bg-[#FFFFFF] -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-500 min-h-screen" 
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* ── HEADER & SUMMARY STRIP ────────────────────────────────────────── */}
      <DashboardHeader 
        isLoading={isLoading} 
        summary={data?.summary} 
      />

      {/* ── KPI CARDS ─────────────────────────────────────────────────────── */}
      <KPISection 
        isLoading={isLoading} 
        summary={data?.summary} 
      />

      {/* ── ROW 1: 3-Column (Desktop) ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <NextCallsCard 
          isLoading={isLoading} 
          nextCalls={data?.nextCalls} 
          onLogCall={(enquiryNo) => {
            setSelectedEnquiryNo(enquiryNo);
            setIsLogCallOpen(true);
          }} 
        />
        <TodaysFocus 
          isLoading={isLoading} 
          focus={data?.todaysFocus} 
        />
        <TodayGoalGauge 
          isLoading={isLoading} 
          goal={data?.summary?.goal} 
          completed={data?.summary?.callsToday}
        />
      </div>

      {/* ── ROW 2: 2-Column (Desktop) ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PipelineSection 
          isLoading={isLoading} 
          pipeline={data?.pipeline} 
        />
        <UpcomingFollowups 
          isLoading={isLoading} 
          followups={data?.nextCalls} // Or a separate followups array if we add it
        />
      </div>

      {/* ── ROW 3: 2-Column (Desktop) ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsTrends 
          isLoading={isLoading} 
          analytics={data?.analytics} 
        />
        <WeeklyPerformance 
          isLoading={isLoading} 
          weeklyPerformance={data?.weeklyPerformance} 
        />
      </div>

      {/* ── ROW 4: 2-Column (Desktop) ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity 
          isLoading={isLoading} 
          activities={data?.activities} 
        />
        <QuickActions 
          isLoading={isLoading} 
        />
      </div>

      {/* ── MODALS ────────────────────────────────────────────────────────── */}
      {isLogCallOpen && (
        <LogCallModal 
          open={isLogCallOpen} 
          onClose={handleCloseLogCall} 
          enquiryNo={selectedEnquiryNo} 
        />
      )}
    </div>
  );
}