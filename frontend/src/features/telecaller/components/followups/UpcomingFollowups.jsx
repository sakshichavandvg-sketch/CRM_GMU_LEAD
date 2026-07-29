import { PhoneCall, CalendarClock } from "lucide-react";
import Button from "@/components/ui/Button";

const FollowupSkeleton = () => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-[#ECECEC] bg-white">
    <div className="flex items-center gap-3">
      <div className="w-12 text-right">
        <div className="w-10 h-4 bg-slate-100 animate-pulse rounded ml-auto"></div>
      </div>
      <div className="w-px h-8 bg-slate-200"></div>
      <div className="w-24 h-5 bg-slate-100 animate-pulse rounded"></div>
    </div>
    <div className="w-14 h-8 bg-slate-100 animate-pulse rounded-lg"></div>
  </div>
);

export default function UpcomingFollowups({ isLoading, followups = [] }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-[600] text-gray-900">Upcoming Followups</h2>
          <CalendarClock size={20} className="text-slate-400" />
        </div>
        <div className="flex-1 space-y-3 mt-2">
          {[...Array(3)].map((_, i) => <FollowupSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  // Safe fallback if followups isn't an array
  const displayFollowups = Array.isArray(followups) ? followups : [];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-[20px] font-[600] text-gray-900">Upcoming Followups</h2>
        <CalendarClock size={20} className="text-slate-400" />
      </div>

      <div className="flex-1 space-y-3 mt-2 overflow-y-auto pr-2 custom-scrollbar">
        {displayFollowups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 py-6">
            <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
              <CalendarClock className="text-slate-300" size={24} />
            </div>
            <p className="font-[600] text-gray-900">No followups today</p>
            <p className="text-xs text-gray-500 mt-1 max-w-[200px]">Enjoy your free schedule 🎉</p>
          </div>
        ) : (
          displayFollowups.map((item) => (
            <div key={item.id} className="flex items-center justify-between p-3 rounded-xl border border-[#ECECEC] bg-white hover:bg-[#7A1F2B]/5 hover:border-[#7A1F2B]/30 hover:shadow-sm transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-12 text-right">
                  <span className="text-xs font-[600] text-slate-600 group-hover:text-[#7A1F2B] transition-colors">{item.time?.split(' ')[0]}</span>
                </div>
                <div className="w-px h-8 bg-slate-200"></div>
                <div>
                  <p className="text-[15px] font-[600] text-gray-900 truncate max-w-[120px]">{item.name}</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-[#7A1F2B] hover:text-white hover:bg-[#7A1F2B] rounded-lg px-3 transition-colors outline-none focus:ring-2 focus:ring-[#7A1F2B]"
              >
                CALL
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
