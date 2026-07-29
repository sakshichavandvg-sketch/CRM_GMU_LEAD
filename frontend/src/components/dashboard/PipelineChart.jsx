import { FilterX, ChevronDown } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";

export default function PipelineChart({ pipeline = [] }) {
  // If backend hasn't provided pipeline yet, use some mock stages for the visual funnel
  const displayPipeline = pipeline && pipeline.length > 0 ? pipeline : [
    { stage: 'New', count: 450 },
    { stage: 'Contacted', count: 320 },
    { stage: 'Interested', count: 180 },
    { stage: 'Application', count: 95 },
    { stage: 'Documents', count: 60 },
    { stage: 'Admission', count: 42 }
  ];

  const totalCount = displayPipeline.reduce((sum, stage) => sum + (stage.count || 0), 0);

  // Professional monochromatic blue palette
  const colors = [
    "bg-[#6B0F1A] text-white",      // Maroon 900 (Darkest)
    "bg-[#7F1D2D] text-white",      // Maroon 800
    "bg-[#933244] text-white",      // Maroon 700
    "bg-[#A84A5C] text-white",      // Maroon 600
    "bg-[#C47A89] text-[#4A0E16]",  // Maroon 500 (Light)
    "bg-[#F8EDEE] text-[#4A0E16]"   // Maroon 100 (Lightest)

  ];

  const action = (
    <button className="flex items-center gap-1.5 text-xs font-[600] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1F2B]">
      This Month <ChevronDown size={14} className="text-gray-500" />
    </button>
  );

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Lead Pipeline" action={action} className="mb-6 h-full flex-1">
        <div className="flex-1 flex flex-col items-center justify-center space-y-1 mt-6 min-h-[280px]">
          {totalCount === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-6">
              <FilterX size={32} className="text-slate-300 mb-3" />
              <p className="font-[600] text-gray-900">Empty Pipeline</p>
              <p className="text-sm mt-1">No leads have entered the funnel yet.</p>
            </div>
          ) : (
            displayPipeline.map((stage, idx) => {
              // Create a linear funnel shape (e.g. 100% down to 40%)
              const minWidth = 40;
              const widthDecrement = (100 - minWidth) / Math.max(1, displayPipeline.length - 1);
              const visualWidth = Math.max(minWidth, 100 - (idx * widthDecrement));

              const colorClass = colors[idx % colors.length];

              return (
                <div key={stage.stage || idx} className="w-full flex flex-col items-center">
                  <div
                    className={`${colorClass} font-[600] h-10 rounded-md flex items-center justify-between px-4 shadow-sm transition-transform hover:scale-[1.01] cursor-pointer`}
                    style={{ width: `${visualWidth}%` }}
                  >
                    <span className="text-sm tracking-wide">{stage.stage}</span>
                    <span className="text-sm">{stage.count}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DashboardSection>
    </div>
  );
}
