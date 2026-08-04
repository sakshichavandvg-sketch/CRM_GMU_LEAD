import React from "react";

export default function MyLeadsKPISection({ kpiData }) {
  const {
    totalAssigned = 0,
    newLeads = 0,
    inProgress = 0,
    interested = 0,
    notInterested = 0,
    converted = 0,
  } = kpiData || {};

  return (
    <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mb-8">
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-card-gap min-w-max md:min-w-0">
        
        {/* Card 1: Total Assigned */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined fill-icon">group</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{totalAssigned}</p>
            <p className="text-title-sm font-title-sm mt-1">Total Assigned</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">All your assigned leads</p>
        </div>

        {/* Card 2: New Leads */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600">
            <span className="material-symbols-outlined fill-icon">bolt</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{newLeads}</p>
            <p className="text-title-sm font-title-sm mt-1">New Leads</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">Require your attention</p>
        </div>

        {/* Card 3: In Progress */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined fill-icon">schedule</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{inProgress}</p>
            <p className="text-title-sm font-title-sm mt-1">In Progress</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">Active follow-ups</p>
        </div>

        {/* Card 4: Interested */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary">
            <span className="material-symbols-outlined fill-icon">check_circle</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{interested}</p>
            <p className="text-title-sm font-title-sm mt-1">Interested</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">Showing interest</p>
        </div>

        {/* Card 5: Not Interested */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center text-error">
            <span className="material-symbols-outlined fill-icon">cancel</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{notInterested}</p>
            <p className="text-title-sm font-title-sm mt-1">Not Interested</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">Not showing interest</p>
        </div>

        {/* Card 6: Converted */}
        <div className="bg-surface-container-lowest premium-shadow p-6 rounded-2xl w-[220px] md:w-auto h-[170px] flex flex-col justify-between transition-transform hover:-translate-y-1">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
            <span className="material-symbols-outlined fill-icon">stars</span>
          </div>
          <div>
            <p className="text-display-lg font-bold text-on-surface leading-none">{converted}</p>
            <p className="text-title-sm font-title-sm mt-1">Converted</p>
          </div>
          <p className="text-body-sm text-on-surface-variant">Successfully converted</p>
        </div>

      </div>
    </div>
  );
}
