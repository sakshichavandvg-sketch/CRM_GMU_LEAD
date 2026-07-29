import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { FilterX, ChevronDown } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";

const COLORS = [
  "#6B0F1A", // Maroon 900 (replaces blue-600)
  "#7F1D2D", // Maroon 800 (replaces blue-500)
  "#933244", // Maroon 700 (replaces blue-400)
  "#B15567", // Maroon 600 (replaces blue-300)
  "#D19AA5", // Maroon 300 (replaces slate-500)
  "#E6C7CD", // Maroon 200 (replaces slate-400)
  "#F8EFF1", // Maroon 100 (replaces slate-300)
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

  const action = (
    <button className="flex items-center gap-1.5 text-xs font-[600] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1F2B]">
      All Sources <ChevronDown size={14} className="text-gray-500" />
    </button>
  );

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Source Analytics" action={action} className="mb-6 h-full flex-1">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-6 min-h-[280px]">
            <FilterX size={32} className="text-slate-300 mb-3" />
            <p className="font-[600] text-gray-900">No Data Available</p>
            <p className="text-sm mt-1">Lead sources are currently empty.</p>
          </div>
        ) : (
          <div className="flex flex-1 flex-col xl:flex-row items-center justify-center gap-8 mt-6 min-h-[280px]">
            {/* Chart Wrapper */}
            <div className="h-[220px] w-[220px] shrink-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={displayData}
                    dataKey="value"
                    nameKey="label"
                    innerRadius={70}
                    outerRadius={105}
                    stroke="none"
                    paddingAngle={2}
                    cornerRadius={4}
                  >
                    {displayData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: '12px', border: '1px solid #ECECEC', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', fontWeight: 600 }}
                    itemStyle={{ color: '#1F2937' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-[700] text-gray-900 leading-none">{total}</span>
                <span className="text-xs font-[600] text-gray-500 uppercase tracking-wider mt-1">Total</span>
              </div>
            </div>

            {/* Legend */}
            <div className="flex w-full flex-col gap-3 max-w-xs">
              {displayData.map((entry, index) => {
                const percentage = total > 0 ? Math.round(((entry.value || 0) / total) * 100) : 0;
                return (
                  <div key={index} className="flex items-center justify-between text-sm group">
                    <div className="flex items-center gap-3 overflow-hidden flex-1">
                      <span
                        className="h-3 w-3 shrink-0 rounded-full group-hover:scale-125 transition-transform"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="truncate font-[600] text-gray-700">{entry.label}</span>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <span className="text-gray-500 font-medium w-8">{entry.value}</span>
                      <span className="font-[700] text-gray-900 w-10">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </DashboardSection>
    </div>
  );
}