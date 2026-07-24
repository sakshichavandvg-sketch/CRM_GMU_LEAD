"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { AlertCircle } from "lucide-react";

const COLORS = [
  "#B8860B",
  "#D97706",
  "#92400E",
  "#78350F",
  "#EAB308",
  "#CA8A04",
  "#A16207",
];

export default function SourceAnalytics({ sourceAnalytics }) {
  const data = sourceAnalytics || [];
  const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0);

  let displayData = [];
  if (data.length > 6) {
    const sorted = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
    const top = sorted.slice(0, 5);
    const others = sorted.slice(5).reduce((acc, curr) => acc + (curr.value || 0), 0);
    displayData = [...top, { label: "Others", value: others }];
  } else {
    displayData = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
  }

  return (
    <div className="flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="mb-5">
        <h2 className="mb-1 text-xl font-semibold">
          Source Analytics
        </h2>
        <p className="text-sm text-gray-500">
          Lead Sources
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-1 flex-col items-center justify-center text-center min-h-[260px]">
          <AlertCircle className="mb-2 text-gray-400" size={24} />
          <p className="text-sm text-gray-500">No source data available</p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col xl:flex-row items-center justify-center gap-8 min-h-[260px]">
          {/* Chart Wrapper */}
          <div className="h-[260px] w-[260px] shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={displayData}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={80}
                  outerRadius={120}
                  stroke="none"
                >
                  {displayData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="flex w-full flex-col gap-3">
            {displayData.map((entry, index) => {
              const percentage = total > 0 ? Math.round(((entry.value || 0) / total) * 100) : 0;
              return (
                <div key={index} className="grid grid-cols-[1fr_auto] items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span 
                      className="h-3 w-3 shrink-0 rounded-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                    />
                    <span className="truncate font-medium text-gray-700">{entry.label}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}