import { PhoneCall, CalendarClock } from "lucide-react";
import Button from "@/components/ui/Button";

const colors = ['bg-blue-500', 'bg-orange-500', 'bg-emerald-500', 'bg-purple-500', 'bg-pink-500'];

const FollowupSkeleton = () => (
  <div className="relative group mb-4">
    <div className="absolute -left-[25px] top-4 w-2.5 h-2.5 rounded-full bg-gray-200 ring-4 ring-white"></div>
    <div className="flex items-center justify-between p-3 bg-white rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex flex-col gap-2">
        <div className="w-16 h-3 bg-gray-100 animate-pulse rounded"></div>
        <div className="w-24 h-4 bg-gray-100 animate-pulse rounded"></div>
      </div>
      <div className="w-16 h-8 bg-gray-100 animate-pulse rounded-full"></div>
    </div>
  </div>
);

export default function UpcomingFollowups({ isLoading, followups = [] }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Follow-ups Due Today</h2>
        </div>
        <div className="flex-1 overflow-hidden relative">
          <div className="absolute border-l border-gray-100 left-[9px] top-0 bottom-0"></div>
          <div className="relative ml-2 pl-4 py-1">
            {[...Array(3)].map((_, i) => <FollowupSkeleton key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  const displayFollowups = Array.isArray(followups) ? followups : [];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Follow-ups Due Today</h2>
        <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {displayFollowups.length} remaining
        </span>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative">
        {displayFollowups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 py-6">
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3">
              <CalendarClock className="text-gray-300" size={28} />
            </div>
            <p className="text-sm font-medium text-gray-900">No follow-ups today</p>
            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Enjoy your free schedule 🎉</p>
          </div>
        ) : (
          <div className="relative ml-2">
            <div className="absolute border-l-2 border-gray-100 left-[1px] top-2 bottom-4"></div>
            <div className="space-y-4 pl-5 py-1">
              {displayFollowups.map((item, index) => {
                const dotColor = colors[index % colors.length];
                return (
                  <div key={item.id} className="relative group">
                    <div className={`absolute -left-[26px] top-4 w-2.5 h-2.5 rounded-full ${dotColor} ring-4 ring-white group-hover:scale-125 transition-transform`}></div>
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow hover:border-gray-200 transition-all group-hover:-translate-y-0.5 cursor-pointer">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{item.time?.split(' ')[0] || 'N/A'}</span>
                        <span className="text-sm font-semibold text-gray-900 mt-0.5 truncate max-w-[120px]">{item.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-[#8B1538] bg-white border border-gray-200 hover:bg-[#8B1538] hover:text-white hover:border-[#8B1538] rounded-full px-4 shadow-sm transition-all"
                      >
                        CALL
                      </Button>
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
