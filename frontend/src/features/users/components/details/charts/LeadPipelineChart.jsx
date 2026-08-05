"use client";

import { useMemo } from "react";
import { FilterX, Check } from "lucide-react";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";

export default function LeadPipelineChart({ data }) {
  // Use data directly as provided by backend
  const pipeline = useMemo(() => data || [], [data]);
  const isEmpty = pipeline.length === 0;

  const totalLeads = useMemo(() => {
    return pipeline.reduce((sum, stage) => sum + (stage.count || 0), 0);
  }, [pipeline]);

  // If a stage has leads or is before a stage that has leads, consider it completed/active
  // For an aggregated view across multiple leads, stages with count > 0 are active.
  const getNodeState = (idx) => {
    if (pipeline[idx]?.count > 0) return "active";
    // Check if any subsequent stage has leads (meaning this stage was completed by some leads)
    const subsequentHasLeads = pipeline.slice(idx + 1).some(s => s.count > 0);
    if (subsequentHasLeads) return "completed";
    return "future";
  };

  return (
    <DashboardSection title="Lead Pipeline" className="h-full">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[300px]">
        {isEmpty || totalLeads === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              title="Empty Pipeline" 
              description="No pipeline data available." 
              icon={FilterX} 
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4 w-full">
            <div className="flex items-center justify-between w-full relative">
              {pipeline.map((stage, idx) => {
                const state = getNodeState(idx);
                const isLast = idx === pipeline.length - 1;
                const nextState = !isLast ? getNodeState(idx + 1) : null;
                const count = stage.count || 0;
                const percentage = totalLeads > 0 ? Math.round((count / totalLeads) * 100) : 0;

                return (
                  <div key={stage.stage || idx} className="flex-1 flex items-center relative group">
                    {/* Node Container */}
                    <div className="flex flex-col items-center justify-center relative z-10 w-full group">
                      {/* Circle Icon */}
                      <div className="h-12 flex items-center justify-center mb-3">
                        {state === "completed" && (
                          <div className="w-10 h-10 rounded-full bg-[#801B1B] flex items-center justify-center text-white shadow-sm ring-4 ring-white transition-transform group-hover:scale-110">
                            <Check size={20} strokeWidth={3} />
                          </div>
                        )}
                        {state === "active" && (
                          <div className="w-10 h-10 rounded-full border-4 border-[#801B1B] bg-white flex items-center justify-center ring-4 ring-white transition-transform group-hover:scale-110">
                            <div className="w-4 h-4 rounded-full bg-[#801B1B]" />
                          </div>
                        )}
                        {state === "future" && (
                          <div className="w-10 h-10 rounded-full border-4 border-[#e5e7eb] bg-white flex items-center justify-center ring-4 ring-white transition-transform group-hover:scale-110">
                            <div className="w-4 h-4 rounded-full bg-[#f3f4f6]" />
                          </div>
                        )}
                      </div>

                      {/* Label & Stats */}
                      <div className="flex flex-col items-center">
                        <span className={`text-sm font-bold whitespace-nowrap text-center ${
                          state === "completed" ? "text-gray-800" :
                          state === "active" ? "text-[#801B1B]" :
                          "text-gray-500"
                        }`}>
                          {stage.stage}
                        </span>
                        
                        {/* Always show count and percentage underneath */}
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-sm font-semibold text-gray-700">{count}</span>
                          <span className="text-xs text-gray-400 font-medium">({percentage}%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Connecting Line */}
                    {!isLast && (
                      <div className="absolute top-6 left-1/2 w-full h-[2px] -translate-y-1/2 -z-10"
                           style={{
                             background: (state === "completed" || state === "active") && (nextState === "completed" || nextState === "active") ? "#801B1B" :
                                         (state === "completed" || state === "active") && nextState === "future" ? "linear-gradient(to right, #801B1B, #e5e7eb)" :
                                         "#e5e7eb"
                           }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
