import React, { useMemo } from "react";

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
      {/* Total Telecallers */}
      <div className="bg-white rounded-card p-6 ambient-shadow border border-[#E8EAF2] flex items-center relative overflow-hidden group">
        <div className="bg-[#E91E63] w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-3xl">groups</span>
        </div>
        <div className="ml-5">
          <p className="font-card-label text-card-label text-on-surface-variant/70">Total Telecallers</p>
          <h3 className="font-stat-number text-stat-number text-on-surface mt-1">{stats.total}</h3>
          <p className="text-[12px] text-on-surface-variant/50 mt-1">All registered telecallers</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-30">
          <svg className="text-[#E91E63]" fill="none" height="30" viewBox="0 0 60 30" width="60">
            <path d="M2 28C10 20 20 28 30 15C40 2 50 10 58 2" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          </svg>
        </div>
      </div>
      
      {/* Active Telecallers */}
      <div className="bg-white rounded-card p-6 ambient-shadow border border-[#E8EAF2] flex items-center relative overflow-hidden">
        <div className="bg-[#10B981] w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-3xl">verified_user</span>
        </div>
        <div className="ml-5">
          <p className="font-card-label text-card-label text-on-surface-variant/70">Active Telecallers</p>
          <h3 className="font-stat-number text-stat-number text-on-surface mt-1">{stats.active}</h3>
          <p className="text-[12px] text-on-surface-variant/50 mt-1">Currently active</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-30">
          <svg className="text-[#10B981]" fill="none" height="30" viewBox="0 0 60 30" width="60">
            <path d="M2 25C15 25 25 10 35 15C45 20 50 5 58 5" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          </svg>
        </div>
      </div>

      {/* New This Month */}
      <div className="bg-white rounded-card p-6 ambient-shadow border border-[#E8EAF2] flex items-center relative overflow-hidden">
        <div className="bg-[#F59E0B] w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-3xl">person_add</span>
        </div>
        <div className="ml-5">
          <p className="font-card-label text-card-label text-on-surface-variant/70">New This Month</p>
          <h3 className="font-stat-number text-stat-number text-on-surface mt-1">{stats.newThisMonth}</h3>
          <p className="text-[12px] text-on-surface-variant/50 mt-1">Joined this month</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-30">
          <svg className="text-[#F59E0B]" fill="none" height="30" viewBox="0 0 60 30" width="60">
            <path d="M2 28L15 20L30 25L45 5L58 12" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          </svg>
        </div>
      </div>

      {/* Inactive Telecallers */}
      <div className="bg-white rounded-card p-6 ambient-shadow border border-[#E8EAF2] flex items-center relative overflow-hidden">
        <div className="bg-[#8B5CF6] w-14 h-14 rounded-full flex items-center justify-center text-white shrink-0">
          <span className="material-symbols-outlined text-3xl">person_off</span>
        </div>
        <div className="ml-5">
          <p className="font-card-label text-card-label text-on-surface-variant/70">Inactive Telecallers</p>
          <h3 className="font-stat-number text-stat-number text-on-surface mt-1">{stats.inactive}</h3>
          <p className="text-[12px] text-on-surface-variant/50 mt-1">Currently inactive</p>
        </div>
        <div className="absolute bottom-4 right-4 opacity-30">
          <svg className="text-[#8B5CF6]" fill="none" height="30" viewBox="0 0 60 30" width="60">
            <path d="M2 20C10 20 20 28 35 15C45 5 50 15 58 10" stroke="currentColor" strokeLinecap="round" strokeWidth="2"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
