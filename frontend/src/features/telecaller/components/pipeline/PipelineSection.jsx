import { ChevronDown, FilterX } from "lucide-react";

const PipelineSkeleton = () => (
  <div className="flex-1 flex gap-6 mt-4">
    <div className="w-1/2 flex flex-col items-center justify-center space-y-1">
      <div className="w-[100%] h-10 bg-gray-100 animate-pulse rounded-t-lg"></div>
      <div className="w-[85%] h-10 bg-gray-100 animate-pulse"></div>
      <div className="w-[70%] h-10 bg-gray-100 animate-pulse"></div>
      <div className="w-[50%] h-10 bg-gray-100 animate-pulse rounded-b-lg"></div>
    </div>
    <div className="w-1/2 flex flex-col justify-center space-y-4">
      <div className="w-full h-4 bg-gray-100 animate-pulse rounded"></div>
      <div className="w-3/4 h-4 bg-gray-100 animate-pulse rounded"></div>
      <div className="w-full h-4 bg-gray-100 animate-pulse rounded"></div>
      <div className="w-2/3 h-4 bg-gray-100 animate-pulse rounded"></div>
    </div>
  </div>
);

export default function PipelineSection({ isLoading, pipeline = [] }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col min-h-[260px]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Pipeline Overview</h2>
        </div>
        <PipelineSkeleton />
      </div>
    );
  }

  const totalCount = Array.isArray(pipeline) ? pipeline.reduce((sum, stage) => sum + (stage.count || 0), 0) : 0;
  
  const colors = [
    { bg: "bg-[#8B1538]", text: "text-[#8B1538]" }, // GMU Maroon
    { bg: "bg-[#EC4899]", text: "text-[#EC4899]" }, // Pink
    { bg: "bg-[#F97316]", text: "text-[#F97316]" }, // Orange
    { bg: "bg-[#3B82F6]", text: "text-[#3B82F6]" }, // Blue
    { bg: "bg-[#8B5CF6]", text: "text-[#8B5CF6]" }, // Purple
    { bg: "bg-[#22C55E]", text: "text-[#22C55E]" }, // Green
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col min-h-[260px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Pipeline Overview</h2>
        <button className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 transition-colors outline-none focus:ring-2 focus:ring-[#8B1538] rounded p-1">
          This Month <ChevronDown size={14} className="text-gray-400" />
        </button>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        {totalCount === 0 || !Array.isArray(pipeline) || pipeline.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center text-gray-500 py-6">
            <FilterX size={32} className="text-gray-300 mb-3" />
            <p className="font-semibold text-gray-900">Empty Pipeline</p>
            <p className="text-sm mt-1">No leads have entered the funnel yet.</p>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            {/* Funnel Visual */}
            <div className="w-1/2 flex flex-col items-center gap-0.5">
              {pipeline.map((stage, idx) => {
                const visualWidth = Math.max(30, 100 - (idx * (70 / (pipeline.length || 1))));
                const color = colors[idx % colors.length].bg;
                const isFirst = idx === 0;
                const isLast = idx === pipeline.length - 1;
                
                return (
                  <div key={`visual-${stage.stage || idx}`} className="w-full flex justify-center group">
                    <div 
                      className={`${color} h-[34px] w-full transition-all duration-500 hover:opacity-80 cursor-pointer ${isFirst ? 'rounded-t-md' : ''} ${isLast ? 'rounded-b-md' : ''}`}
                      style={{ width: `${visualWidth}%` }}
                    ></div>
                  </div>
                );
              })}
            </div>

            {/* Funnel Legend */}
            <div className="w-1/2 flex flex-col gap-3.5">
              {pipeline.map((stage, idx) => {
                const percentage = totalCount > 0 ? Math.round((stage.count / totalCount) * 100) : 0;
                const colorTheme = colors[idx % colors.length];
                
                return (
                  <div key={`legend-${stage.stage || idx}`} className="flex items-center justify-between text-sm group cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colorTheme.bg} group-hover:scale-125 transition-transform`}></div>
                      <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors">{stage.stage}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-right">
                      <span className="font-bold text-gray-900">{stage.count}</span>
                      <span className="text-[10px] font-bold text-gray-400 w-8 inline-block">({percentage}%)</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
