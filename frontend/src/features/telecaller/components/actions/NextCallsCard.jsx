import { PhoneCall } from "lucide-react";
import Button from "@/components/ui/Button";
import CallButton from "@/features/telecaller/voice/components/CallButton";

const NextCallSkeleton = () => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-[#ECECEC] bg-white">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0"></div>
      <div className="flex flex-col gap-2">
        <div className="w-24 h-4 bg-slate-100 animate-pulse rounded"></div>
        <div className="w-16 h-3 bg-slate-100 animate-pulse rounded"></div>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0"></div>
  </div>
);

export default function NextCallsCard({ isLoading, nextCalls, onLogCall }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-[20px] font-[600] text-gray-900">Next Calls</h2>
        </div>
        <div className="space-y-3 flex-1">
          {[...Array(4)].map((_, i) => <NextCallSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[600] text-gray-900">Next Calls</h2>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
          {nextCalls?.length || 0} Priority
        </span>
      </div>
      
      {!nextCalls || nextCalls.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-6">
          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
            <PhoneCall className="text-slate-300" size={24} />
          </div>
          <p className="text-sm font-[500] text-gray-900">All caught up!</p>
          <p className="text-xs text-gray-500 mt-1 max-w-[200px]">No priority calls pending in your queue right now.</p>
        </div>
      ) : (
        <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {nextCalls.map((call) => (
            <div key={call.id} className="flex items-center justify-between p-3 rounded-xl border border-[#ECECEC] hover:border-gray-300 bg-white hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {call.name.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-[600] text-gray-900 truncate">{call.name}</span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded border border-orange-200">
                      {call.status}
                    </span>
                    <span className="text-xs text-gray-500 truncate">{call.time}</span>
                  </div>
                </div>
              </div>
              <CallButton
                enquiryNo={call.id}
                name={call.name}
                phone={call.phone}
                iconOnly={true}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
