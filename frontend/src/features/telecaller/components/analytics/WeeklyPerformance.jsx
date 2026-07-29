import { ChevronDown } from "lucide-react";

const ProgressBar = ({ label, current, target, colorClass, bgClass }) => {
  const safeTarget = Math.max(1, target);
  const percentage = Math.min(100, Math.round((current / safeTarget) * 100));

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-end">
        <span className="font-[600] text-gray-700 text-sm">{label}</span>
        <span className="text-sm text-gray-500 font-[500]">
          <strong className="text-gray-900">{current}</strong> / {target}
        </span>
      </div>
      <div className={`w-full h-3 rounded-full ${bgClass} overflow-hidden`}>
        <div 
          className={`h-full rounded-full ${colorClass} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const PerformanceSkeleton = () => (
  <div className="flex-1 space-y-6 mt-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="flex flex-col gap-2">
        <div className="flex justify-between items-end">
          <div className="w-16 h-4 bg-slate-100 animate-pulse rounded"></div>
          <div className="w-20 h-4 bg-slate-100 animate-pulse rounded"></div>
        </div>
        <div className="w-full h-3 bg-slate-100 animate-pulse rounded-full"></div>
      </div>
    ))}
  </div>
);

export default function WeeklyPerformance({ isLoading, weeklyPerformance }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-[600] text-gray-900">Weekly Target</h2>
        </div>
        <PerformanceSkeleton />
      </div>
    );
  }

  // Fallback defaults
  const perf = weeklyPerformance || {
    calls: { current: 0, target: 1 },
    interested: { current: 0, target: 1 },
    admissions: { current: 0, target: 1 }
  };

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col justify-between min-h-[300px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[600] text-gray-900">Weekly Target</h2>
        <button className="flex items-center gap-1.5 text-xs font-[600] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1F2B]">
          This Week <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>

      <div className="space-y-8 flex-1 flex flex-col justify-center">
        <ProgressBar 
          label="Calls Made" 
          current={perf.calls?.current || 0} 
          target={perf.calls?.target || 350} 
          colorClass="bg-[#2563EB]" 
          bgClass="bg-blue-50"
        />
        <ProgressBar 
          label="Interested Leads" 
          current={perf.interested?.current || 0} 
          target={perf.interested?.target || 50} 
          colorClass="bg-[#F97316]" 
          bgClass="bg-orange-50"
        />
        <ProgressBar 
          label="Admissions" 
          current={perf.admissions?.current || 0} 
          target={perf.admissions?.target || 10} 
          colorClass="bg-[#16A34A]" 
          bgClass="bg-green-50"
        />
      </div>
    </div>
  );
}
