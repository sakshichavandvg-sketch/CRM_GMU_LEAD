import React from "react";
import QuickFilterBar from "./QuickFilterBar";
import ActiveFilterChips from "./ActiveFilterChips";
import { SlidersHorizontal } from "lucide-react";
import { LEAD_BUCKETS } from "../constants/leadConstants";

export default function LeadsFilterToolbar({ 
  activeFilter, 
  onSelect, 
  counts, 
  filters, 
  onRemove, 
  onClearAll, 
  onOpenDrawer, 
  refineButtonRef 
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 bg-white border-b border-gray-200 sticky top-0 z-20 px-4">
      <div className="flex items-center gap-4 flex-1 overflow-x-auto scrollbar-hide">
        <QuickFilterBar 
          filters={LEAD_BUCKETS} 
          activeFilter={activeFilter} 
          onSelect={onSelect} 
          counts={counts}
        />
        <button
          ref={refineButtonRef}
          onClick={onOpenDrawer}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1 h-10"
        >
          <SlidersHorizontal size={16} />
          Refine Filters
        </button>
      </div>
      
      <div className="flex-shrink-0">
        <ActiveFilterChips 
          filters={filters} 
          onRemove={onRemove} 
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
}
