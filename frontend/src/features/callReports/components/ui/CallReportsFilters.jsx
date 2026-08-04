"use client";

import React from "react";

export default function CallReportsFilters({ 
  search, 
  onSearchChange, 
  selectedDate, 
  onDateChange 
}) {
  return (
    <section className="bg-surface-container-lowest p-4 rounded-[24px] glass-card mb-vertical_gap flex flex-wrap items-center gap-4">
      <div className="flex-1 min-w-[300px] relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
          search
        </span>
        <input
          className="w-full h-[52px] pl-12 pr-4 bg-background border-none rounded-[18px] focus:ring-2 focus:ring-primary-container text-on-surface font-body-md transition-all outline-none"
          placeholder="Search by Telecaller or EMP ID..."
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="relative group">
          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors pointer-events-none">
            calendar_month
          </span>
          <input
            className="h-[52px] w-[180px] pl-4 pr-10 bg-background border-none rounded-[18px] focus:ring-2 focus:ring-primary-container text-on-surface font-body-md outline-none"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
        
        {/* We keep the "APPLY FILTERS" button as a visual element, or it can be a clear button */}
        <button 
          onClick={() => { onSearchChange(""); onDateChange(""); }}
          className="h-[52px] px-8 bg-primary-container text-white font-label-md rounded-[18px] hover:opacity-95 transition-opacity active:scale-95 whitespace-nowrap"
        >
          CLEAR FILTERS
        </button>
      </div>
    </section>
  );
}
