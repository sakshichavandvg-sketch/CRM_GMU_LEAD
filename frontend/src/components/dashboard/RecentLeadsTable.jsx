import { recentLeads } from "@/config/dashboardTables";

export default function RecentLeadsTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

      <div className="border-b px-6 py-5">

        <h2 className="font-outfit text-2xl font-semibold">
          Recent Leads
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Latest lead activities
        </p>

      </div>

      <table className="w-full">

        <thead className="bg-gray-50">

          <tr className="text-left text-sm font-medium text-gray-500">

            <th className="px-6 py-3">Student</th>
            <th className="px-6 py-3">Course</th>
            <th className="px-6 py-3">Assigned</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Priority</th>

          </tr>

        </thead>

        <tbody>

          {recentLeads.map((lead) => (

            <tr
              key={lead.id}
              className="border-t transition hover:bg-gray-50"
            >

              <td className="px-6 py-4 font-medium">
                {lead.student}
              </td>

              <td className="px-6 py-4">
                {lead.course}
              </td>

              <td className="px-6 py-4">
                {lead.assignedTo}
              </td>

              <td className="px-6 py-4">

                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                  {lead.status}
                </span>

              </td>

              <td className="px-6 py-4">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    lead.priority === "Hot"
                      ? "bg-red-50 text-red-600"
                      : "bg-sky-50 text-sky-600"
                  }`}
                >
                  {lead.priority}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}