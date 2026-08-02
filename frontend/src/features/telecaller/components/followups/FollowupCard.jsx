import { Clock, Phone, BookOpen, ChevronRight, RefreshCw, FileText } from "lucide-react";
import React from "react";
import Button from "@/components/ui/Button";
import Link from "next/link";

const getPriorityColor = (p) => {
  if (p === "High") return "text-red-700 bg-red-50 border-red-200";
  if (p === "Medium") return "text-amber-700 bg-amber-50 border-amber-200";
  return "text-blue-700 bg-blue-50 border-blue-200";
};

export default function FollowupCard({ followup, onReschedule }) {
  const {
    id,
    student,
    leadName,
    course,
    phone,
    mobile,
    priority,
    scheduledDate,
    date,
    scheduledTime,
    time,
    remarks,
    enquiryNo,
    leadId,
  } = followup;

  const displayName = student || leadName || "Unknown Lead";
  const displayPhone = phone || mobile || "N/A";
  const displayCourse = course || "B.Tech";
  const displayDate = scheduledDate || date;
  const displayTime = scheduledTime || time || "09:00 AM";
  const displayPriority = priority || "Normal";
  
  const leadUrl = `/telecaller/leads/${enquiryNo || leadId || id}`;

  return (
    <div className="flex flex-col sm:flex-row justify-between bg-white border border-[#ECECEC] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-[1px] hover:border-slate-300 transition-all p-5 gap-5 group w-full">
      
      {/* Left: Info Section */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        
        {/* Row 1: Lead Name & Time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
          <h3 className="text-lg font-bold text-gray-900 truncate">
            {displayName}
          </h3>
          <div className="flex items-center gap-1.5 text-gray-900 font-semibold shrink-0">
             <Clock size={16} className="text-[#7A1F2B]" />
             <span>{displayTime}</span>
             <span className="text-slate-400 font-medium ml-1 text-sm">• {displayDate}</span>
          </div>
        </div>
        
        {/* Row 2: Phone & Course */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 mb-3">
          <span className="flex items-center gap-1.5 bg-slate-100/50 px-2 py-0.5 rounded-md border border-slate-100">
            <Phone size={14} className="text-slate-400" />
            {displayPhone}
          </span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1.5">
            <BookOpen size={14} className="text-slate-400" />
            {displayCourse}
          </span>
        </div>

        {/* Row 3: Priority */}
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getPriorityColor(displayPriority)}`}>
            {displayPriority} Priority
          </span>
        </div>

        {remarks && (
          <div className="flex items-start gap-2 bg-slate-50 border border-slate-100 rounded-lg p-2.5 text-xs text-slate-600 mt-2 w-full">
            <FileText size={14} className="text-slate-400 mt-0.5 shrink-0" />
            <span className="line-clamp-1">{remarks}</span>
          </div>
        )}
      </div>

      {/* Right/Bottom: Actions */}
      <div className="flex sm:flex-col justify-end items-end gap-2.5 shrink-0 sm:border-l border-[#ECECEC] sm:pl-5 pt-4 sm:pt-0 border-t sm:border-t-0 mt-2 sm:mt-0">
        <Link href={leadUrl} className="w-full sm:w-auto">
          <Button variant="primary" className="w-full sm:w-auto justify-center bg-[#8B5E34] hover:bg-[#734A25] h-10 text-sm font-semibold shadow-sm transition-colors border-none">
            Open Lead
          </Button>
        </Link>
        <Button 
          variant="outline" 
          onClick={() => onReschedule(followup)}
          className="w-full sm:w-auto justify-center h-10 text-sm font-semibold bg-white hover:bg-slate-50 text-gray-700"
        >
          Reschedule
        </Button>
      </div>

    </div>
  );
}
