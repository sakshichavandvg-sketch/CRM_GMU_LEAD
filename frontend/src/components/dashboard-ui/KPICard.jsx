import React from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export const KpiCardSkeleton = () => (
  <div className="bg-white border border-gray-200 rounded-[20px] p-[24px] shadow-sm flex flex-col h-[156px] w-full">
    <div className="w-[60px] h-[28px] rounded-full bg-gray-100 animate-pulse mb-auto"></div>
    <div className="w-24 h-8 bg-gray-100 animate-pulse rounded mb-2"></div>
    <div className="w-16 h-4 bg-gray-100 animate-pulse rounded mb-1"></div>
    <div className="w-32 h-3 bg-gray-100 animate-pulse rounded mt-1"></div>
  </div>
);

export { KpiCardSkeleton as KPICardSkeleton };

export function KpiCard({ 
  title, 
  value, 
  subtitle,
  icon: Icon, 
  variant = "default", // default, primary, success, warning, danger, purple, blue, orange, cyan, info
  trend, 
  trendDirection = "neutral", // "up", "down", "neutral"
  loading = false,
  onClick,
  className = "",
  href 
}) {
  if (loading) return <KpiCardSkeleton />;

  // Display '0' or '—' for empty/invalid values
  const displayValue = (value === undefined || value === null || Number.isNaN(value)) ? "0" : value;

  const getVariantStyles = () => {
    switch (variant) {
      case "primary": return "bg-red-50 text-red-600";
      case "success": return "bg-emerald-50 text-emerald-600";
      case "warning":
      case "yellow": return "bg-yellow-50 text-yellow-600";
      case "danger": return "bg-rose-50 text-rose-600";
      case "purple": return "bg-purple-50 text-purple-600";
      case "info":
      case "blue": return "bg-blue-50 text-blue-600";
      case "orange": return "bg-orange-50 text-orange-600";
      case "cyan": return "bg-cyan-50 text-cyan-600";
      default: return "bg-gray-50 text-gray-600";
    }
  };

  const renderTrend = () => {
    let TrendIcon = TrendingUp;
    let trendColors = "text-emerald-600";
    
    if (trendDirection === "down") {
      TrendIcon = TrendingDown;
      trendColors = "text-rose-600";
    } else if (trendDirection === "neutral") {
      TrendIcon = Minus;
      trendColors = "text-gray-500";
    }

    return (
      <div className={`flex items-center gap-1 text-[12px] font-medium ${trendColors}`}>
        <TrendIcon size={12} strokeWidth={2.5} />
        <span>{trend}</span>
      </div>
    );
  };

  const CardContent = (
    <div 
      className={`bg-white border border-gray-200 rounded-[20px] p-[24px] shadow-sm flex flex-col h-[156px] w-full transition-all duration-200 
      ${(onClick || href) ? 'cursor-pointer hover:-translate-y-[2px] hover:shadow-md' : ''} ${className}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-auto">
        {Icon && (
          <div className={`w-[60px] h-[28px] rounded-full flex items-center justify-center shrink-0 ${getVariantStyles()}`}>
            <Icon size={18} strokeWidth={2} />
          </div>
        )}
      </div>

      <div className="flex flex-col mt-auto">
        <p className="text-[32px] font-semibold text-gray-900 leading-none mb-1 truncate">{displayValue}</p>
        <h3 className="text-[14px] font-medium text-gray-700 leading-tight mb-0.5 truncate">{title}</h3>
        
        <div className="flex items-center justify-between mt-1">
          <p className="text-[12px] text-gray-500 font-normal truncate max-w-[70%]">{subtitle}</p>
          {trend ? renderTrend() : <div className="h-[18px]"></div>}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block w-full outline-none focus:ring-2 focus:ring-primary rounded-[20px]">{CardContent}</Link>;
  }

  return CardContent;
}

export { KpiCard as KPICard };
export default KpiCard;
