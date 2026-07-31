import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Target, CheckCircle2, PhoneCall, Heart, GraduationCap, ChevronRight, Headset } from "lucide-react";
import Link from "next/link";

const GoalSkeleton = () => (
  <div className="flex items-center justify-between h-full w-full gap-6">
    <div className="flex flex-col gap-6 w-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
        <div className="w-32 h-6 bg-gray-100 animate-pulse rounded"></div>
      </div>
      <div className="flex gap-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="w-6 h-6 bg-gray-100 animate-pulse rounded-full"></div>
            <div className="w-12 h-6 bg-gray-100 animate-pulse rounded"></div>
            <div className="w-16 h-3 bg-gray-100 animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
    <div className="w-24 h-24 bg-gray-100 rounded-full animate-pulse shrink-0"></div>
    <div className="w-32 h-12 bg-gray-100 rounded animate-pulse"></div>
  </div>
);

export default function TodayGoalGauge({ isLoading, summary }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-4 flex flex-col h-full w-full justify-center">
        <GoalSkeleton />
      </div>
    );
  }

  const goal = summary?.goal || 100;
  const completed = summary?.callsToday || 0;
  const connected = summary?.connected || 0;
  const interested = summary?.interested || 0;
  const admissions = summary?.admissions || 0;

  const safeGoal = Math.max(1, goal);
  const percentage = Math.min(100, Math.round((completed / safeGoal) * 100));

  const chartData = [
    { name: "Goal", value: percentage, fill: "#8B1538" }
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[16px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] p-4 flex flex-col justify-between h-auto min-h-[110px]">
      
      {/* Top Section */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#8B1538]/10 flex items-center justify-center text-[#8B1538]">
            <Target size={20} strokeWidth={2.5} />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Today's Mission</h2>
        </div>
      </div>
      
      <div className="flex items-center justify-between gap-2 flex-1">
        
        {/* Metrics Row (Left side) */}
        <div className="flex flex-row items-center justify-between gap-2 flex-nowrap w-full pr-2">
          <div className="flex flex-col group transition-all duration-300 hover:-translate-y-0.5 min-w-[48px]">
            <div className="flex items-center gap-1.5 mb-1">
              <PhoneCall size={16} className="text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{safeGoal}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Target</span>
          </div>
          
          <div className="flex flex-col group transition-all duration-300 hover:-translate-y-0.5 min-w-[48px]">
            <div className="flex items-center gap-1.5 mb-1">
              <CheckCircle2 size={16} className="text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{completed}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Done</span>
          </div>

          <div className="flex flex-col group transition-all duration-300 hover:-translate-y-0.5 min-w-[48px]">
            <div className="flex items-center gap-1.5 mb-1">
              <Headset size={16} className="text-[#8B1538]" />
              <span className="text-2xl font-bold text-gray-900">{connected}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Conn.</span>
          </div>

          <div className="flex flex-col group transition-all duration-300 hover:-translate-y-0.5 min-w-[48px]">
            <div className="flex items-center gap-1.5 mb-1">
              <Heart size={16} className="text-pink-500" />
              <span className="text-2xl font-bold text-gray-900">{interested}</span>
            </div>
            <span className="text-[11px] text-gray-500 font-medium">Interest</span>
          </div>
        </div>
        
        {/* Progress Ring & Summary (Right side) */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="relative w-16 h-16 flex items-center justify-center group transition-all duration-300 hover:-translate-y-0.5">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart 
                cx="50%" 
                cy="50%" 
                innerRadius="75%" 
                outerRadius="100%" 
                barSize={6} 
                data={chartData}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar
                  background={{ fill: "#F1F5F9" }}
                  dataKey="value"
                  cornerRadius={10}
                />
              </RadialBarChart>
            </ResponsiveContainer>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="block text-sm font-bold text-gray-900 leading-none">{percentage}%</span>
            </div>
          </div>
          <div className="flex flex-col justify-center text-left">
            <p className="text-[11px] font-semibold text-gray-900">{completed} / {safeGoal} calls</p>
            <Link href="/telecaller/calls?date=today" className="mt-1 text-[10px] font-bold text-[#8B1538] hover:text-[#6F102D] flex items-center justify-center gap-0.5 group transition-colors uppercase tracking-wider">
              View <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}
