import { X } from "lucide-react";
import React from "react";

export default function ActiveFilterChips({ filters, datePreset, onRemoveFilter, onClearAll }) {
  const activeEntries = Object.entries(filters).filter(([_, value]) => !!value);
  
  if (activeEntries.length === 0 && datePreset === "all") return null;

  return (
    <div className="pt-2 pb-2 w-full flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {datePreset !== "all" && (
            <div className="flex items-center gap-2 h-[32px] px-3 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 shadow-sm transition hover:bg-gray-100">
              <span className="flex items-center">
                <span className="text-gray-500 mr-1.5">Date:</span> 
                <span className="text-[#7A1F2B] font-semibold">{datePreset.replace("_", " ").toUpperCase()}</span>
              </span>
              <button
                onClick={() => onRemoveFilter('datePreset')}
                className="p-1 hover:bg-gray-200 rounded-full transition-colors ml-1 text-gray-400 hover:text-gray-900 focus:outline-none"
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>
          )}

          {activeEntries.map(([key, value]) => {
            const label = key.charAt(0).toUpperCase() + key.slice(1);
            return (
              <div 
                key={key} 
                className="flex items-center gap-2 h-[32px] px-3 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 shadow-sm transition hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <span className="text-gray-500 mr-1.5">{label}:</span> 
                  <span className="text-[#7A1F2B] font-semibold">{value}</span>
                </span>
                <button
                  onClick={() => onRemoveFilter(key)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors ml-1 text-gray-400 hover:text-gray-900 focus:outline-none"
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={onClearAll}
          className="text-xs text-[#7A1F2B] hover:underline font-medium shrink-0 pt-1 sm:pt-2 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
