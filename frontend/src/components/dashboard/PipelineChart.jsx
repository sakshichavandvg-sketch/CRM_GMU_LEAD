import { FilterX } from "lucide-react";

// Graduated maroon palette matching Stitch design
const FUNNEL_COLORS = [
  { bar: "#801B1B", dot: "#801B1B" },     // Darkest
  { bar: "#A45E5E", dot: "#A45E5E" },
  { bar: "#C08D8D", dot: "#C08D8D" },
  { bar: "#D8BABA", dot: "#D8BABA" },
  { bar: "#E8D5D5", dot: "#E8D5D5" },     // Lightest
];

export default function PipelineChart({ pipeline = [] }) {
  // Preserve existing fallback logic
  const displayPipeline = pipeline && pipeline.length > 0 ? pipeline : [
    { stage: 'New', count: 450 },
    { stage: 'Contacted', count: 320 },
    { stage: 'Interested', count: 180 },
    { stage: 'Application', count: 95 },
    { stage: 'Admission', count: 42 }
  ];

  const totalCount = displayPipeline.reduce((sum, stage) => sum + (stage.count || 0), 0);

  // Calculate conversion percentages (step-to-step)
  const getConversionPercent = (idx) => {
    if (idx === 0) return null; // First stage has no previous
    const prev = displayPipeline[idx - 1]?.count || 0;
    if (prev === 0) return 0;
    return Math.round(((displayPipeline[idx].count || 0) / prev) * 100);
  };

  // Overall conversion: last / first
  const overallConversion = displayPipeline.length >= 2 && displayPipeline[0].count > 0
    ? ((displayPipeline[displayPipeline.length - 1].count / displayPipeline[0].count) * 100).toFixed(1)
    : "0.0";

  // Funnel bar widths (100% down to ~43%)
  const getBarWidth = (idx) => {
    const widths = [100, 90, 75, 60, 43];
    return widths[idx] || Math.max(30, 100 - idx * 15);
  };

  return (
    <div className="bg-white rounded-3xl p-8 xl:p-10 shadow-sm h-full flex flex-col border border-gray-100">
      {/* Header Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-8 xl:mb-10">Admission Funnel</h2>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 text-center text-slate-500 py-6 min-h-[280px]">
          <FilterX size={32} className="text-slate-300 mb-3" />
          <p className="font-semibold text-gray-900">Empty Pipeline</p>
          <p className="text-sm mt-1">No leads have entered the funnel yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start flex-1">

          {/* LEFT: Legend List */}
          <div className="flex flex-col gap-y-6 xl:gap-y-7">
            {displayPipeline.map((stage, idx) => {
              const color = FUNNEL_COLORS[idx % FUNNEL_COLORS.length];
              const percent = getConversionPercent(idx);

              return (
                <div key={stage.stage || idx} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: color.dot }}
                    />
                    <span className="text-gray-600 font-medium">{stage.stage}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {percent !== null && (
                      <span className="bg-[#F8F9FA] text-gray-400 text-xs px-1.5 py-0.5 rounded min-w-[2.5rem] text-center font-medium">
                        {percent}%
                      </span>
                    )}
                    <span className="text-[#801B1B] font-bold text-lg min-w-[2rem] text-right">
                      {stage.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT: Funnel Visualization */}
          <div className="flex flex-col items-center">
            {/* Stacked Funnel Bars */}
            <div className="w-full flex flex-col items-center gap-2 mb-8">
              {displayPipeline.map((stage, idx) => {
                const color = FUNNEL_COLORS[idx % FUNNEL_COLORS.length];
                return (
                  <div
                    key={stage.stage || idx}
                    className="h-12 rounded-lg transition-all duration-300"
                    style={{
                      width: `${getBarWidth(idx)}%`,
                      backgroundColor: color.bar,
                    }}
                  />
                );
              })}
            </div>

            {/* Overall Conversion Footer */}
            <div className="text-center mt-4">
              <div className="text-5xl font-bold text-[#801B1B]">{overallConversion}%</div>
              <div className="text-gray-500 font-medium mt-1">Overall Conversion</div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
