"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

import { sourceData } from "@/config/dashboardCharts";

const COLORS = [
  "#B8860B",
  "#D97706",
  "#92400E",
  "#78350F",
  "#EAB308",
];

export default function SourceAnalytics() {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Source Analytics
      </h2>

      <p className="mb-5 text-sm text-gray-500">
        Lead Sources
      </p>

      <div className="h-[320px]">

        <ResponsiveContainer>

          <PieChart>

            <Pie
              data={sourceData}
              dataKey="value"
              innerRadius={70}
              outerRadius={110}
            >
              {sourceData.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}