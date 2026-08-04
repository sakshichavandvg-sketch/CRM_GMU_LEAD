import React, { useState } from "react";

export default function StitchFilterToolbar({ filters, onFilterChange, onApplyFilters }) {
  // Local state for the inputs to match the Stitch design without breaking parent logic
  const [localSearch, setLocalSearch] = useState("");
  const [localDate, setLocalDate] = useState(filters.date || "");

  const handleApply = () => {
    // Only pass back the date, since parent filtering logic only supports 'date' currently
    onFilterChange(prev => ({ ...prev, date: localDate }));
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
              className="pl-4 pr-10 py-3 rounded-[18px] border border-outline-variant focus:ring-primary focus:border-primary text-body-md w-40" 
              type="date" 
              value={localDate}
              onChange={(e) => setLocalDate(e.target.value)}
            />
          </div>
        </div>
        <span className="text-outline-variant">—</span>
        <div className="flex flex-col gap-1">
          <div className="relative">
            <input 
              className="pl-4 pr-10 py-3 rounded-[18px] border border-outline-variant focus:ring-primary focus:border-primary text-body-md w-40 opacity-50 bg-gray-50 cursor-not-allowed" 
              type="date" 
              disabled
              title="To Date (Not supported in current logic)"
            />
          </div>
        </div>
      </div>
      
      {/* Apply button */}
      <button 
        onClick={handleApply}
        className="bg-primary px-8 py-3.5 rounded-[18px] text-white font-bold hover:bg-surface-tint transition-standard active:scale-95 shadow-lg shadow-primary/10 whitespace-nowrap"
      >
        APPLY FILTERS
      </button>
    </section>
  );
}
