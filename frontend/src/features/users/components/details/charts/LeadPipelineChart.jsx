"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { PIPELINE_COLORS } from "@/styles/theme/telecallerCharts";

export default function LeadPipelineChart({ data }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Add a tiny delay so the transition triggers after initial render
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!data || data.length === 0) return null;

  // Find max value to calculate percentage width for the bars
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Pipeline</h3>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {data.map((stage, index) => {
          const widthPercent = maxCount > 0 ? (stage.count / maxCount) * 100 : 0;
          return (
            <div key={index} className="flex items-center">
              {/* Stage Name */}
              <div className="w-28 shrink-0 flex items-center justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider pr-4">
                {stage.stage}
                {index < data.length - 1 && <ArrowRight size={14} className="text-gray-300" />}
              </div>
              
              {/* Bar */}
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden relative">
                <div 
                  className="h-full rounded-full transition-all duration-700 ease-out flex items-center px-3"
                  style={{ 
                    width: mounted ? `${widthPercent}%` : "0%",
                    backgroundColor: PIPELINE_COLORS[stage.stage.toUpperCase()] || "#E2E8F0", // Fallback to gray-200
                    minWidth: stage.count > 0 ? "2rem" : "0" // Ensure some visibility if count > 0
                  }}
                >
                </div>
              </div>
              
              {/* Count */}
              <div className="w-12 shrink-0 text-right font-medium text-gray-900">
                {stage.count}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
