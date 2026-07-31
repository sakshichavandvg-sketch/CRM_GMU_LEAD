import React from "react";
import { Phone } from "lucide-react";
import { getOutcomeStyle, formatCallDate, formatDuration, getCallDirection } from "@/features/telecaller/voice/utils/callMapper";

export default function SummaryTab({ call }) {
  if (!call) return null;

  return (
    <div className="py-4">
      <h4 className="text-sm font-[700] text-gray-900 mb-4 flex items-center gap-2">
        <Phone size={16} className="text-gray-400" />
        Call Summary
      </h4>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-4">
          <span className="text-xs font-[600] text-gray-500 uppercase tracking-wider block mb-2">Outcome</span>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-[600] border ${getOutcomeStyle(call.outcome || call.callOutcome).bg} ${getOutcomeStyle(call.outcome || call.callOutcome).text}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${getOutcomeStyle(call.outcome || call.callOutcome).dot}`} />
            {call.outcome || call.callOutcome || "Unknown"}
          </span>
        </div>
        
        <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-4">
          <span className="text-xs font-[600] text-gray-500 uppercase tracking-wider block mb-2">Duration</span>
          <span className="text-[15px] font-mono text-gray-900 font-[600]">
            {formatDuration(call.callDurationSeconds || call.callDuration || call.duration || 0)}
          </span>
        </div>
        
        <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-4">
          <span className="text-xs font-[600] text-gray-500 uppercase tracking-wider block mb-2">Direction</span>
          <span className="text-[14px] text-gray-900 font-[500]">
            {getCallDirection(call)}
          </span>
        </div>
        
        <div className="bg-gray-50 border border-[#ECECEC] rounded-xl p-4">
          <span className="text-xs font-[600] text-gray-500 uppercase tracking-wider block mb-2">Date & Time</span>
          <span className="text-[14px] text-gray-900 font-[500]">
            {formatCallDate(call.callDateTime || call.createdAt || call.date)}
          </span>
        </div>
      </div>
    </div>
  );
}
