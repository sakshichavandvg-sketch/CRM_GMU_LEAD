import { Flame, Snowflake, Clock, UserCheck, RefreshCw } from "lucide-react";

const getIconForFilter = (value) => {
  const v = value?.toLowerCase() || "";
  if (v.includes("hot")) return <Flame size={14} className="text-orange-500" />;
  if (v.includes("cold")) return <Snowflake size={14} className="text-blue-500" />;
  if (v.includes("pending") || v.includes("consulted")) return <Clock size={14} className="text-yellow-500" />;
  if (v.includes("allotted")) return <UserCheck size={14} className="text-emerald-500" />;
  if (v.includes("reassign")) return <RefreshCw size={14} className="text-purple-500" />;
  return null;
};

export default function QuickFilterBar({ filters, activeFilter, onSelect, counts = {} }) {
  return (
    <div className="flex overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
      <div className="flex gap-2">
        {filters.map((filter) => {
          const isActive = activeFilter === filter.value;
          const Icon = getIconForFilter(filter.value);
          const count = counts[filter.value] || 0;
          
          return (
            <button
              key={filter.value}
              onClick={() => onSelect(filter.value)}
              className={`
                group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 shadow-sm
                border whitespace-nowrap
                ${isActive 
                  ? "bg-[#6F1D28]/5 border-[#6F1D28]/30 text-[#6F1D28] ring-1 ring-[#6F1D28]/20" 
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md hover:-translate-y-0.5"
                }
              `}
            >
              {Icon}
              <span>{filter.label}</span>
              {filter.value !== "" && (
                <span className={`
                  text-xs px-1.5 py-0.5 rounded-md transition-colors
                  ${isActive ? "bg-[#6F1D28]/10 text-[#6F1D28]" : "bg-gray-100 text-gray-500 group-hover:bg-gray-200"}
                `}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
