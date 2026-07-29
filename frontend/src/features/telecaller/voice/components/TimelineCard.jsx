import React from "react";
import { PhoneOutgoing, PhoneIncoming, Clock } from "lucide-react";
import { useCallHistory } from "../hooks/useCallHistory";
import { formatTime, getOutcomeStyle, getCallDirection, formatDuration } from "../utils/callMapper";

export default function TimelineCard() {
  const { data: calls, isLoading } = useCallHistory();

  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Activity Timeline</h2>
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-3 animate-pulse">
              <div className="w-2 h-2 mt-2 rounded-full bg-gray-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="w-20 h-3 bg-gray-100 rounded" />
                <div className="w-32 h-4 bg-gray-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sorted = [...(calls || [])]
    .sort((a, b) => new Date(b.callDateTime || b.createdAt || b.date) - new Date(a.callDateTime || a.createdAt || a.date))
    .slice(0, 25);

  if (sorted.length === 0) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
        <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Activity Timeline</h2>
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <Clock className="text-gray-300" size={24} />
          </div>
          <p className="text-sm font-[600] text-gray-900">No activity yet</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[220px]">
            Your call timeline will build up as you make calls.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6">
      <h2 className="text-[16px] font-[600] text-gray-900 mb-5">Activity Timeline</h2>

      <div className="relative max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
        {/* Vertical line */}
        <div className="absolute left-[7px] top-2 bottom-2 w-[2px] bg-[#ECECEC]" />

        <div className="space-y-0">
          {sorted.map((call, idx) => {
            const name = call.leadName || call.name || "Unknown";
            const outcome = call.callOutcome || call.outcome || "Unknown";
            const outcomeStyle = getOutcomeStyle(outcome);
            const direction = getCallDirection(call);
            const time = formatTime(call.callDateTime || call.createdAt || call.date);
            const duration = call.callDuration || call.duration || 0;

            return (
              <div key={call.id || call.interactionId || idx} className="flex gap-4 relative py-3">
                {/* Dot */}
                <div className={`w-4 h-4 rounded-full border-2 border-white ${outcomeStyle.dot} shrink-0 mt-0.5 z-10 shadow-sm`} />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-mono text-gray-400">{time}</span>
                    <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-[600] ${outcomeStyle.bg} ${outcomeStyle.text}`}>
                      {outcome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-[600] text-gray-900 truncate">{name}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="text-xs text-gray-500">{formatDuration(duration)}</span>
                    <span className="text-xs text-gray-400">•</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      {direction === "Inbound" ? <PhoneIncoming size={10} /> : <PhoneOutgoing size={10} />}
                      {direction}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
