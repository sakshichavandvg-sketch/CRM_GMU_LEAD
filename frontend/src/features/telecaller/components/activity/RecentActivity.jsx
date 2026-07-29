import { PhoneCall, FileText, CalendarClock, History, CheckCircle2 } from "lucide-react";

const ActivitySkeleton = () => (
  <div className="flex gap-4 group">
    <div className="w-[45px] text-right pt-2 shrink-0">
      <div className="w-8 h-3 bg-slate-100 animate-pulse rounded ml-auto"></div>
    </div>
    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0 border-4 border-white"></div>
    <div className="flex-1 pt-1 pb-4">
      <div className="w-24 h-4 bg-slate-100 animate-pulse rounded mb-1"></div>
      <div className="w-32 h-3 bg-slate-100 animate-pulse rounded"></div>
    </div>
  </div>
);

export default function RecentActivity({ isLoading, activities }) {
  const getIcon = (action) => {
    const lowerAction = (action || "").toLowerCase();
    if (lowerAction.includes("call")) return <PhoneCall size={16} />;
    if (lowerAction.includes("doc")) return <FileText size={16} />;
    if (lowerAction.includes("follow")) return <CalendarClock size={16} />;
    if (lowerAction.includes("status")) return <CheckCircle2 size={16} />;
    return <History size={16} />;
  };

  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <h2 className="text-[20px] font-[600] text-gray-900 mb-6">Recent Activities</h2>
        <div className="flex-1 relative mt-2 pl-4">
          <div className="absolute left-[31px] top-4 bottom-4 w-px bg-slate-100"></div>
          <div className="space-y-6 relative z-10">
            {[...Array(3)].map((_, i) => <ActivitySkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  const displayActivities = Array.isArray(activities) ? activities : [];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[600] text-gray-900">Recent Activities</h2>
        {displayActivities.length > 0 && (
          <button className="text-xs font-[600] text-[#7A1F2B] hover:text-[#5c1620] uppercase tracking-wider transition-colors outline-none focus:ring-2 focus:ring-[#7A1F2B] rounded">
            View All
          </button>
        )}
      </div>

      <div className="flex-1 relative mt-2">
        {displayActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-6">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <History className="text-slate-300" size={24} />
            </div>
            <p className="font-[600] text-gray-900">No recent activity</p>
            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Actions you take will appear here.</p>
          </div>
        ) : (
          <div className="pl-4 h-[300px] overflow-y-auto custom-scrollbar pr-2">
            {/* Vertical Line */}
            <div className="absolute left-[31px] top-4 bottom-4 w-px bg-slate-200"></div>

            <div className="space-y-6 relative z-10">
              {displayActivities.map((item, index) => (
                <div key={item.id || index} className="flex gap-4 group">
                  <div className="w-[45px] text-right pt-2 shrink-0">
                    <span className="text-[10px] font-[600] text-slate-500 group-hover:text-[#7A1F2B] transition-colors">{item.time}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 border-4 border-white bg-slate-50 text-slate-600 group-hover:bg-[#7A1F2B]/10 group-hover:text-[#7A1F2B] transition-all">
                    {getIcon(item.action)}
                  </div>

                  <div className="flex-1 pt-1 pb-4 border-b border-slate-50 last:border-0 min-w-0">
                    <p className="text-sm font-[600] text-gray-900 truncate">
                      {item.action} <span className="font-normal text-gray-500">for</span> {item.leadName}
                    </p>
                    {item.status && (
                      <p className="text-xs font-[500] text-[#7A1F2B] bg-[#7A1F2B]/5 inline-block px-2 py-0.5 rounded-sm mt-1 border border-[#7A1F2B]/10">
                        {item.status}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
