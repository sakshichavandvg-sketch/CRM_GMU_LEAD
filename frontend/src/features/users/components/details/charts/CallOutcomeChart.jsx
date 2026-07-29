"use client";

import { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CALL_OUTCOME_COLORS } from "@/styles/theme/telecallerCharts";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PieChart as PieChartIcon } from "lucide-react";

export default function CallOutcomeChart({ data }) {
  const isEmpty = useMemo(() => !data || data.length === 0, [data]);

  return (
    <DashboardSection title="Call Outcome Breakdown" className="h-full">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[300px]">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              title="No Outcome Data Available" 
              description="There is no outcome data for this period." 
              icon={PieChartIcon} 
            />
          </div>
        ) : (
          <div className="flex-1 relative flex flex-col items-center justify-center w-full mt-2">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CALL_OUTCOME_COLORS[entry.name] || "#E2E8F0"} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "12px",
                    border: "1px solid #ECECEC",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    fontWeight: 600
                  }}
                  itemStyle={{ color: "#0f172a" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-3 w-full px-4">
              {data.map((entry, index) => (
                <div key={index} className="flex items-center gap-2 group">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 group-hover:scale-125 transition-transform"
                    style={{ backgroundColor: CALL_OUTCOME_COLORS[entry.name] || "#E2E8F0" }}
                  ></span>
                  <span className="text-xs font-[600] text-gray-600 truncate">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
