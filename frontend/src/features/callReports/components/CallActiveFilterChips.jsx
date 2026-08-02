import React from "react";
import { X } from "lucide-react";

const CALL_FILTER_LABELS = {
  date: "Date",
  status: "Outcome",
  direction: "Direction",
  hasRecording: "Recording"
};

export default function CallActiveFilterChips({ filters, onRemove, onClearAll }) {
  const activeEntries = Object.entries(filters).filter(([key, value]) => {
    return CALL_FILTER_LABELS[key] && value;
  });

  if (activeEntries.length === 0) return null;

  return (
    <div className="pt-2 pb-2 w-full flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {activeEntries.map(([key, value]) => {
            let displayValue = value;
            if (key === "hasRecording") {
              displayValue = value === "true" ? "Yes" : "No";
            }
            if (key === "date") {
              const d = new Date(value);
              if (!isNaN(d)) {
                displayValue = d.toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' }).replace(/ /g, ' ');
              }
            }

            return (
              <div 
                key={key} 
                className="flex items-center gap-2 h-[32px] px-3 bg-[#6F1D28]/5 text-[#6F1D28] rounded-full text-xs font-medium border border-[#6F1D28]/10 shadow-sm transition hover:bg-[#6F1D28]/10"
              >
                <span className="flex items-center">
                  <span className="text-gray-500 mr-1.5">{CALL_FILTER_LABELS[key]}:</span> 
                  <span className="font-semibold">{displayValue}</span>
                </span>
                <button
                  onClick={() => onRemove(key)}
                  className="p-0.5 hover:bg-[#6F1D28]/20 rounded-full transition-colors ml-1 text-[#6F1D28] hover:text-[#5a1720] focus:outline-none focus:ring-2 focus:ring-[#6F1D28]"
                  aria-label={`Remove ${CALL_FILTER_LABELS[key]} filter`}
                >
                  <X size={12} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
