import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const KPICardSkeleton = () => (
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

export function KPICard({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendDirection = "up", // "up", "down", "neutral"
  colorClass, 
  iconColorClass, 
  href 
}) {
  const renderTrend = () => {
    if (!trend) return null;
    
    let TrendIcon = TrendingUp;
    let trendColors = "text-emerald-700 bg-emerald-50 border-emerald-100";
    
    if (trendDirection === "down") {
      TrendIcon = TrendingDown;
      trendColors = "text-rose-700 bg-rose-50 border-rose-100";
    } else if (trendDirection === "neutral") {
      TrendIcon = Minus;
      trendColors = "text-slate-700 bg-slate-50 border-slate-200";
    }

    return (
      <span className={`text-[11px] font-[600] border px-2 py-0.5 rounded-md flex items-center gap-1 ${trendColors}`}>
        <TrendIcon size={12} strokeWidth={3} /> {trend}
      </span>
    );
  };

  const CardContent = (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-5 shadow-sm hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 transition-all duration-300 flex flex-col justify-between h-[130px] group cursor-pointer w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex flex-col">
          <p className="text-[13px] font-[600] text-slate-500 mb-1 tracking-wide">{title}</p>
          <p className="text-3xl font-[700] text-gray-900 leading-none truncate max-w-[150px]">{value}</p>
        </div>
        {Icon && (
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${colorClass} ${iconColorClass} transition-colors group-hover:scale-105 duration-300`}>
            <Icon size={20} strokeWidth={2.5} />
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-2 mt-auto">
        {renderTrend()}
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block outline-none focus:ring-2 focus:ring-[#7A1F2B] rounded-[20px] w-full">{CardContent}</Link>;
  }

  return CardContent;
}
