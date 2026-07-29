import React from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

export function MetricCard({ 
  value, 
  title, 
  subtitle, 
  trend, 
  trendLabel, 
  icon: Icon, 
  variant = "blue" // "blue" | "orange"
}) {
  const isPositiveTrend = trend > 0;
  const isNeutralTrend = trend === 0;

  let TrendIcon = TrendingUp;
  if (!isPositiveTrend && !isNeutralTrend) TrendIcon = TrendingDown;
  if (isNeutralTrend) TrendIcon = Minus;

  const colorStyles = {
    blue: {
      bg: "bg-blue-50/50",
      iconBg: "bg-blue-100 text-blue-600",
      trendBg: isPositiveTrend ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-blue-50 text-blue-700 border-blue-100"
    },
    orange: {
      bg: "bg-orange-50/50",
      iconBg: "bg-orange-100 text-orange-600",
      trendBg: isPositiveTrend ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-orange-50 text-orange-700 border-orange-100"
    }
  }[variant];

  return (
    <div className={`rounded-[20px] border border-[#ECECEC] p-6 shadow-sm flex items-center justify-between transition-all hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:border-gray-300 ${colorStyles.bg}`}>
      <div className="flex items-center gap-4">
        {Icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorStyles.iconBg}`}>
            <Icon size={24} strokeWidth={2.5} />
          </div>
        )}
        <div className="flex flex-col">
          <p className="text-[14px] font-[600] text-slate-500 tracking-wide mb-1">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-[700] text-gray-900 leading-none">{value}</h3>
            {subtitle && (
              <span className="text-[12px] font-[500] text-slate-500">{subtitle}</span>
            )}
          </div>
        </div>
      </div>
      
      {(trend !== undefined || trendLabel) && (
        <div className="flex flex-col items-end gap-1">
          {trend !== undefined && (
            <span className={`text-[12px] font-[600] border px-2 py-0.5 rounded-md flex items-center gap-1 ${colorStyles.trendBg}`}>
              <TrendIcon size={14} strokeWidth={3} /> {Math.abs(trend)}
            </span>
          )}
          {trendLabel && (
            <span className="text-[11px] font-[500] text-slate-400">{trendLabel}</span>
          )}
        </div>
      )}
    </div>
  );
}
