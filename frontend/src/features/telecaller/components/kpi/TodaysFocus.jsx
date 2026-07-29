import { Flame, AlertTriangle, PhoneForwarded, Target } from "lucide-react";
import Link from "next/link";

const FocusItemSkeleton = () => (
  <div className="flex items-center justify-between p-4 rounded-xl border border-[#ECECEC] bg-white">
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse shrink-0"></div>
      <div className="w-32 h-5 bg-slate-100 animate-pulse rounded"></div>
    </div>
    <div className="w-8 h-8 rounded-lg bg-slate-100 animate-pulse"></div>
  </div>
);

const FocusItem = ({ icon: Icon, title, count, colorClass, link }) => {
  return (
    <Link href={link} className="block">
      <div className="flex items-center justify-between p-4 rounded-xl border border-[#ECECEC] hover:border-gray-300 bg-white hover:bg-slate-50 transition-colors group cursor-pointer">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${colorClass} group-hover:scale-110 transition-transform`}>
            <Icon size={20} strokeWidth={2} />
          </div>
          <span className="text-gray-700 font-[500]">{title}</span>
        </div>
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-100 text-gray-900 font-bold group-hover:bg-gray-200 transition-colors">
          {count}
        </div>
      </div>
    </Link>
  );
};

export default function TodaysFocus({ isLoading, focus }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full">
        <h2 className="text-[20px] font-[600] text-gray-900 mb-6 flex items-center gap-2">
          Today's Focus
        </h2>
        <div className="space-y-3">
          {[...Array(4)].map((_, i) => <FocusItemSkeleton key={i} />)}
        </div>
      </div>
    );
  }

  if (!focus) return null;

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 h-full">
      <h2 className="text-[20px] font-[600] text-gray-900 mb-6 flex items-center gap-2">
        Today's Focus
      </h2>
      
      <div className="space-y-3">
        <FocusItem 
          icon={Flame} 
          title="High Priority Leads" 
          count={focus.highPriority}
          colorClass="bg-[#7A1F2B]/10 text-[#7A1F2B]" // Maroon theme
          link="/telecaller/leads?priority=high"
        />
        <FocusItem 
          icon={AlertTriangle} 
          title="Overdue Followups" 
          count={focus.overdueFollowups}
          colorClass="bg-orange-100 text-orange-600"
          link="/telecaller/followups?status=overdue"
        />
        <FocusItem 
          icon={PhoneForwarded} 
          title="Calls Remaining" 
          count={focus.callsRemaining}
          colorClass="bg-blue-100 text-blue-600"
          link="/telecaller/calls?status=pending"
        />
        <FocusItem 
          icon={Target} 
          title="Near Conversion" 
          count={focus.nearConversion}
          colorClass="bg-green-100 text-green-600"
          link="/telecaller/leads?stage=documents"
        />
      </div>
    </div>
  );
}
