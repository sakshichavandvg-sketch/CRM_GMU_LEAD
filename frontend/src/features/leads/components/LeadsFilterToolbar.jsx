import React from "react";
import QuickFilterBar from "./QuickFilterBar";
import ActiveFilterChips from "./ActiveFilterChips";
import { SlidersHorizontal } from "lucide-react";
import { LEAD_BUCKETS } from "../constants/leadConstants";
import { useTableScroll } from "@/providers/TableScrollProvider";

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
  const { isScrolled } = useTableScroll();

  return (
    <div className={`bg-white flex flex-col transition-all duration-300 ease-in-out ${isScrolled ? "pt-3" : "pt-6"}`}>
      {/* Row 1: Quick Filters & Refine */}
      <div className={`flex flex-wrap md:flex-nowrap items-center justify-between gap-4 border-b border-gray-100 transition-all duration-300 ease-in-out ${isScrolled ? "pb-3" : "pb-4"}`}>
        <div className="flex-1 overflow-x-auto scrollbar-hide">
          <QuickFilterBar 
            filters={LEAD_BUCKETS} 
            activeFilter={activeFilter} 
            onSelect={onSelect} 
            counts={counts}
          />
        </div>
        <button
          ref={refineButtonRef}
          onClick={onOpenDrawer}
          className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1 h-10"
        >
          <SlidersHorizontal size={16} />
          Refine Filters
        </button>
      </div>
      
      {/* Row 2: Applied Filters (Padding/margin handled inside component if active) */}
      <ActiveFilterChips 
        filters={filters} 
        onRemove={onRemove} 
        onClearAll={onClearAll}
      />
    </div>
  );
}
