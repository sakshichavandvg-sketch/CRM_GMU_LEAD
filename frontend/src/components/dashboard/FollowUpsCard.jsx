import { AlertCircle, Calendar } from "lucide-react";

export default function FollowUpsCard({ followups }) {
  const upcomingError = followups?.upcoming?.error;
  const overdueError = followups?.overdue?.error;
  const data = followups?.upcoming?.data || [];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="mb-5">
        <h2 className="mb-1 text-xl font-semibold">
          Today's Follow-ups
        </h2>
        <p className="text-sm text-gray-500">
          Scheduled for today
        </p>
      </div>

      {upcomingError || overdueError ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <AlertCircle className="mb-2 text-red-500" size={24} />
          <p className="text-sm text-gray-500">Unable to load follow-ups</p>
        </div>
      ) : data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <Calendar className="mb-2 text-gray-300" size={32} />
          <p className="text-sm text-gray-500">No follow-ups scheduled today</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-100 p-4 transition-colors hover:bg-gray-50/50"
            >
              <h3 className="font-semibold">
                {item.student}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {item.course}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {item.time}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium uppercase tracking-wider ${
                    item.priority === "High"
                      ? "bg-red-50 text-red-600"
                      : item.priority === "Medium"
                      ? "bg-orange-50 text-orange-600"
                      : "bg-green-50 text-green-600"
                  }`}
                >
                  {item.priority}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}