import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Clock } from "lucide-react";

const AnalyticsSkeleton = () => (
  <div className="flex-1 w-full h-[200px] bg-gray-50 animate-pulse rounded-lg mt-4 border border-gray-100"></div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900 px-4 py-3 rounded-xl shadow-xl border border-gray-800 text-white">
        <p className="font-semibold text-gray-100 mb-2">{label}</p>
        <p className="flex items-center justify-between gap-6 text-sm font-semibold">
          <span className="text-gray-400 font-medium">Calls</span>
          <span className="text-[#8B1538]">{payload[0]?.value || 0}</span>
        </p>
        {payload[1] && (
          <p className="flex items-center justify-between gap-6 text-sm font-semibold mt-1">
            <span className="text-gray-400 font-medium">Interested</span>
            <span className="text-[#F97316]">{payload[1].value}</span>
          </p>
        )}
      </div>
    );
  }
  return null;
}

export default function AnalyticsTrends({ isLoading, analytics }) {
  // Memoize data transformation for performance
  const chartData = useMemo(() => {
    if (!Array.isArray(analytics)) return [];
    return analytics.map(item => {
      const dateObj = new Date(item.date);
      const dayStr = isNaN(dateObj.getTime()) 
        ? item.date 
        : dateObj.toLocaleDateString("en-US", { weekday: "short" });
        
      return {
        day: dayStr,
        calls: item.calls || 0,
        interested: item.interested || 0
      };
    });
  }, [analytics]);

  if (isLoading) {
    return (
      <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.06)] p-5 flex flex-col h-full min-h-[250px]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
            <Clock size={20} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 leading-tight">Best Time to Call</h2>
            <p className="text-xs text-gray-500 font-medium">Based on recent connection rates</p>
          </div>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(15,23,42,0.06)] hover:shadow-md transition-all duration-300 p-5 flex flex-col h-full min-h-[250px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#8B1538]/10 flex items-center justify-center text-[#8B1538]">
          <Clock size={20} />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900 leading-tight">Best Time to Call</h2>
          <p className="text-xs text-gray-500 font-medium">Based on recent connection rates</p>
        </div>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-gray-500 font-medium">
          No analytics data available.
        </div>
      ) : (
        <div className="flex-1 w-full mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={2}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B1538" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#8B1538" stopOpacity={0.6}/>
                </linearGradient>
                <linearGradient id="colorInterested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F97316" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#F97316" stopOpacity={0.6}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#F1F5F9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} 
                dy={12}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 12, fill: '#94A3B8', fontWeight: 600 }} 
                dx={-10}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: '#F8FAFC' }} />
              <Bar 
                dataKey="calls" 
                fill="url(#colorCalls)" 
                radius={[4, 4, 0, 0]} 
                barSize={12}
              />
              <Bar 
                dataKey="interested" 
                fill="url(#colorInterested)" 
                radius={[4, 4, 0, 0]} 
                barSize={12}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
