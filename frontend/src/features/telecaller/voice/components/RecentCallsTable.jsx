import React from "react";
import { Play, PhoneIncoming, PhoneOutgoing, PhoneOff } from "lucide-react";
import { useCallHistory } from "../hooks/useCallHistory";
import { formatDuration, formatCallDate, getOutcomeStyle, getCallDirection, getInitials } from "../utils/callMapper";
import { useVoice } from "../context/VoiceProvider";
import CallDetailDrawer from "./CallDetailDrawer";

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
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 flex flex-col">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[16px] font-[600] text-gray-900">Recent Calls</h2>
          <span className="text-xs font-[500] text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {recentCalls.length} calls
          </span>
        </div>

        {/* Table Header */}
        <div className="hidden md:grid md:grid-cols-[2fr_1fr_80px_90px_80px_70px_90px] gap-3 px-3 pb-3 border-b border-[#ECECEC]">
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Lead</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Phone</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Direction</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Duration</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Outcome</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Audio</span>
          <span className="text-[11px] font-[600] text-gray-400 uppercase tracking-wider">Date</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#F5F5F5] flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
          {recentCalls.map((call, idx) => {
            const callId = call.id || call.interactionId;
            const name = call.leadName || call.name || "Unknown";
            const phone = call.phone || call.leadPhone || "--";
            const outcome = call.callOutcome || call.outcome || "Unknown";
            const outcomeStyle = getOutcomeStyle(outcome);
            const direction = getCallDirection(call);
            const duration = call.callDuration || call.duration || 0;
            const hasRecording = call.recordingUrl && call.recordingUrl.trim() !== "";
            const date = formatCallDate(call.callDateTime || call.createdAt || call.date);

            return (
              <div
                key={callId || idx}
                onClick={() => setSelectedCallId(callId)}
                className="grid grid-cols-1 md:grid-cols-[2fr_1fr_80px_90px_80px_70px_90px] gap-3 px-3 py-3 items-center hover:bg-gray-50 cursor-pointer transition-colors rounded-xl"
              >
                {/* Lead */}
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xs font-[700] shrink-0">
                    {getInitials(name)}
                  </div>
                  <span className="text-sm font-[600] text-gray-900 truncate">{name}</span>
                </div>

                {/* Phone */}
                <span className="text-sm text-gray-600 font-mono truncate">{phone}</span>

                {/* Direction */}
                <div className="flex items-center gap-1.5">
                  {direction === "Inbound" ? (
                    <PhoneIncoming size={12} className="text-blue-500" />
                  ) : (
                    <PhoneOutgoing size={12} className="text-gray-400" />
                  )}
                  <span className="text-xs text-gray-500 font-[500]">{direction}</span>
                </div>

                {/* Duration */}
                <span className="text-sm font-mono text-gray-700">{formatDuration(duration)}</span>

                {/* Outcome */}
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-[600] border ${outcomeStyle.bg} ${outcomeStyle.text} ${outcomeStyle.border} whitespace-nowrap`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${outcomeStyle.dot}`} />
                  {outcome}
                </span>

                {/* Recording */}
                <div>
                  {hasRecording ? (
                    <div className="text-[#7A1F2B] w-fit p-1 bg-[#7A1F2B]/5 rounded-md" title="Has Recording">
                      <Play size={14} className="ml-0.5" />
                    </div>
                  ) : (
                    <span className="text-gray-300 text-xs">--</span>
                  )}
                </div>

                {/* Date */}
                <span className="text-xs text-gray-500">{date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {selectedCallId && (
        <CallDetailDrawer 
          callId={selectedCallId} 
          onClose={() => setSelectedCallId(null)} 
        />
      )}
    </>
  );
}
