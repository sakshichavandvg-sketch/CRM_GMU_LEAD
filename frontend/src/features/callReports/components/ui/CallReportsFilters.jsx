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
          <input
            className="h-[52px] w-[180px] px-4 bg-background border-none rounded-[18px] focus:ring-2 focus:ring-primary-container text-on-surface font-body-md outline-none [&::-webkit-calendar-picker-indicator]:opacity-100 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:w-6 [&::-webkit-calendar-picker-indicator]:h-6"
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}
