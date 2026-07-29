"use client";

import useAuthStore from "@/store/authStore";

export default function DashboardHeader({ isLoading, summary }) {
  const user = useAuthStore((state) => state.user);
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const firstName = user?.name?.split(' ')[0] || user?.username || "Sakshi";

  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-2 mt-2">
      {/* ── Greeting ──────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-[38px] font-[700] text-gray-900 tracking-tight leading-tight">
          Good Morning, {firstName} 👋
        </h1>
        <p className="text-[16px] text-gray-500 font-[500] mt-1">
          {today} • Telecaller Dashboard
        </p>
      </div>
      
      {/* ── Summary Strip ──────────────────────────────────────────────────── */}
      <div className="bg-white rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-4 flex items-center gap-6 overflow-x-auto">
        <div className="shrink-0">
          <p className="text-[12px] text-slate-500 font-medium uppercase tracking-wider">Today's Summary</p>
        </div>
        
        <div className="h-8 w-px bg-[#ECECEC] shrink-0"></div>
        
        <div className="flex gap-6 shrink-0">
          <SummaryItem label="Assigned" value={summary?.assigned} isLoading={isLoading} color="text-gray-900" />
          <SummaryItem label="Calls Today" value={summary?.callsToday} isLoading={isLoading} color="text-[#2563EB]" />
          <SummaryItem label="Connected" value={summary?.connected} isLoading={isLoading} color="text-[#8B1C31]" />
          <SummaryItem label="Interested" value={summary?.interested} isLoading={isLoading} color="text-[#F97316]" />
          <SummaryItem label="Admissions" value={summary?.admissions} isLoading={isLoading} color="text-[#8B5CF6]" />
          <SummaryItem label="Goal %" value={summary?.goal ? `${summary.goal}%` : '0%'} isLoading={isLoading} color="text-[#16A34A]" />
        </div>
      </div>
    </div>
  );
}

function SummaryItem({ label, value, isLoading, color }) {
  return (
    <div className="text-center min-w-[60px]">
      {isLoading ? (
        <div className="h-7 w-12 bg-slate-100 rounded animate-pulse mx-auto mb-1"></div>
      ) : (
        <span className={`block text-[18px] font-bold ${color}`}>{value ?? 0}</span>
      )}
      <span className="block text-[12px] text-slate-500 whitespace-nowrap">{label}</span>
    </div>
  );
}
