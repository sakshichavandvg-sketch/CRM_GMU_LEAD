import React from "react";

export default function WorkSummary({ workSummary }) {
  return (
    <div className="flex items-center gap-6 px-5 py-3 bg-slate-50/80 border border-[#ECECEC] rounded-xl mb-6">
      <div className="flex flex-col">
        <span className="text-xs text-slate-500 font-[500]">Filtered Total</span>
        <span className="text-sm font-[600] text-gray-900">{workSummary.total} Follow-ups</span>
      </div>
      <div className="w-px h-8 bg-[#ECECEC]"></div>
      <div className="flex flex-col">
        <span className="text-xs text-slate-500 font-[500]">Pending</span>
        <span className="text-sm font-[600] text-amber-600">{workSummary.pending}</span>
      </div>
      <div className="w-px h-8 bg-[#ECECEC]"></div>
      <div className="flex flex-col">
        <span className="text-xs text-slate-500 font-[500]">Completed</span>
        <span className="text-sm font-[600] text-emerald-600">{workSummary.completed}</span>
      </div>
      <div className="w-px h-8 bg-[#ECECEC]"></div>
      <div className="flex flex-col">
        <span className="text-xs text-slate-500 font-[500]">Overdue</span>
        <span className="text-sm font-[600] text-red-600">{workSummary.overdue}</span>
      </div>
    </div>
  );
}
