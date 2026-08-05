import React, { useState } from "react";

export default function StitchFilterToolbar({ filters, onFilterChange, onApplyFilters, isLoading }) {
  // Local state for the inputs to match the Stitch design without breaking parent logic
  const [localSearch, setLocalSearch] = useState(filters?.search || "");
  const [localDateFrom, setLocalDateFrom] = useState(filters?.dateFrom || "");
  const [localDateTo, setLocalDateTo] = useState(filters?.dateTo || "");

  const handleApply = () => {
    // Validate date range
    if (localDateFrom && localDateTo) {
      if (new Date(localDateFrom) > new Date(localDateTo)) {
        alert("From Date cannot be later than To Date.");
        return;
      }
    }

    // Merge updated values into the existing filter state
    onFilterChange(prev => ({ 
      ...prev, 
      search: localSearch,
      dateFrom: localDateFrom,
      dateTo: localDateTo
    }));
    
    if (onApplyFilters) onApplyFilters();
  };

  return (
    <section className="bg-white p-6 rounded-[24px] main-shadow border border-outline-variant/50 flex flex-wrap lg:flex-nowrap items-center gap-6">
      {/* Search */}
      <div className="flex-[2] relative min-w-[200px]">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant">search</span>
        <input 
          className="w-full pl-12 pr-4 py-3 rounded-[18px] border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none text-body-md transition-standard" 
          placeholder="Search by Lead, Mobile, or Call ID..." 
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
        />
      </div>
      
      {/* Date Range */}
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input 
              className="pl-4 pr-10 py-3 rounded-[18px] border border-outline-variant focus:ring-primary focus:border-primary text-body-md w-40 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6" 
              type="date" 
              value={localDateFrom}
              onChange={(e) => setLocalDateFrom(e.target.value)}
            />
          </div>
        </div>
        <span className="text-outline-variant">—</span>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input 
              className="pl-4 pr-10 py-3 rounded-[18px] border border-outline-variant focus:ring-primary focus:border-primary text-body-md w-40 [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6" 
              type="date" 
              value={localDateTo}
              onChange={(e) => setLocalDateTo(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {/* Apply button */}
      <button 
        onClick={handleApply}
        disabled={isLoading}
        className={`px-8 py-3.5 rounded-[18px] text-white font-bold transition-standard whitespace-nowrap shadow-lg ${
          isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-primary hover:bg-surface-tint active:scale-95 shadow-primary/10'
        }`}
      >
        {isLoading ? "APPLYING..." : "APPLY FILTERS"}
      </button>
    </section>
  );
}
