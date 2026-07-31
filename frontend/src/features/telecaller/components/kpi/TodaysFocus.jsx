import { Flame, AlertTriangle, PhoneForwarded, Target, ChevronRight } from "lucide-react";
import Link from "next/link";

const FocusItemSkeleton = () => (
  <div className="flex items-center justify-between p-3 rounded-xl border border-transparent bg-white">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
      <div className="w-32 h-5 bg-gray-100 animate-pulse rounded"></div>
    </div>
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-md bg-gray-100 animate-pulse"></div>
      <div className="w-4 h-4 rounded bg-gray-100 animate-pulse"></div>
    </div>
  </div>
);

const FocusItem = ({ icon: Icon, title, count, colorClass, link }) => {
  return (
    <Link href={link} className="block mb-1 outline-none">
      <div className="flex items-center justify-between p-3 rounded-2xl border border-transparent hover:border-gray-200 hover:bg-gray-50 transition-all duration-300 group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass} group-hover:scale-110 transition-transform duration-300`}>
            <Icon size={18} strokeWidth={2.5} />
          </div>
          <span className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors">{title}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm font-bold text-gray-900">{count}</span>
          <ChevronRight size={16} strokeWidth={2.5} className="text-gray-300 group-hover:text-[#8B1538] transition-colors" />
        </div>
      </div>
    </Link>
  );
};

export default function TodaysFocus({ isLoading, focus }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Your Inbox</h2>
        </div>
        <div className="space-y-1">
          {[...Array(4)].map((_, i) => <FocusItemSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!focus) return null;

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-6 flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Your Inbox</h2>
      </div>
      
      <div className="space-y-1 flex-1 overflow-y-auto pr-2 custom-scrollbar">
        <FocusItem 
          icon={Flame} 
          title="High Priority Leads" 
          count={focus.highPriority}
          colorClass="bg-[#8B1538]/10 text-[#8B1538]"
          link="/telecaller/leads?priority=high"
        />
        <FocusItem 
          icon={AlertTriangle} 
          title="Overdue Follow-ups" 
          count={focus.overdueFollowups}
          colorClass="bg-orange-50 text-orange-600"
          link="/telecaller/followups?status=overdue"
        />
        <FocusItem 
          icon={PhoneForwarded} 
          title="Calls Remaining" 
          count={focus.callsRemaining}
          colorClass="bg-blue-50 text-blue-600"
          link="/telecaller/calls?status=pending"
        />
        <FocusItem 
          icon={Target} 
          title="Near Conversion" 
          count={focus.nearConversion}
          colorClass="bg-green-50 text-green-600"
          link="/telecaller/leads?stage=documents"
        />
      </div>
    </div>
  );
}
