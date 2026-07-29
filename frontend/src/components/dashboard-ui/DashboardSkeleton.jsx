import React from "react";

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-16 w-full bg-slate-100 animate-pulse rounded-[20px] shadow-sm"></div>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white border border-[#ECECEC] rounded-[20px] p-5 shadow-sm animate-pulse h-[130px]">
            <div className="w-1/3 h-4 bg-slate-100 rounded mb-4"></div>
            <div className="w-full h-12 bg-slate-100 rounded"></div>
          </div>
        ))}
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[20px] border border-[#ECECEC] bg-white p-6 shadow-sm h-64 animate-pulse"></div>
        <div className="rounded-[20px] border border-[#ECECEC] bg-white p-6 shadow-sm h-64 animate-pulse"></div>
      </div>
    </div>
  );
}
