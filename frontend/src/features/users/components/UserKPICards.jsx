import React, { useMemo } from "react";
import { KPICard } from "@/components/dashboard-ui/KPICard";
import { Users, UserCheck, UserPlus, UserMinus } from "lucide-react";

export default function UserKPICards({ users = [], totalResults = 0 }) {
  const stats = useMemo(() => {
    const total = totalResults > 0 ? totalResults : users.length;
    
    // For calculation from current users array if totalResults isn't available
    const active = users.filter(u => String(u.status).toLowerCase() === 'active').length;
    const inactive = users.filter(u => String(u.status).toLowerCase() !== 'active').length;
    
    // Estimate new this month based on createdAt if available, otherwise just use a placeholder 0
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const newThisMonth = users.filter(u => {
      if (!u.createdAt) return false;
      const date = new Date(u.createdAt);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    }).length;

    // Extrapolate for totalResults if pagination is active, but to be safe, just use computed if they match total
    const displayActive = total === users.length ? active : Math.round((active / (users.length || 1)) * total);
    const displayInactive = total === users.length ? inactive : Math.round((inactive / (users.length || 1)) * total);

    return {
      total,
      active: displayActive || 0,
      newThisMonth: newThisMonth || 0,
      inactive: displayInactive || 0
    };
  }, [users, totalResults]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
      <KPICard
        title="Total Telecallers"
        value={stats.total}
        subtitle="All registered telecallers"
        icon={Users}
        variant="primary"
      />
      <KPICard
        title="Active Telecallers"
        value={stats.active}
        subtitle="Currently active"
        icon={UserCheck}
        variant="success"
      />
      <KPICard
        title="New This Month"
        value={stats.newThisMonth}
        subtitle="Joined this month"
        icon={UserPlus}
        variant="warning"
      />
      <KPICard
        title="Inactive Telecallers"
        value={stats.inactive}
        subtitle="Currently inactive"
        icon={UserMinus}
        variant="purple"
      />
    </div>
  );
}
