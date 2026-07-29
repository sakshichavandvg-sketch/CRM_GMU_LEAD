import React from "react";

export function SummaryStrip({ title = "Today's Summary", items = [], isLoading = false }) {
  return (
    <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 flex items-center gap-6 overflow-x-auto w-full lg:w-auto">
      <div className="shrink-0">
        <p className="text-[12px] text-slate-500 font-medium uppercase tracking-wider">{title}</p>
      </div>
      
      <div className="h-8 w-px bg-[#ECECEC] shrink-0"></div>
      
      <div className="flex gap-6 shrink-0">
        {items.map((item, index) => (
          <SummaryItem 
            key={index}
            label={item.label} 
            value={item.value} 
            isLoading={isLoading} 
            color={item.color} 
          />
        ))}
      </div>
    </div>
  );
}

function SummaryItem({ label, value, isLoading, color = "text-gray-900" }) {
  return (
    <div className="text-center min-w-[60px]">
      {isLoading ? (
        <div className="h-7 w-12 bg-slate-100 rounded animate-pulse mx-auto mb-1"></div>
      ) : (
        <span className={`block text-[18px] font-bold ${color}`}>{value ?? 0}</span>
      )}
      <span className="block text-[12px] text-slate-500 whitespace-nowrap">{label}</span>
    </div>
  );
}
