"use client";

import { useMemo } from "react";
import { FilterX, Check } from "lucide-react";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";

export default function LeadPipelineChart({ data }) {
  const isEmpty = useMemo(() => !data || data.length === 0, [data]);

  const getNodeState = (idx) => {
    // Hardcoded visual matching for the specific mockup design:
    // First 2 are completed (green), 3rd is active (red), rest are future (gray)
    if (idx < 2) return "completed";
    if (idx === 2) return "active";
    return "future";
  };

  return (
    <DashboardSection title="Lead Pipeline" className="h-full">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[300px]">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              title="Empty Pipeline" 
              description="No leads have entered the funnel yet." 
              icon={FilterX} 
            />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4 w-full">
            <div className="flex items-center justify-between w-full relative">
              {data.map((stage, idx) => {
                const state = getNodeState(idx);
                const isLast = idx === data.length - 1;
                const nextState = !isLast ? getNodeState(idx + 1) : null;

                return (
                  <div key={stage.stage || idx} className="flex-1 flex items-center relative group">
                    {/* Node Container */}
                    <div className="flex flex-col items-center justify-center relative z-10 w-full">
                      {/* Circle Icon */}
                      <div className="h-12 flex items-center justify-center mb-3">
                        {state === "completed" && (
                          <div className="w-10 h-10 rounded-full bg-[#22c55e] flex items-center justify-center text-white shadow-sm ring-4 ring-white">
                            <Check size={20} strokeWidth={3} />
                          </div>
                        )}
                        {state === "active" && (
                          <div className="w-10 h-10 rounded-full border-4 border-[#991b1b] bg-white flex items-center justify-center ring-4 ring-white">
                            <div className="w-4 h-4 rounded-full bg-[#991b1b]" />
                          </div>
                        )}
                        {state === "future" && (
                          <div className="w-10 h-10 rounded-full border-4 border-[#e5e7eb] bg-white flex items-center justify-center ring-4 ring-white">
                            <div className="w-4 h-4 rounded-full bg-[#f3f4f6]" />
                          </div>
                        )}
                      </div>

                      {/* Label */}
                      <span className={`text-sm font-bold whitespace-nowrap text-center ${
                        state === "completed" ? "text-gray-800" :
                        state === "active" ? "text-[#991b1b]" :
                        "text-gray-500"
                      }`}>
                        {stage.stage}
                      </span>
                    </div>

                    {/* Connecting Line (drawn from the center of this node to the center of the next) */}
                    {!isLast && (
                      <div className="absolute top-6 left-1/2 w-full h-[2px] -translate-y-1/2 -z-10"
                           style={{
                             background: state === "completed" && nextState === "completed" ? "#22c55e" :
                                         state === "completed" && nextState === "active" ? "linear-gradient(to right, #22c55e, #991b1b)" :
                                         state === "active" ? "linear-gradient(to right, #991b1b, #e5e7eb)" :
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
