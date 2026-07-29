"use client";

import { useMemo } from "react";
import { FilterX } from "lucide-react";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";

export default function LeadPipelineChart({ data }) {
  const isEmpty = useMemo(() => !data || data.length === 0, [data]);

  // Professional monochromatic maroon palette for funnel
  const colors = [
    "bg-[#6B0F1A] text-white",      // Maroon 900
    "bg-[#7F1D2D] text-white",      // Maroon 800
    "bg-[#933244] text-white",      // Maroon 700
    "bg-[#A84A5C] text-white",      // Maroon 600
    "bg-[#C47A89] text-[#4A0E16]",  // Maroon 500
    "bg-[#F8EDEE] text-[#4A0E16]"   // Maroon 100
  ];

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
          <div className="flex-1 flex flex-col items-center justify-center space-y-1 mt-6">
            {data.map((stage, idx) => {
              // Linear funnel shape width calculation
              const minWidth = 40;
              const widthDecrement = (100 - minWidth) / Math.max(1, data.length - 1);
              const visualWidth = Math.max(minWidth, 100 - (idx * widthDecrement));
              const colorClass = colors[idx % colors.length];

              return (
                <div key={stage.stage || idx} className="w-full flex flex-col items-center">
                  <div
                    className={`${colorClass} font-[600] h-10 rounded-md flex items-center justify-between px-4 shadow-sm transition-transform hover:scale-[1.01] cursor-pointer`}
                    style={{ width: `${visualWidth}%` }}
                  >
                    <span className="text-sm tracking-wide">{stage.stage}</span>
                    <span className="text-sm">{stage.count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
