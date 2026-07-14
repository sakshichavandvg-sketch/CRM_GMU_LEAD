import { activities } from "@/config/dashboardTables";

export default function ActivityTimeline() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="font-outfit text-2xl font-semibold">
        Recent Activity
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Latest system updates
      </p>

      <div className="space-y-1">

        {activities.map((activity, index) => (

          <div
            key={index}
            className="flex items-start gap-4 border-b border-gray-100 py-5 last:border-none"
          >

            <div
              className={`mt-2 h-3 w-3 rounded-full ${activity.color}`}
            />

            <div className="flex-1">

              <div className="flex items-center justify-between">

                <h3 className="font-semibold">
                  {activity.title}
                </h3>

                <span className="text-xs text-gray-400">
                  {activity.time}
                </span>

              </div>

              <p className="mt-2 text-sm text-gray-500">
                {activity.description}
              </p>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}