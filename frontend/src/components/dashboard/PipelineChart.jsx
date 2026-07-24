"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { pipelineData } from "@/config/dashboardCharts";

export default function PipelineChart() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">

      <div className="mb-5">

        <h2 className="mb-1 text-xl font-semibold">
          Lead Pipeline
        </h2>

        <p className="text-sm text-gray-500">
          Monthly Lead Performance
        </p>

      </div>

      <div className="h-[240px] sm:h-[340px]">

        <ResponsiveContainer>

          <LineChart data={pipelineData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="leads"
              stroke="#B8860B"
              strokeWidth={3}
            />

            <Line
              type="monotone"
              dataKey="admissions"
              stroke="#6B1D1D"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
