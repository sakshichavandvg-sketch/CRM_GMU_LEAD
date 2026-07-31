import { PhoneCall, Star, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import CallButton from "@/features/telecaller/voice/components/CallButton";

const NextCallSkeleton = () => (
  <div className="flex flex-col p-4 rounded-xl border border-gray-200 bg-white mb-3">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-12 h-12 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
      <div className="flex flex-col gap-2">
        <div className="w-32 h-4 bg-gray-100 animate-pulse rounded"></div>
        <div className="w-20 h-3 bg-gray-100 animate-pulse rounded"></div>
      </div>
    </div>
    <div className="h-10 w-full bg-gray-100 animate-pulse rounded-full"></div>
  </div>
);

export default function NextCallsCard({ isLoading, nextCalls, onLogCall }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Next Best Lead</h2>
        </div>
        <div className="flex flex-col items-center justify-center text-center py-6">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <PhoneCall className="text-gray-300" size={28} />
          </div>
          <p className="text-sm font-medium text-gray-900">All caught up!</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px]">No priority calls pending in your queue right now.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 p-5 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500 fill-yellow-500" size={20} />
          <h2 className="text-lg font-semibold text-gray-900">Next Best Lead</h2>
        </div>
        <span className="text-xs font-semibold text-[#8B1538] bg-[#8B1538]/10 px-2.5 py-1 rounded-full">
          {nextCalls?.length || 0} Priority
        </span>
      </div>
      
      {!nextCalls || nextCalls.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-4 h-full">
          <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-3">
            <PhoneCall className="text-gray-300" size={28} />
          </div>
          <p className="text-sm font-medium text-gray-900">All caught up!</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px]">No priority calls pending in your queue right now.</p>
        </div>
      ) : (
        <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {nextCalls.map((call) => (
            <div key={call.id} className="flex flex-col p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-[#8B1538] text-white flex items-center justify-center font-bold text-lg shrink-0 shadow-sm">
                  {call.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-semibold text-gray-900 truncate">{call.name}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded-md">
                      {call.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500">
                    <Clock size={12} />
                    <span className="text-xs">{call.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-5 pt-4 border-t border-gray-200/60 flex items-center justify-end">
                <div className="w-full sm:w-auto">
                  <CallButton
                    enquiryNo={call.id}
                    name={call.name}
                    phone={call.phone}
                    className="w-full sm:w-auto rounded-full bg-[#8B1538] hover:bg-[#6F102D] text-white shadow-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
