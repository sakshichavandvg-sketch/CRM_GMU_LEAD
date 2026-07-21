import { TABS_CONFIG } from "../../constants/detailsConfig";

export default function LeadTabs({ activeTab, onTabChange }) {
  return (
    <div 
      className="flex items-center border-b border-gray-200 w-full overflow-x-auto scrollbar-hide" 
      role="tablist"
    >
      {TABS_CONFIG.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative px-6 py-3 text-sm font-medium transition-colors whitespace-nowrap
              ${isActive ? "text-[#6F1D28]" : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"}
            `}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#6F1D28] rounded-t-full" />
            )}
          </button>
        );
      })}
    </div>
  );
}
