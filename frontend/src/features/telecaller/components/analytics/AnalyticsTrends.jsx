import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { ChevronDown } from "lucide-react";

const AnalyticsSkeleton = () => (
  <div className="flex-1 w-full h-[250px] bg-slate-50 animate-pulse rounded-lg mt-4 border border-[#ECECEC]"></div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white px-4 py-3 rounded-xl shadow-lg border border-[#ECECEC]">
        <p className="font-[600] text-gray-900 mb-2">{label}</p>
        <p className="flex items-center justify-between gap-4 text-sm font-bold text-[#7A1F2B]">
          <span>Calls</span>
          <span>{payload[0].value}</span>
        </p>
        <p className="flex items-center justify-between gap-4 text-sm font-bold text-[#F97316] mt-1">
          <span>Interested</span>
          <span>{payload[1].value}</span>
        </p>
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
      // Create a short day format from "YYYY-MM-DD" e.g., "Mon"
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
      <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 flex flex-col h-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-[20px] font-[600] text-gray-900">Daily Analytics</h2>
        </div>
        <AnalyticsSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 flex flex-col h-[400px]">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-[20px] font-[600] text-gray-900">Daily Analytics</h2>
        <button className="flex items-center gap-1.5 text-xs font-[600] text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg outline-none focus:ring-2 focus:ring-[#7A1F2B]">
          This Week <ChevronDown size={14} className="text-gray-500" />
        </button>
      </div>
      
      {chartData.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-slate-500 font-[500]">
          No analytics data available.
        </div>
      ) : (
        <div className="flex-1 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7A1F2B" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#7A1F2B" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInterested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F97316" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="day" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 13, fill: '#64748B', fontWeight: 500 }} 
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 13, fill: '#64748B', fontWeight: 500 }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="calls" 
                stroke="#7A1F2B" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorCalls)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#7A1F2B' }}
              />
              <Area 
                type="monotone" 
                dataKey="interested" 
                stroke="#F97316" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorInterested)" 
                activeDot={{ r: 6, strokeWidth: 0, fill: '#F97316' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
