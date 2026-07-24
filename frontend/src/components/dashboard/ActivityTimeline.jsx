import { AlertCircle, Activity } from "lucide-react";

export default function ActivityTimeline({ timeline }) {
  const error = timeline?.error;
  const data = timeline?.data || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="mb-5">
        <h2 className="mb-1 font-outfit text-2xl font-semibold">
          Recent Activity
        </h2>
        <p className="text-sm text-gray-500">
          Latest system updates
        </p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <AlertCircle className="mb-2 text-red-500" size={24} />
          <p className="text-sm text-gray-500">Unable to load activity</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Activity className="mb-2 text-gray-300" size={32} />
          <p className="text-sm text-gray-500">No recent activity</p>
        </div>
      ) : (
        <div className="space-y-1">
          {data.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border-b border-gray-100 py-[18px] last:border-none"
            >
              <div
                className={`mt-1.5 h-3 w-3 rounded-full ${activity.color}`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    {activity.title}
                  </h3>
                  <span className="text-xs text-gray-400">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}