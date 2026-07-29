import { Users, PhoneCall, CalendarClock, Heart, CheckCircle2, Target, TrendingUp } from "lucide-react";
import Link from "next/link";

const KPICardSkeleton = () => (
  <div className="bg-white border border-[#ECECEC] rounded-[20px] p-5 shadow-sm flex flex-col h-[130px] justify-between">
    <div className="flex justify-between items-start w-full">
      <div className="flex flex-col gap-2 w-full">
        <div className="w-20 h-4 bg-slate-100 animate-pulse rounded"></div>
        <div className="w-16 h-8 bg-slate-100 animate-pulse rounded"></div>
      </div>
      <div className="w-10 h-10 rounded-xl bg-slate-100 animate-pulse shrink-0"></div>
    </div>
    <div className="w-24 h-5 bg-slate-100 animate-pulse rounded mt-auto"></div>
  </div>
);

const KPICard = ({ title, value, icon: Icon, trend, colorClass, iconColorClass, href }) => {
  const CardContent = (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-5 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-300 flex flex-col justify-between h-[130px] group cursor-pointer">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <p className="text-[13px] font-[600] text-slate-500 mb-1 tracking-wide">{title}</p>
          <p className="text-3xl font-[700] text-gray-900 leading-none">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass} ${iconColorClass} transition-colors group-hover:scale-105 duration-300`}>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
      
      <div className="flex items-center gap-2 mt-auto">
        <span className="text-[11px] font-[600] text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
          <TrendingUp size={12} strokeWidth={3} /> {trend}
        </span>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block outline-none focus:ring-2 focus:ring-[#7A1F2B] rounded-[20px]">{CardContent}</Link>;
  }

  return CardContent;
};

export default function KPISection({ isLoading, summary }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <KPICard 
        title="Assigned" 
        value={summary.assigned} 
        icon={Users} 
        trend="+12% Today"
        colorClass="bg-blue-50"
        iconColorClass="text-[#2563EB]"
        href="/telecaller/leads?status=ALL"
      />
      <KPICard 
        title="Calls Today" 
        value={summary.callsToday} 
        icon={PhoneCall} 
        trend="+18% Today"
        colorClass="bg-orange-50"
        iconColorClass="text-[#F97316]"
        href="/telecaller/calls?date=today"
      />
      <KPICard 
        title="Connected" 
        value={summary.connected} 
        icon={PhoneCall} 
        trend="+5% Today"
        colorClass="bg-[#7A1F2B]/10"
        iconColorClass="text-[#7A1F2B]" // Maroon
        href="/telecaller/calls?status=CONNECTED"
      />
      <KPICard 
        title="Interested" 
        value={summary.interested} 
        icon={Heart} 
        trend="+5% Today"
        colorClass="bg-pink-50"
        iconColorClass="text-[#EC4899]"
        href="/telecaller/leads?status=INTERESTED"
      />
      <KPICard 
        title="Admissions" 
        value={summary.admissions} 
        icon={CheckCircle2} 
        trend="+2 This Week"
        colorClass="bg-green-50"
        iconColorClass="text-[#16A34A]"
        href="/telecaller/leads?status=ADMISSION"
      />
      <KPICard 
        title="Goal %" 
        value={`${summary.goal}%`} 
        icon={Target} 
        trend="On Track"
        colorClass="bg-[#C6943D]/10"
        iconColorClass="text-[#C6943D]" // Gold
      />
    </div>
  );
}
