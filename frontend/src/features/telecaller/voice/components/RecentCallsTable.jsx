import React from "react";
import { Play, PhoneIncoming, PhoneOutgoing, PhoneOff } from "lucide-react";
import { useCallHistory } from "../hooks/useCallHistory";
import { formatDuration, getOutcomeStyle, getCallDirection, getInitials } from "../utils/callMapper";
import { useVoice } from "@/features/telecaller/voice/context/VoiceProvider";
import CallDetailsModal from "./details/CallDetailsModal";

const formatCompactDate = (dateStr) => {
  if (!dateStr) return "—";
  const date = new Date(dateStr);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterdayStart = new Date(todayStart);
  yesterdayStart.setDate(yesterdayStart.getDate() - 1);

  const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });

  if (date >= todayStart) return `Today • ${time}`;
  if (date >= yesterdayStart) return `Yesterday • ${time}`;

  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" }) + ` • ${time}`;
};
const TableSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center gap-4 p-3 animate-pulse">
        <div className="w-10 h-10 rounded-full bg-gray-100 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="w-24 h-4 bg-gray-100 rounded" />
          <div className="w-16 h-3 bg-gray-100 rounded" />
        </div>
        <div className="w-16 h-4 bg-gray-100 rounded" />
        <div className="w-14 h-4 bg-gray-100 rounded" />
      </div>
    ))}
  </div>
);

export default function RecentCallsTable() {
  const { data: calls, isLoading } = useCallHistory();
  const { selectedCallId, setSelectedCallId } = useVoice();

  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Recent Calls</h2>
        <TableSkeleton />
      </div>
    );
  }

  const recentCalls = (calls || [])
    .sort((a, b) => new Date(b.callDateTime || b.createdAt || b.date) - new Date(a.callDateTime || a.createdAt || a.date))
    .slice(0, 20);

  if (recentCalls.length === 0) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Recent Calls</h2>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <PhoneOff className="text-gray-300" size={24} />
          </div>
          <p className="text-sm font-[600] text-gray-900">No Calls Yet</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[220px]">
            Start your first call using the Quick Dial panel.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 flex flex-col max-h-[500px] md:h-[500px]">
        <div className="flex items-center justify-between mb-5 shrink-0">
          <h2 className="text-[16px] font-[600] text-gray-900">Recent Calls</h2>
          <span className="text-xs font-[500] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {recentCalls.length} calls
          </span>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#D1D5DB] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-[#9CA3AF] -mx-2 px-2">
          <div className="w-full">
            {/* Table Header */}
            <div className="hidden md:grid md:grid-cols-[28%_12%_10%_10%_12%_8%_20%] gap-3 px-4 pb-3 border-b border-[#ECECEC] sticky top-0 bg-white z-10 pt-1">
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Lead</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Phone</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Direction</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Duration</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Outcome</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-center">Audio</span>
              <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider text-left">Date</span>
            </div>

            {/* Rows */}
            <div className="divide-y divide-[#F5F5F5]">
          {recentCalls.map((call, idx) => {
            const callId = call.callId || call.id || call.interactionId;
            const name = call.leadName || call.name || "Unknown";
            const phone = call.phone || call.leadPhone || "--";
            const outcome = call.outcome || call.callOutcome || "Unknown";
            const outcomeStyle = getOutcomeStyle(outcome);
            const direction = getCallDirection(call);
            const duration = call.callDurationSeconds || call.callDuration || call.duration || 0;
            const hasRecording = call.recordingUrl && call.recordingUrl.trim() !== "";
            const date = formatCompactDate(call.callDateTime || call.createdAt || call.date);

            return (
              <div
                key={callId || idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCallId(callId);
                }}
                className="grid grid-cols-1 md:grid-cols-[28%_12%_10%_10%_12%_8%_20%] gap-3 px-4 h-[56px] items-center align-middle hover:bg-gray-50 transition-all duration-150 cursor-pointer rounded-xl"
              >
                {/* Lead */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xs font-[700] shrink-0">
                    {getInitials(name)}
                  </div>
                  <span className="text-sm font-[600] text-gray-900 truncate">{name}</span>
                </div>

                {/* Phone */}
                <span className="text-sm text-gray-600 font-mono truncate text-left">{phone}</span>

                {/* Direction */}
                <div className="flex items-center gap-1.5 text-left">
                  {direction === "Inbound" ? (
                    <PhoneIncoming size={12} className="text-blue-500" />
                  ) : (
                    <PhoneOutgoing size={12} className="text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500 font-[500]">{direction}</span>
                </div>

                {/* Duration */}
                <span className="text-sm font-mono text-gray-700 text-left">{formatDuration(duration)}</span>

                {/* Outcome */}
                <div className="flex items-center text-left">
                  <span
                    className={`inline-flex items-center justify-center h-7 px-3 rounded-full text-[11px] font-[600] border ${outcomeStyle.bg} ${outcomeStyle.text} ${outcomeStyle.border} whitespace-nowrap gap-1.5`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${outcomeStyle.dot}`} />
                    {outcome}
                  </span>
                </div>

                {/* Recording */}
                <div className="flex items-center justify-center">
                  {hasRecording ? (
                    <div className="text-[#7A1F2B] w-fit p-1 bg-[#7A1F2B]/5 rounded-md flex items-center justify-center" title="Has Recording">
                      <Play size={14} className="ml-0.5" />
                    </div>
                  ) : (
                    <span className="text-gray-400 font-medium">—</span>
                  )}
                </div>

                {/* Date */}
                <span className="text-xs text-gray-500 text-left truncate">{date}</span>
              </div>
            );
          })}
            </div>
          </div>
        </div>
      </div>

      {selectedCallId && (
        <CallDetailsModal 
          callId={selectedCallId}
          open={!!selectedCallId} 
          defaultTab="summary"
          onClose={() => setSelectedCallId(null)} 
        />
      )}
    </>
  );
}
