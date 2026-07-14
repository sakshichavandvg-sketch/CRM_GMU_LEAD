import { followUps } from "@/config/dashboardTables";

export default function FollowUpsCard() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="text-xl font-semibold">
        Today's Follow-ups
      </h2>

      <p className="mb-6 text-sm text-gray-500">
        Scheduled for today
      </p>

      <div className="space-y-4">

        {followUps.map((item, index) => (

          <div
            key={index}
            className="rounded-xl border border-gray-100 p-4"
          >

            <h3 className="font-semibold">
              {item.student}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {item.course}
            </p>

            <div className="mt-4 flex items-center justify-between">

              <span className="text-sm">
                {item.time}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
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

    </div>
  );
}