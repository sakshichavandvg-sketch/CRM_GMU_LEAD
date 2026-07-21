import { LucideIcon } from "lucide-react";

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
      className={`
        relative overflow-hidden rounded-2xl bg-white p-6
        border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.02)]
      `}
    >
      {/* Subtle Tint Background */}
      <div 
        className={`absolute inset-0 opacity-30 ${isOrange ? "bg-orange-50" : "bg-blue-50"}`} 
      />

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
              shadow-sm
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
