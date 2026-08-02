import { Clock, ExternalLink, RefreshCw } from "lucide-react";
import React from "react";
import Link from "next/link";

const getPriorityColor = (p) => {
  if (p === "High") return "text-red-700 bg-red-50 border-red-200";
  if (p === "Medium") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-blue-700 bg-blue-50 border-blue-200";
};

export default function DayAgendaItem({ followup, onReschedule }) {
  const {
    id,
    student,
    leadName,
    priority,
    scheduledTime,
    time,
    enquiryNo,
    leadId
  } = followup;

  const displayName = student || leadName || "Unknown Lead";
  const displayTime = scheduledTime || time || "TBA";
  const displayPriority = priority || "Normal";
  
  const leadUrl = `/telecaller/leads/${enquiryNo || leadId || id}`;

  return (
    <div className="flex flex-col bg-white border border-[#ECECEC] rounded-xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-3.5 group">
      
      <div className="flex flex-col mb-3">
        <h4 className="text-sm font-bold text-gray-900 truncate mb-1.5">
          {displayName}
        </h4>
        <div className="flex items-center gap-2 text-slate-500 font-medium text-xs">
          <Clock size={12} className="text-[#7A1F2B]" />
          <span>{displayTime}</span>
          <span className="text-slate-300">•</span>
          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded border ${getPriorityColor(displayPriority)}`}>
            {displayPriority}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 mt-auto">
        <button 
          onClick={() => onReschedule(followup)}
          className="flex-1 flex items-center justify-center gap-1.5 h-8 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-lg text-xs font-semibold transition-colors shadow-sm"
        >
          <RefreshCw size={12} /> Reschedule
        </button>
        <Link href={leadUrl} className="flex-1">
          <button className="w-full flex items-center justify-center gap-1.5 h-8 bg-[#8B5E34] hover:bg-[#734A25] text-white rounded-lg text-xs font-semibold transition-colors shadow-sm">
            Open Lead <ExternalLink size={12} />
          </button>
        </Link>
      </div>
      
    </div>
  );
}
