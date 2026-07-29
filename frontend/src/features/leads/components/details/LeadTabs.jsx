import { TABS_CONFIG } from "../../constants/detailsConfig";
import { Home, List, FileText } from "lucide-react";
import { motion } from "framer-motion";

const getIconForTab = (id) => {
  if (id === "info" || id === "overview") return <Home className="w-4 h-4" />;
  if (id === "timeline") return <List className="w-4 h-4" />;
  if (id === "notes") return <FileText className="w-4 h-4" />;
  return null;
};

export default function LeadTabs({ activeTab, onTabChange, tabsConfig }) {
  const tabs = tabsConfig || TABS_CONFIG;

  return (
    <div
      className="flex items-center gap-6 w-full overflow-x-auto scrollbar-hide border-b border-gray-100"
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            aria-controls={`tabpanel-${tab.id}`}
            onClick={() => onTabChange(tab.id)}
            className={`
              relative pb-4 flex items-center gap-2 text-sm font-semibold transition-colors whitespace-nowrap
              ${isActive ? "text-[#8B1C31]" : "text-gray-500 hover:text-gray-900"}
            `}
          >
            {getIconForTab(tab.id)}
            <span>{tab.label}</span>
            {isActive && (
              <motion.div
                layoutId="activeTabUnderline"
                className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#8B1C31]"
                initial={false}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
