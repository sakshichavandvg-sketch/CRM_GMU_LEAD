import { FilterX } from "lucide-react";

// Stitch design color palette for donut chart segments
const COLORS = [
  "#7B1616", // Maroon
  "#DAA520", // Gold
  "#2563EB", // Blue
  "#22C55E", // Green
  "#9333EA", // Purple (fallback for 5+)
  "#F97316", // Orange (fallback for 6+)
];

export default function SourceAnalytics({ sourceAnalytics }) {
  const data = sourceAnalytics || [];
  const total = data.reduce((acc, curr) => acc + (curr.value || 0), 0);

  // Preserve existing grouping logic (top 5 + Others)
  let displayData = [];
  if (data.length > 6) {
    const sorted = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
    const top = sorted.slice(0, 5);
    const others = sorted.slice(5).reduce((acc, curr) => acc + (curr.value || 0), 0);
    displayData = [...top, { label: "Others", value: others }];
  } else {
    displayData = [...data].sort((a, b) => (b.value || 0) - (a.value || 0));
  }

  // Build conic-gradient segments for the donut chart
  const buildConicGradient = () => {
    if (total === 0) return "conic-gradient(#E5E7EB 0% 100%)";
    let segments = [];
    let cumulative = 0;
    displayData.forEach((entry, idx) => {
      const percent = ((entry.value || 0) / total) * 100;
      const color = COLORS[idx % COLORS.length];
      segments.push(`${color} ${cumulative}% ${cumulative + percent}%`);
      cumulative += percent;
    });
    return `conic-gradient(${segments.join(", ")})`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-full flex flex-col">
      {/* Header — Stitch layout */}
      <div className="flex justify-between items-center mb-8 xl:mb-10">
        <h2 className="text-xl font-bold text-gray-900">Lead Sources</h2>
        <a
          className="flex items-center text-[#7B1616] text-sm font-semibold hover:opacity-80 transition-opacity"
          href="#"
        >
          View Full Report
          <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center text-slate-500 py-6 min-h-[280px]">
          <FilterX size={32} className="text-slate-300 mb-3" />
          <p className="font-semibold text-gray-900">No Data Available</p>
          <p className="text-sm mt-1">Lead sources are currently empty.</p>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 sm:gap-12 flex-1">
          {/* Donut Chart (CSS conic-gradient per Stitch) */}
          <div className="relative flex-shrink-0">
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: "180px",
                height: "180px",
                background: buildConicGradient(),
              }}
            >
              {/* Inner white circle for donut hole */}
              <div className="w-[140px] h-[140px] bg-white rounded-full flex flex-col items-center justify-center z-10">
                <div className="text-3xl font-bold text-[#7B1616] leading-none">
                  {total.toLocaleString()}
                </div>
                <div className="text-xs text-gray-500 mt-1 font-medium">Total Leads</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex-grow w-full space-y-4">
            {displayData.map((entry, index) => {
              const percentage = total > 0 ? Math.round(((entry.value || 0) / total) * 100) : 0;
              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700 font-medium">{entry.label}</span>
                  </div>
                  <span className="text-gray-900 font-bold">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}