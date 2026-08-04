import React from "react";

export default function UserToolbar({ search, onSearchChange }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <div className="relative w-full max-w-[560px]">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/60">search</span>
        <input 
          className="w-full h-12 pl-12 pr-16 bg-white border border-[#E8EAF2] rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all font-table-body text-on-surface outline-none" 
          placeholder="Search by name, username, phone or employee ID..." 
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="relative">
        <select className="appearance-none h-12 pl-5 pr-10 bg-white border border-[#E8EAF2] rounded-xl font-table-body text-on-surface focus:ring-2 focus:ring-primary/20 outline-none transition-all cursor-pointer min-w-[140px]">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
        <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant/60">expand_more</span>
      </div>
      <button className="flex items-center gap-2 h-12 px-6 bg-white border border-[#E8EAF2] rounded-xl font-table-body text-on-surface hover:bg-surface-container-low transition-all">
        <span className="material-symbols-outlined text-xl">filter_list</span>
        <span>More Filters</span>
        <span className="material-symbols-outlined text-lg">expand_more</span>
      </button>
    </div>
  );
}
