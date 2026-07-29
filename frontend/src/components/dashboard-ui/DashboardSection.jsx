import React from "react";

export function DashboardSection({ title, action, children, className = "" }) {
  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-bold text-gray-900 tracking-tight">{title}</h2>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

export function CardSkeleton({ className = "" }) {
  return (
    <div className={`bg-white border border-[#ECECEC] rounded-[20px] p-5 shadow-sm animate-pulse ${className}`}>
      <div className="w-1/3 h-4 bg-slate-100 rounded mb-4"></div>
      <div className="w-full h-12 bg-slate-100 rounded"></div>
    </div>
  );
}

export function ListSkeleton({ count = 3 }) {
  return (
    <div className="flex flex-col gap-3">
      {[...Array(count)].map((_, i) => (
        <div key={i} className="bg-white border border-[#ECECEC] rounded-[20px] p-4 flex items-center gap-4 shadow-sm animate-pulse">
          <div className="w-10 h-10 rounded-full bg-slate-100 shrink-0"></div>
          <div className="flex-1 flex flex-col gap-2">
            <div className="w-32 h-4 bg-slate-100 rounded"></div>
            <div className="w-24 h-3 bg-slate-100 rounded"></div>
          </div>
          <div className="w-16 h-6 bg-slate-100 rounded shrink-0"></div>
        </div>
      ))}
    </div>
  );
}
