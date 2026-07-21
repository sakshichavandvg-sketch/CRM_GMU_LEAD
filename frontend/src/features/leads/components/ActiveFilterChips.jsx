import { X } from "lucide-react";
import { FILTER_CONFIG } from "../constants/filterConfig";

export default function ActiveFilterChips({ filters, onRemove, onClearAll }) {
  const activeEntries = Object.entries(filters).filter(([key, value]) => {
    const config = FILTER_CONFIG.find(c => c.key === key);
    return config && value;
  });

  if (activeEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span className="text-sm text-gray-500 font-medium mr-1">Applied:</span>
      {activeEntries.map(([key, value]) => {
        const config = FILTER_CONFIG.find(c => c.key === key);
        return (
          <div key={key} className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm font-medium border border-gray-200 shadow-sm transition hover:bg-gray-100">
            <span>{config.label}: <span className="text-gray-900 font-semibold">{value}</span></span>
            <button
              onClick={() => onRemove(key)}
              className="p-0.5 hover:bg-gray-300 rounded-full transition-colors ml-1 text-gray-500 hover:text-gray-900"
              aria-label={`Remove ${config.label} filter`}
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
      <button 
        onClick={onClearAll}
        className="text-sm text-[#6F1D28] hover:underline font-medium ml-2 transition-colors"
      >
        Clear All
      </button>
    </div>
  );
}
