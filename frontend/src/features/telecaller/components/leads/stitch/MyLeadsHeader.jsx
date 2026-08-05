import React from "react";

export default function MyLeadsHeader({
  assignedLeadsCount = 0,
  lastSynced = "just now"
}) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
      <div>
        <h2 className="text-[42px] font-bold leading-tight tracking-tight text-on-surface">My Leads</h2>
        <div className="flex items-center gap-3 mt-1">
          <span className="flex items-center gap-1.5 text-body-md text-on-surface-variant">
            <span className="w-2 h-2 rounded-full bg-tertiary shadow-[0_0_8px_rgba(0,57,20,0.4)]"></span>
            {assignedLeadsCount} assigned {assignedLeadsCount === 1 ? 'lead' : 'leads'}
          </span>
          <span className="text-outline-variant">•</span>
          <span className="text-body-md text-on-surface-variant">Last synced {lastSynced}</span>
        </div>
      </div>
    </div>
  );
}
