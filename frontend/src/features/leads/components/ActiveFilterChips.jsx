import { X } from "lucide-react";
import { FILTER_CONFIG } from "../constants/filterConfig";

export default function ActiveFilterChips({ filters, onRemove, onClearAll }) {
  const activeEntries = Object.entries(filters).filter(([key, value]) => {
    const config = FILTER_CONFIG.find(c => c.key === key);
    return config && value;
  });

  if (activeEntries.length === 0) return null;

  return (
    <div className="pt-5 pb-2 w-full flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700">Applied Filters</h3>
      
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          {activeEntries.map(([key, value]) => {
            const config = FILTER_CONFIG.find(c => c.key === key);
            return (
              <div 
                key={key} 
                className="flex items-center gap-2 h-[38px] px-4 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm transition hover:bg-gray-100"
              >
                <span className="flex items-center">
                  <span className="text-gray-500 mr-1.5">{config.label}:</span> 
                  <span className="text-[#6F1D28] font-semibold">{value}</span>
                </span>
                <button
                  onClick={() => onRemove(key)}
                  className="p-1 hover:bg-gray-200 rounded-full transition-colors ml-1 text-gray-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#6F1D28]"
                  aria-label={`Remove ${config.label} filter`}
                >
                  <X size={14} strokeWidth={2.5} />
                </button>
              </div>
            );
          })}
        </div>
        
        <button 
          onClick={onClearAll}
          className="text-sm text-[#6F1D28] hover:underline font-medium shrink-0 pt-1 sm:pt-2 transition-colors"
        >
          Clear All
        </button>
      </div>
    </div>
  );
}
