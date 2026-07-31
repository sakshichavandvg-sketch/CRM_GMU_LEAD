import { Users, PhoneCall, Heart, CheckCircle2, Target, TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";

const KPICardSkeleton = () => (
  <div className="bg-white border border-[#ECECEC] rounded-[14px] p-4 flex flex-col h-auto min-h-[112px] justify-between">
    <div className="flex items-center gap-3 w-full">
      <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse shrink-0"></div>
      <div className="w-24 h-4 bg-gray-100 animate-pulse rounded"></div>
    </div>
    <div className="mt-auto flex flex-col pt-2">
      <div className="w-16 h-8 bg-gray-100 animate-pulse rounded"></div>
      <div className="w-20 h-3 bg-gray-100 animate-pulse rounded mt-2"></div>
    </div>
  </div>
);

const KPICard = ({ title, value, icon: Icon, trend, colorClass, iconColorClass, href }) => {
  const isNegative = trend.startsWith('-');
  const trendColor = isNegative ? 'text-red-600' : 'text-green-600';
  const TrendIcon = isNegative ? TrendingDown : TrendingUp;

  const CardContent = (
    <div className="bg-white border border-[#ECECEC] rounded-[14px] hover:shadow-sm transition-shadow p-4 flex flex-col h-auto min-h-[112px] justify-between group cursor-pointer overflow-hidden">
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${colorClass} ${iconColorClass} transition-colors group-hover:scale-110 duration-300`}>
          <Icon size={18} strokeWidth={2.5} />
        </div>
        <p className="text-sm font-medium text-gray-500 truncate">{title}</p>
      </div>
      
      <div className="mt-auto flex flex-col">
        <p className="text-3xl font-bold text-gray-900 leading-none">{value}</p>
        <div className="flex items-center gap-1.5 mt-2">
          <TrendIcon size={14} className={`${trendColor} shrink-0`} />
          <span className={`text-[11px] font-medium ${trendColor} truncate`}>{trend}</span>
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block outline-none focus:ring-2 focus:ring-[#8B1538] rounded-2xl">{CardContent}</Link>;
  }

  return CardContent;
};

export default function KPISection({ isLoading, summary }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {[...Array(6)].map((_, i) => <KPICardSkeleton key={i} />)}
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      <KPICard 
        title="Assigned" 
        value={summary.assigned} 
        icon={Users} 
        trend="+12% vs yesterday"
        colorClass="bg-blue-50"
        iconColorClass="text-blue-600"
        href="/telecaller/leads?status=ALL"
      />
      <KPICard 
        title="Calls Today" 
        value={summary.callsToday} 
        icon={PhoneCall} 
        trend="+18% vs yesterday"
        colorClass="bg-[#8B1538]/10"
        iconColorClass="text-[#8B1538]"
        href="/telecaller/calls?date=today"
      />
      <KPICard 
        title="Connected" 
        value={summary.connected} 
        icon={PhoneCall} 
        trend="+5% vs yesterday"
        colorClass="bg-green-50"
        iconColorClass="text-green-600"
        href="/telecaller/calls?status=CONNECTED"
      />
      <KPICard 
        title="Interested" 
        value={summary.interested} 
        icon={Heart} 
        trend="+5% vs yesterday"
        colorClass="bg-pink-50"
        iconColorClass="text-pink-600"
        href="/telecaller/leads?status=INTERESTED"
      />
      <KPICard 
        title="Admissions" 
        value={summary.admissions} 
        icon={CheckCircle2} 
        trend="+2 vs yesterday"
        colorClass="bg-purple-50"
        iconColorClass="text-purple-600"
        href="/telecaller/leads?status=ADMISSION"
      />
      <KPICard 
        title="Goal %" 
        value={`${summary.goal}%`} 
        icon={Target} 
        trend="On Track"
        colorClass="bg-emerald-50"
        iconColorClass="text-emerald-600"
      />
    </div>
  );
}
