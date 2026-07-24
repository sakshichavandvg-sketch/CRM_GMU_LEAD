"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CALL_OUTCOME_COLORS } from "@/styles/theme/telecallerCharts";

export default function CallOutcomeChart({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm h-full flex flex-col min-h-[300px]">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Outcome Breakdown</h3>
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
          <div className="w-16 h-16 mb-4 rounded-full bg-gray-50 flex items-center justify-center border border-gray-100">
            <svg className="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500">No outcome data available</p>
          <p className="text-xs text-gray-400 mt-1">There is no outcome data for this period.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm h-full flex flex-col">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Outcome Breakdown</h3>
      <div className="flex-1 min-h-[250px] relative flex flex-col items-center justify-center">
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
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "#0f172a" }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 grid grid-cols-2 gap-3 w-full px-4">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full shrink-0"
                style={{ backgroundColor: CALL_OUTCOME_COLORS[entry.name] || "#E2E8F0" }}
              ></span>
              <span className="text-xs text-gray-600 truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
