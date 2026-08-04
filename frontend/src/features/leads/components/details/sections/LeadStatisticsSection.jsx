import React from "react";

export default function LeadStatisticsSection({ viewModel, rawData }) {
  const totalCalls = rawData?.calls?.length || 0;
  const connectedCalls = rawData?.calls?.filter(c => c.status === "Connected")?.length || 0;
  
  const stage = viewModel?.status?.stage?.toLowerCase() || "";
  let progressPercentage = 0;
  let progressLabel = "New Lead";
  
  const stages = [
    { key: "new lead", label: "New Lead", percentage: 0 },
    { key: "contacted", label: "Contacted", percentage: 25 },
    { key: "qualified", label: "Qualified", percentage: 50 },
    { key: "application", label: "Application", percentage: 75 },
    { key: "admission", label: "Admission", percentage: 100 }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === stage) >= 0 ? stages.findIndex(s => s.key === stage) : 0;
  progressPercentage = stages[currentStageIndex].percentage;
  progressLabel = `${stages[currentStageIndex].label} Stage`;

  return (
    <section className="grid grid-cols-12 gap-6">
      {/* KPI Cards */}
      <div className="col-span-3 flex flex-col gap-6">
        <div className="premium-card p-6 rounded-lg flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container">
            <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>call</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md">{totalCalls}</h3>
            <p className="text-label-md text-on-surface-variant">Total Calls</p>
          </div>
        </div>
        <div className="premium-card p-6 rounded-lg flex items-center gap-6">
          <div className="w-14 h-14 rounded-full bg-[#16A34A]/10 flex items-center justify-center text-[#16A34A]">
            <span className="material-symbols-outlined text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>call_made</span>
          </div>
          <div>
            <h3 className="font-headline-md text-headline-md">{connectedCalls}</h3>
            <p className="text-label-md text-on-surface-variant">Connected</p>
          </div>
        </div>
      </div>

      {/* Admission Progress */}
      <div className="col-span-3 premium-card p-6 rounded-lg bg-[#FFF9E6] border-[#F59E0B]/20 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#F59E0B]/10 flex items-center justify-center text-[#F59E0B] mb-4">
          <span className="material-symbols-outlined text-headline-lg" style={{ fontVariationSettings: "'FILL' 1" }}>school</span>
        </div>
        <p className="text-label-md text-[#B45309] font-bold uppercase tracking-widest mb-1">Admission Progress</p>
        <h3 className="font-display-lg text-display-lg text-[#F59E0B]">{progressPercentage}%</h3>
        <p className="text-body-sm text-[#B45309] mb-6">{progressLabel}</p>
        <div className="w-full h-3 bg-[#F59E0B]/20 rounded-full overflow-hidden">
          <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      {/* Lead Pipeline */}
      <div className="col-span-6 premium-card p-6 rounded-lg flex flex-col justify-between">
        <h3 className="font-label-md text-on-surface mb-6">Lead Pipeline</h3>
        <div className="relative h-24 flex items-center">
          <div className="pipeline-line"></div>
          <div className="relative z-10 w-full flex justify-between px-2">
            {stages.map((s, index) => {
              const isActive = index === currentStageIndex;
              const isCompleted = index < currentStageIndex;

              if (isCompleted) {
                return (
                  <div key={s.key} className="flex flex-col items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-[#16A34A] flex items-center justify-center text-on-primary">
                      <span className="material-symbols-outlined text-lg">check</span>
                    </div>
                    <span className="text-label-sm font-bold text-[#16A34A]">{s.label}</span>
                  </div>
                );
              }

              if (isActive) {
                return (
                  <div key={s.key} className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-4 border-primary bg-surface flex items-center justify-center text-primary -mt-1 scale-110 shadow-lg">
                      <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {s.key === 'application' ? 'description' : s.key === 'admission' ? 'school' : 'person'}
                      </span>
                    </div>
                    <span className="text-label-sm font-bold text-primary">{s.label}</span>
                  </div>
                );
              }

              // Incomplete
              return (
                <div key={s.key} className="flex flex-col items-center gap-2">
                  <div className="w-10 h-10 rounded-full border-2 border-outline-variant bg-surface flex items-center justify-center text-outline-variant">
                    <span className="material-symbols-outlined text-lg">
                      {s.key === 'application' ? 'description' : s.key === 'admission' ? 'school' : 'person'}
                    </span>
                  </div>
                  <span className="text-label-sm font-bold text-outline-variant">{s.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
