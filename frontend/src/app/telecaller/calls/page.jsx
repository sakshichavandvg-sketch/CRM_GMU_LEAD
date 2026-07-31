"use client";

import React, { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useVoice } from "@/features/telecaller/voice/context/VoiceProvider";

// Voice Components
import VoiceHeader from "@/features/telecaller/voice/components/VoiceHeader";
import DeviceStatusCard from "@/features/telecaller/voice/components/DeviceStatusCard";
import ActiveCallCard from "@/features/telecaller/voice/components/ActiveCallCard";
import QuickDialCard from "@/features/telecaller/voice/components/QuickDialCard";
import AnalyticsCards from "@/features/telecaller/voice/components/AnalyticsCards";
import RecentCallsTable from "@/features/telecaller/voice/components/RecentCallsTable";
import TimelineCard from "@/features/telecaller/voice/components/TimelineCard";
import AudioTestModal from "@/features/telecaller/voice/components/AudioTestModal";
import DeviceSettingsModal from "@/features/telecaller/voice/components/DeviceSettingsModal";

export default function TelecallerCallsPage() {
  const queryClient = useQueryClient();

  // Modal states
  const [isAudioTestOpen, setIsAudioTestOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Call notes (shared between ActiveCallCard and post-call follow-up)
  const [callNotes, setCallNotes] = useState("");

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ["telecaller-calls"] });
    queryClient.invalidateQueries({ queryKey: ["voice-analytics"] });
  };

  return (
    <div
      className="bg-[#FFFFFF] -m-4 sm:-m-6 p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in duration-500 min-h-screen"
      style={{ fontFamily: "var(--font-outfit), sans-serif" }}
    >
      {/* ── HEADER ────────────────────────────────────────────────────── */}
      <VoiceHeader
        onRefresh={handleRefresh}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* ── TOP ROW: Device Status | Active Call | Quick Dial ─────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <DeviceStatusCard onTestAudio={() => setIsAudioTestOpen(true)} />
        <ActiveCallCard callNotes={callNotes} setCallNotes={setCallNotes} />
        <QuickDialCard />
      </div>

      {/* ── ANALYTICS STRIP ──────────────────────────────────────────── */}
      <AnalyticsCards />

      {/* ── MIDDLE ROW: Recent Calls ──────────────────────────────────── */}
      <RecentCallsTable />

      {/* ── BOTTOM ROW: Timeline ─────────────────────────────────────── */}
      <TimelineCard />

      {/* ── MODALS ────────────────────────────────────────────────────── */}
      <AudioTestModal isOpen={isAudioTestOpen} onClose={() => setIsAudioTestOpen(false)} />
      <DeviceSettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}
