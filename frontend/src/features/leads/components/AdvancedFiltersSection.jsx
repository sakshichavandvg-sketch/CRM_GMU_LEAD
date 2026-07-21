import React from "react";
import ActiveFilterChips from "./ActiveFilterChips";
import { SlidersHorizontal } from "lucide-react";

export default function AdvancedFiltersSection({ filters, onRemove, onClearAll, onOpenDrawer, refineButtonRef }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        ref={refineButtonRef}
        onClick={onOpenDrawer}
        className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1"
      >
        <SlidersHorizontal size={16} />
        Refine Filters
      </button>
      <ActiveFilterChips 
        filters={filters} 
        onRemove={onRemove} 
        onClearAll={onClearAll}
      />
    </div>
  );
}
