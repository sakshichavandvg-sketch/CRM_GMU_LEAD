export default function PerformanceCard({ performance }) {
  // Use real data or fallback to dummy
  const stats = [
    { label: "Calls Made", value: 320, goal: 350, color: "bg-blue-600" },
    { label: "Interested Leads", value: 85, goal: 100, color: "bg-pink-500" },
    { label: "Admissions", value: 12, goal: 15, color: "bg-green-600" },
  ];

  return (
    <div className="bg-white border border-slate-100 rounded-[20px] shadow-sm p-6 h-full flex flex-col">
      <h2 className="text-[20px] font-semibold text-gray-900 mb-6">Weekly Performance</h2>
      
      <div className="flex-1 space-y-6">
        {stats.map((stat, idx) => {
          const percentage = Math.min(100, Math.round((stat.value / stat.goal) * 100));
          return (
            <div key={idx}>
              <div className="flex justify-between items-end mb-2">
                <span className="text-sm font-bold text-gray-800">{stat.label}</span>
                <span className="text-xs font-semibold text-slate-500">
                  <span className="text-gray-900">{stat.value}</span> / {stat.goal}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${stat.color}`}
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
