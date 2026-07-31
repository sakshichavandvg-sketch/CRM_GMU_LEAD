import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { useCallDetails } from "@/features/telecaller/hooks/useCalls";
import CallHeader from "./CallHeader";
import SummaryTab from "./tabs/SummaryTab";
import RecordingTab from "./tabs/RecordingTab";
import TimelineTab from "./tabs/TimelineTab";
import NotesTab from "./tabs/NotesTab";

const CallDetailsSkeleton = () => (
  <div className="space-y-6 animate-pulse">
    <div className="flex items-center gap-4 border-b border-[#ECECEC] pb-4">
      <div className="w-14 h-14 rounded-full bg-gray-100" />
      <div className="space-y-2">
        <div className="w-32 h-6 bg-gray-100 rounded" />
        <div className="w-24 h-4 bg-gray-100 rounded" />
      </div>
    </div>
    <div className="h-10 w-full bg-gray-100 rounded-lg" />
    <div className="w-full h-40 bg-gray-100 rounded-xl" />
  </div>
);

export default function CallDetailsView({ callId, defaultTab = "summary", showRecording = false }) {
  const { data: call, isLoading, isError } = useCallDetails(callId);
  const [activeTab, setActiveTab] = useState(defaultTab);

  if (isLoading) {
    return <CallDetailsSkeleton />;
  }

  if (isError || !call) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <AlertCircle size={32} className="text-red-400 mb-3" />
        <p className="text-sm font-[600] text-gray-900">Failed to load call details</p>
      </div>
    );
  }

  const tabs = [
    { id: "summary", label: "Summary" },
    ...(showRecording ? [{ id: "recording", label: "Recording" }] : []),
    { id: "timeline", label: "Timeline" },
    { id: "notes", label: "Notes" },
  ];

  return (
    <div className="flex flex-col space-y-6 h-full">
      <CallHeader call={call} />

      {/* Tabs Navigation */}
      <div className="flex items-center gap-4 border-b border-[#ECECEC]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 px-1 text-[13px] font-[600] border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#7A1F2B] text-[#7A1F2B]"
                : "border-transparent text-gray-400 hover:text-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "summary" && <SummaryTab call={call} />}
        {activeTab === "recording" && showRecording && <RecordingTab call={call} callId={callId} />}
        {activeTab === "timeline" && <TimelineTab enquiryNo={call.enquiryNo} />}
        {activeTab === "notes" && <NotesTab call={call} />}
      </div>
    </div>
  );
}
