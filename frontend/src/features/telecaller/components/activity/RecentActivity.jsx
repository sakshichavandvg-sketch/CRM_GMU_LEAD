import { History, ChevronRight } from "lucide-react";

const ActivitySkeleton = () => (
  <div className="flex gap-4 group mt-2">
    <div className="w-[40px] text-right pt-1 shrink-0">
      <div className="w-8 h-3 bg-gray-100 animate-pulse rounded ml-auto"></div>
    </div>
    <div className="w-3 h-3 rounded-full bg-gray-100 animate-pulse shrink-0 border-2 border-white mt-1"></div>
    <div className="flex-1 pb-4">
      <div className="w-3/4 h-4 bg-gray-100 animate-pulse rounded mb-2"></div>
      <div className="w-16 h-4 bg-gray-100 animate-pulse rounded"></div>
    </div>
  </div>
);

export default function RecentActivity({ isLoading, activities }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col min-h-[220px]">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h2>
        <div className="flex-1 relative pl-2">
          <div className="absolute left-[62px] top-4 bottom-4 w-px bg-gray-100"></div>
          <div className="space-y-2 relative z-10">
            {[...Array(4)].map((_, i) => <ActivitySkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  const displayActivities = Array.isArray(activities) ? activities : [];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col min-h-[220px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
        {displayActivities.length > 0 && (
          <button className="flex items-center text-xs font-semibold text-[#8B1538] hover:text-[#6F102D] transition-colors outline-none focus:ring-2 focus:ring-[#8B1538] rounded group">
            View All <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      <div className="flex-1 relative">
        {displayActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-4">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <History className="text-gray-300" size={24} />
            </div>
            <p className="font-semibold text-gray-900">No recent activity</p>
            <p className="text-xs mt-1">Actions you take will appear here.</p>
          </div>
        ) : (
          <div className="pl-1 max-h-[220px] overflow-y-auto custom-scrollbar pr-2">
            {/* Vertical Line */}
            <div className="absolute left-[61px] top-3 bottom-4 w-px bg-gray-100"></div>

            <div className="space-y-1 relative z-10">
              {displayActivities.map((item, index) => {
                const isLast = index === displayActivities.length - 1;
                
                return (
                  <div key={item.id || index} className="flex gap-4 group hover:bg-gray-50 p-2 rounded-xl transition-colors cursor-pointer">
                    <div className="w-[42px] text-right pt-0.5 shrink-0">
                      <span className="text-[10px] font-bold text-gray-400 group-hover:text-[#8B1538] transition-colors">{item.time}</span>
                    </div>
                    
                    <div className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0 border-2 border-white bg-[#8B1538] shadow-sm group-hover:scale-125 transition-transform"></div>

                    <div className={`flex-1 pb-3 ${!isLast ? 'border-b border-gray-100 group-hover:border-transparent transition-colors' : ''} min-w-0`}>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.action} <span className="font-normal text-gray-500">for</span> {item.leadName}
                      </p>
                      {item.status && (
                        <span className="inline-block px-2 py-0.5 mt-1.5 text-[10px] font-bold tracking-wide uppercase text-[#8B1538] bg-[#8B1538]/5 border border-[#8B1538]/10 rounded-sm">
                          {item.status}
                        </span>
                      )}
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
