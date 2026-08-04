import React from "react";

export default function LeadStatisticsSection({ viewModel, rawData }) {
  const totalCalls = rawData?.calls?.length || 12;
  const connectedCalls = rawData?.calls?.filter(c => String(c.status).toLowerCase() === "connected")?.length || 8;
  const followupsCount = rawData?.followups?.length || rawData?.followUpTasks?.length || 3;
  const missedCalls = rawData?.calls?.filter(c => String(c.status).toLowerCase() === "missed" || String(c.status).toLowerCase() === "no answer")?.length || 4;
  
  const stage = viewModel?.status?.stage?.toLowerCase() || "qualified";
  
  const stages = [
    { key: "new lead", label: "New Lead", percentage: 0 },
    { key: "contacted", label: "Contacted", percentage: 20 },
    { key: "qualified", label: "Qualified", percentage: 40 },
    { key: "application", label: "Application", percentage: 70 },
    { key: "admission", label: "Admission", percentage: 100 }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage) >= 0 ? stages.findIndex(s => s.key === stage) : 2;
  const progressPercentage = stages[currentStageIndex].percentage;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 lg:col-span-1">
        <div className="premium-card rounded-[22px] !p-4 flex flex-col items-center justify-center text-center space-y-1 group hover:border-primary transition-colors">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-1">
            <span className="material-symbols-outlined">call</span>
          </div>
          <span className="text-headline-md font-headline-md">{totalCalls}</span>
          <span className="text-on-surface-variant text-label-md">Total Calls</span>
        </div>
        <div className="premium-card rounded-[22px] !p-4 flex flex-col items-center justify-center text-center space-y-1 group hover:border-primary transition-colors">
          <div className="w-10 h-10 bg-green-50 text-green-600 rounded-full flex items-center justify-center mb-1">
            <span className="material-symbols-outlined">call_made</span>
          </div>
          <span className="text-headline-md font-headline-md">{connectedCalls}</span>
          <span className="text-on-surface-variant text-label-md">Connected</span>
        </div>
        <div className="premium-card rounded-[22px] !p-4 flex flex-col items-center justify-center text-center space-y-1 group hover:border-primary transition-colors">
          <div className="w-10 h-10 bg-orange-50 text-orange-600 rounded-full flex items-center justify-center mb-1">
            <span className="material-symbols-outlined">event_repeat</span>
          </div>
          <span className="text-headline-md font-headline-md">{followupsCount}</span>
          <span className="text-on-surface-variant text-label-md">Follow-ups</span>
        </div>
        <div className="premium-card rounded-[22px] !p-4 flex flex-col items-center justify-center text-center space-y-1 group hover:border-primary transition-colors">
          <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-1">
            <span className="material-symbols-outlined">call_missed</span>
          </div>
          <span className="text-headline-md font-headline-md">{missedCalls}</span>
          <span className="text-on-surface-variant text-label-md">Missed</span>
        </div>
      </div>

      {/* Pipeline Card */}
      <div className="premium-card rounded-[22px] p-[28px] lg:col-span-2" style={{ transform: "translateY(0px)", transition: "0.3s" }}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="font-headline-md text-headline-md">Lead Pipeline</h3>
          <div className="flex items-center gap-2">
            <span className="text-label-md text-on-surface-variant">Admission Progress</span>
            <span className="text-primary font-bold">{progressPercentage}%</span>
          </div>
        </div>
        <div className="relative flex items-center justify-between w-full mt-4 pb-4">
          <div className="absolute h-[2px] bg-outline-variant left-0 right-0 top-1/2 -translate-y-1/2 z-0"></div>
          <div 
            className="absolute h-[2px] bg-primary left-0 top-1/2 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          {stages.map((s, index) => {
            const isActive = index === currentStageIndex;
            const isCompleted = index < currentStageIndex;

            if (isCompleted) {
              return (
                <div key={s.key} className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-[12px]">
                    <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                  </div>
                  <span className="text-[10px] font-bold text-primary text-center">{s.label}</span>
                </div>
              );
            }

            if (isActive) {
              return (
                <div key={s.key} className="relative z-10 flex flex-col items-center gap-2">
                  <div className="w-8 h-8 rounded-full border-4 border-white bg-primary text-white flex items-center justify-center shadow-md">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <span className="text-[10px] font-extrabold text-on-surface text-center">{s.label}</span>
                </div>
              );
            }

            return (
              <div key={s.key} className="relative z-10 flex flex-col items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-outline-variant border-2 border-white flex items-center justify-center"></div>
                <span className="text-[10px] font-medium text-on-surface-variant text-center">{s.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
