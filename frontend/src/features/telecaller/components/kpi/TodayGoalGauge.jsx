import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";

const GoalSkeleton = () => (
  <div className="flex flex-col h-[200px] items-center justify-center">
    <div className="w-[180px] h-[90px] bg-slate-100 rounded-t-full animate-pulse border-b-0"></div>
    <div className="grid grid-cols-2 gap-8 mt-6">
      <div className="w-16 h-8 bg-slate-100 rounded animate-pulse"></div>
      <div className="w-16 h-8 bg-slate-100 rounded animate-pulse"></div>
    </div>
  </div>
);

export default function TodayGoalGauge({ isLoading, goal = 350, completed = 0 }) {
  if (isLoading) {
    return (
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full">
        <h2 className="text-[20px] font-[600] text-gray-900 mb-6">Today's Goal</h2>
        <GoalSkeleton />
      </div>
    );
  }

  const safeGoal = Math.max(1, goal);
  const percentage = Math.min(100, Math.round((completed / safeGoal) * 100));

  const chartData = [
    { name: "Goal", value: percentage, fill: "#7A1F2B" }
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full">
      <h2 className="text-[20px] font-[600] text-gray-900 mb-6">Today's Goal</h2>
      
      <div className="relative h-[200px] w-full flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart 
            cx="50%" 
            cy="50%" 
            innerRadius="75%" 
            outerRadius="100%" 
            barSize={16} 
            data={chartData}
            startAngle={180}
            endAngle={0}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
            <RadialBar
              background={{ fill: "#f1f5f9" }}
              dataKey="value"
              cornerRadius={10}
            />
          </RadialBarChart>
        </ResponsiveContainer>
        
        <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
          <span className="block text-4xl font-bold text-gray-900 leading-none">{percentage}%</span>
          <span className="block text-sm text-slate-500 font-[500] mt-1">Goal Reached</span>
        </div>
      </div>
      
      <div className="flex justify-center gap-12 mt-2">
        <div className="text-center">
          <span className="block text-2xl font-bold text-[#2563EB]">{completed}</span>
          <span className="block text-xs font-[500] text-slate-500">Completed</span>
        </div>
        <div className="text-center">
          <span className="block text-2xl font-bold text-[#7A1F2B]">{safeGoal}</span>
          <span className="block text-xs font-[500] text-slate-500">Target Calls</span>
        </div>
      </div>
    </div>
  );
}
