import React from "react";
import { KPICard } from "../dashboard-ui/KPICard";
import { Users, UserCheck, UserPlus, Clock, Percent, Headphones, GraduationCap } from "lucide-react";

const getIconForTitle = (title) => {
  switch (title) {
    case "Total Leads": return Users;
    case "Active Leads": return UserCheck;
    case "New Today": return UserPlus;
    case "Pending Assign": return Clock;
    case "Conversion Rate": return Percent;
    case "Telecallers": return Headphones;
    case "Admissions": return GraduationCap;
    default: return Users;
  }
};

const getColorClassForType = (type) => {
  switch (type) {
    case "success": return { bg: "bg-emerald-50", text: "text-emerald-600" };
    case "warning": return { bg: "bg-orange-50", text: "text-orange-600" };
    case "danger": return { bg: "bg-rose-50", text: "text-rose-600" };
    default: return { bg: "bg-blue-50", text: "text-blue-600" };
  }
};

export default function DashboardStats({ stats = [] }) {
  // Use a 6-column grid on desktop as specified (since there are 7 items, it will wrap naturally, or we can use 3/4 cols)
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {stats.map((item) => {
        const Icon = getIconForTitle(item.title);
        const colors = getColorClassForType(item.type);
        
        return (
          <KPICard
            key={item.id}
            title={item.title}
            value={item.value}
            icon={Icon}
            colorClass={colors.bg}
            iconColorClass={colors.text}
            trend={item.title === "New Today" ? "+12%" : undefined} // Mock trend for presentation
            trendDirection="up"
          />
        );
      })}
    </div>
  );
}