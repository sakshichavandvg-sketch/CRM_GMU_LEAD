import { Search, Filter, CalendarDays, ChevronDown, List } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import FollowupTabs from "./FollowupTabs";

const DateRangeDropdown = ({ datePreset, setDatePreset, dateRange, setDateRange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFrom, setLocalFrom] = useState(dateRange.from || "");
  const [localTo, setLocalTo] = useState(dateRange.to || "");
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleApplyCustom = () => {
    setDateRange({ from: localFrom, to: localTo });
    setDatePreset("custom");
    setIsOpen(false);
  };

  const handleReset = () => {
    setDatePreset("all");
    setDateRange({ from: "", to: "" });
    setLocalFrom("");
    setLocalTo("");
    setIsOpen(false);
  };

  const getLabel = () => {
    if (datePreset === "all") return "Select Date";
    if (datePreset === "custom") {
      if (dateRange.from && dateRange.to) return `${dateRange.from} - ${dateRange.to}`;
      return "Custom Range";
    }
    return datePreset.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="relative" ref={ref}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between min-w-0 h-10 px-3 bg-white border border-[#ECECEC] rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
      >
        <span className="truncate">{getLabel()}</span>
        <ChevronDown size={16} className="text-slate-400 shrink-0 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="p-2 flex flex-col gap-0.5">
            <h4 className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">Select Date</h4>
            
            <div className="h-px bg-slate-100 my-1"></div>
            
            {["today", "tomorrow", "this_week", "next_week", "this_month"].map(preset => (
              <button
                key={preset}
                onClick={() => {
                  setDatePreset(preset);
                  setIsOpen(false);
                }}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-slate-50 rounded-lg text-left transition-colors"
              >
                <div className={`w-3.5 h-3.5 rounded-full border mr-3 flex items-center justify-center transition-colors ${datePreset === preset ? 'border-[#7A1F2B]' : 'border-slate-300'}`}>
                  {datePreset === preset && <div className="w-1.5 h-1.5 rounded-full bg-[#7A1F2B]" />}
                </div>
                {preset.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </button>
            ))}
            
            <div className="h-px bg-slate-100 my-1"></div>

            <div className="px-3 py-2">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Custom Range</h4>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">From</label>
                  <input 
                    type="date" 
                    value={localFrom}
                    onChange={e => setLocalFrom(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7A1F2B]" 
                  />
                </div>
                <div>
                  <label className="text-[10px] font-semibold text-slate-500 uppercase mb-1 block">To</label>
                  <input 
                    type="date" 
                    value={localTo}
                    onChange={e => setLocalTo(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#7A1F2B]" 
                  />
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 my-1"></div>

            <div className="p-3 flex items-center gap-2">
              <button 
                onClick={handleReset}
                className="flex-1 h-9 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handleApplyCustom}
                className="flex-1 h-9 bg-[#7A1F2B] hover:bg-[#6F1D28] text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default function WorkspaceControls({ workspace, onOpenFilters }) {
  const showSearch = workspace.filteredFollowups.length > 10 || workspace.searchText;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between items-center gap-6 w-full">
        
        {/* Left Side: Tabs */}
        <div className="flex-none">
          <FollowupTabs 
            activeTab={workspace.activeTab}
            onTabChange={workspace.setActiveTab}
            tabCounts={workspace.tabCounts}
          />
        </div>

        {/* Right Side: Controls */}
        <div className="flex items-center justify-end gap-3 flex-1 min-w-0">
          
          {showSearch && (
            <div className="relative min-w-0">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search follow-ups..."
                value={workspace.searchText}
                onChange={(e) => workspace.setSearchText(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#ECECEC] rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#7A1F2B] transition-shadow placeholder:text-slate-400 h-10"
              />
            </div>
          )}

          <DateRangeDropdown 
            datePreset={workspace.datePreset}
            setDatePreset={workspace.setDatePreset}
            dateRange={workspace.dateRange}
            setDateRange={workspace.setDateRange}
          />

          <button 
            onClick={onOpenFilters}
            className="flex items-center justify-center gap-2 h-10 px-4 bg-white border border-[#ECECEC] hover:bg-slate-50 rounded-xl text-sm font-medium text-slate-700 transition-colors"
          >
            <Filter size={16} />
            <span className="hidden sm:inline">Filters</span>
          </button>

          {/* Segmented Control */}
          <div className="flex bg-slate-100 p-1 rounded-xl h-10">
            <button
              onClick={() => workspace.setViewMode("list")}
              className={`flex items-center gap-2 px-3 rounded-lg text-sm font-medium transition-all ${
                workspace.viewMode === "list" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-slate-500 hover:text-gray-900"
              }`}
            >
              <List size={16} /> <span className="hidden sm:inline">List</span>
            </button>
            <button
              onClick={() => workspace.setViewMode("calendar")}
              className={`flex items-center gap-2 px-3 rounded-lg text-sm font-medium transition-all ${
                workspace.viewMode === "calendar" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-slate-500 hover:text-gray-900"
              }`}
            >
              <CalendarDays size={16} /> <span className="hidden sm:inline">Calendar</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
