import React from "react";

export default function FollowupTabs({ activeTab, onTabChange, tabCounts }) {
  const tabs = [
    { id: "today", label: "Today" },
    { id: "upcoming", label: "Upcoming" },
    { id: "overdue", label: "Missed" }, // Note: user said "Missed" instead of overdue in the examples
    { id: "completed", label: "Completed" },
  ];

  return (
    <div className="flex items-center gap-6 border-b border-transparent h-10">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className="group relative flex items-center gap-2 h-full text-sm font-medium transition-all duration-200 focus:outline-none"
          >
            <span className={`transition-colors duration-200 ${isActive ? "text-[#7A1F2B]" : "text-slate-500 group-hover:text-slate-800"}`}>
              {tab.label}
            </span>
            
            <span className={`px-1.5 py-0.5 text-xs font-bold rounded-full transition-colors duration-200 ${
              isActive 
                ? "bg-[#7A1F2B]/10 text-[#7A1F2B]" 
                : "bg-slate-100 text-slate-500 group-hover:bg-slate-200"
            }`}>
              {tabCounts[tab.id] || 0}
            </span>

            {/* Animated Underline */}
            <div className={`absolute bottom-0 left-0 h-0.5 bg-[#7A1F2B] transition-all duration-200 ${
              isActive ? "w-full opacity-100" : "w-0 opacity-0"
            }`} />
          </button>
        );
      })}
    </div>
  );
}
