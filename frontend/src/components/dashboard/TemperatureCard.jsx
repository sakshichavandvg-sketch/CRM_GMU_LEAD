import React from 'react';
import { LucideIcon } from "lucide-react";
import CRMGlassOverlay from '../crm/CRMGlassOverlay';
import { kpiTheme } from '../../styles/theme/kpi';

export default function TemperatureCard({
  value,
  title,
  subtitle,
  trend,
  trendLabel,
  icon: Icon,
  variant = "orange", // 'orange' or 'blue'
}) {
  const isOrange = variant === "orange";
  
  return (
    <div
      className="group relative overflow-hidden rounded-2xl p-6 transition-all duration-250 ease-out hover:-translate-y-[3px] [box-shadow:var(--shadow-base)] hover:[box-shadow:var(--shadow-hover)]"
      style={{
        background: isOrange ? kpiTheme.gradients.hotOrange : kpiTheme.gradients.coldBlue,
        borderLeft: isOrange ? kpiTheme.borders.hotLeft : kpiTheme.borders.coldLeft,
        borderTop: kpiTheme.borders.glass,
        borderRight: kpiTheme.borders.glass,
        borderBottom: kpiTheme.borders.glass,
        '--shadow-base': isOrange ? kpiTheme.shadows.hotBase : kpiTheme.shadows.coldBase,
        '--shadow-hover': isOrange ? kpiTheme.shadows.hotHover : kpiTheme.shadows.coldHover,
      }}
    >
      <CRMGlassOverlay className={isOrange ? "opacity-30 mix-blend-overlay" : "opacity-30 mix-blend-overlay"} />

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900">
              {value}
            </h2>
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-lg font-medium ${isOrange ? "text-orange-600" : "text-blue-600"}`}>
                {title}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-500 font-medium">
              {subtitle}
            </p>
          </div>
          
          {/* Glassmorphic Icon Container */}
          <div 
            className={`
              flex h-14 w-14 items-center justify-center rounded-full
              backdrop-blur-md bg-white/50 border border-white/40
              transition-all duration-250 ease-out
              group-hover:scale-110 group-hover:brightness-110
              ${isOrange ? "shadow-[0_0_15px_rgba(249,115,22,0.15)] text-orange-500" : "shadow-[0_0_15px_rgba(59,130,246,0.15)] text-blue-500"}
            `}
          >
            <Icon size={28} strokeWidth={1.5} />
          </div>
        </div>

        {trend && (
          <div className="mt-6 flex items-center gap-2 text-sm font-medium">
            <span className={trend >= 0 ? "text-emerald-600" : "text-rose-600"}>
              {trend >= 0 ? "+" : ""}{trend}
            </span>
            <span className="text-gray-400">{trendLabel}</span>
          </div>
        )}
      </div>
    </div>
  );
}
