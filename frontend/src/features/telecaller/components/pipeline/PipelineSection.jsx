import { ChevronDown, ArrowDown, FilterX } from "lucide-react";

const PipelineSkeleton = () => (
  <div className="flex-1 flex flex-col items-center justify-center space-y-2">
    <div className="w-[100%] h-12 bg-slate-100 animate-pulse rounded-lg"></div>
    <ArrowDown size={16} className="text-slate-200 my-1" />
    <div className="w-[85%] h-12 bg-slate-100 animate-pulse rounded-lg"></div>
    <ArrowDown size={16} className="text-slate-200 my-1" />
    <div className="w-[70%] h-12 bg-slate-100 animate-pulse rounded-lg"></div>
    <ArrowDown size={16} className="text-slate-200 my-1" />
    <div className="w-[50%] h-12 bg-slate-100 animate-pulse rounded-lg"></div>
  </div>
);

export default function PipelineSection({ isLoading, pipeline = [] }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-[600] text-gray-900">Pipeline Funnel</h2>
        </div>
        <PipelineSkeleton />
      </div>
    );
  }

  // Fallback default stages if API sends an empty array but we want to show a structure,
  // or use the array directly. The contract says pipeline is an array of objects.
  const totalCount = Array.isArray(pipeline) ? pipeline.reduce((sum, stage) => sum + (stage.count || 0), 0) : 0;

  // Compute descending widths so it looks like a funnel
  const maxCount = Array.isArray(pipeline) && pipeline.length > 0 ? pipeline[0].count : 1;
  
  // Custom color palette mapping for stages
  const colors = [
    "bg-gradient-to-r from-blue-600 to-blue-500",
    "bg-gradient-to-r from-purple-600 to-purple-500",
    "bg-gradient-to-r from-pink-600 to-pink-500",
    "bg-gradient-to-r from-orange-600 to-orange-500",
    "bg-gradient-to-r from-teal-600 to-teal-500",
    "bg-gradient-to-r from-green-600 to-green-500",
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[600] text-gray-900">Pipeline Funnel</h2>
        <button className="flex items-center gap-1.5 text-xs font-[600] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1F2B]">
          This Month <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center space-y-2">
        {totalCount === 0 || !Array.isArray(pipeline) || pipeline.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-6">
            <FilterX size={32} className="text-slate-300 mb-3" />
            <p className="font-[600] text-gray-900">Empty Pipeline</p>
            <p className="text-sm mt-1">No leads have entered the funnel yet.</p>
          </div>
        ) : (
          pipeline.map((stage, idx) => {
            // Compute a visual width that gradually decreases, keeping a minimum width
            const visualWidth = Math.max(25, 100 - (idx * (75 / (pipeline.length || 1))));
            
            return (
              <div key={stage.stage || idx} className="w-full flex flex-col items-center">
                <div 
                  className={`${colors[idx % colors.length]} text-white font-[600] h-12 rounded-lg flex items-center justify-between px-5 shadow-sm transition-all duration-500 hover:scale-[1.02] cursor-pointer`}
                  style={{ width: `${visualWidth}%` }}
                >
                  <span className="text-sm tracking-wide">{stage.stage}</span>
                  <span className="text-lg">{stage.count}</span>
                </div>
                {idx < pipeline.length - 1 && (
                  <ArrowDown size={16} className="text-slate-300 my-1 animate-pulse" />
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
