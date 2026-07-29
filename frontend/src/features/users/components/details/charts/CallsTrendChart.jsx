"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LINE_CHART_COLORS } from "@/styles/theme/telecallerCharts";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneCall } from "lucide-react";

export default function CallsTrendChart({ data }) {
  // Memoize empty check to avoid unnecessary renders
  const isEmpty = useMemo(() => !data || data.length === 0, [data]);

  return (
    <DashboardSection title="Calls Performance" className="h-full">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full flex flex-col min-h-[300px]">
        {isEmpty ? (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState 
              title="No Call Data Available" 
              description="There is no performance data for this period." 
              icon={PhoneCall} 
            />
          </div>
        ) : (
          <div className="flex-1 w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#64748b" }}
                />
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
                <Line
                  type="monotone"
                  dataKey="calls"
                  stroke={LINE_CHART_COLORS.stroke}
                  strokeWidth={3}
                  dot={{ r: 4, fill: LINE_CHART_COLORS.fillStart, strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: LINE_CHART_COLORS.fillStart, strokeWidth: 2, stroke: "#fff" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
