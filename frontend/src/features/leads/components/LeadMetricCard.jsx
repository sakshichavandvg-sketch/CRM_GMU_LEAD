export default function LeadMetricCard({ title, value, trend, icon: Icon, colorClass }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {Icon && (
          <div className={`p-2 rounded-lg ${colorClass}`}>
            <Icon size={18} />
          </div>
        )}
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        {trend && (
          <p className={`text-sm mt-2 font-medium ${trend.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
            {trend.positive ? '↑' : '↓'} {trend.value} <span className="text-gray-500 font-normal">vs last week</span>
          </p>
        )}
      </div>
    </div>
  );
}
