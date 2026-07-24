import { AlertCircle, Book, Headset, MoreHorizontal } from "lucide-react";

export default function RecentLeadsTable({ recentLeads }) {
  if (recentLeads?.error) {
    return (
      <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <AlertCircle className="mb-2 text-red-500" size={24} />
        <p className="text-sm text-gray-500">Failed to load recent leads</p>
      </div>
    );
  }

  const data = recentLeads?.data || [];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">
      
      {/* Header */}
      <div className="border-b border-gray-200 p-6">
        <h2 className="mb-1 font-outfit text-2xl font-semibold">
          Recent Leads
        </h2>
        <p className="text-sm text-gray-500">
          Latest lead activities
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 bg-gray-50/50 px-6 py-3">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Filter By Status:</span>
          <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none hover:border-gray-300">
            <option>All</option>
          </select>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort By:</span>
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none hover:border-gray-300">
              <option>Status</option>
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort By:</span>
            <select className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none hover:border-gray-300">
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-3 p-6 bg-gray-50/30">
        {data.length === 0 ? (
          <p className="py-8 text-center text-sm text-gray-500">No recent leads found.</p>
        ) : (
          data.map((lead) => (
            <div 
              key={lead.id} 
              className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-[18px] shadow-sm transition-all hover:border-[#8B2332] hover:shadow-md"
            >
              {/* Section 1: Avatar + Name */}
              <div className="flex w-full items-center gap-3 md:w-[220px]">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#8B2332]/10 font-semibold text-[#8B2332]">
                  {lead.student ? lead.student.charAt(0).toUpperCase() : "?"}
                </div>
                <span className="font-medium text-gray-900 truncate" title={lead.student}>{lead.student || "Unknown"}</span>
              </div>

              {/* Section 2: Course */}
              <div className="flex w-full items-center gap-3 md:w-[160px]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors group-hover:bg-[#8B2332]/5 group-hover:text-[#8B2332]">
                  <Book size={16} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Course</span>
                  <span className="truncate text-sm font-medium text-gray-700" title={lead.course}>{lead.course || "Not Assigned"}</span>
                </div>
              </div>

              {/* Section 3: Assigned */}
              <div className="flex w-full items-center gap-3 md:w-[160px]">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500 transition-colors group-hover:bg-[#8B2332]/5 group-hover:text-[#8B2332]">
                  <Headset size={16} />
                </div>
                <div className="flex flex-col overflow-hidden">
                  <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400">Assigned</span>
                  <span className="truncate text-sm font-medium text-gray-700" title={lead.assignedTo}>{lead.assignedTo || "Auto Test"}</span>
                </div>
              </div>

              {/* Section 4: Badges */}
              <div className="flex w-full items-center gap-2 md:w-auto">
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  (lead.status || "").toLowerCase().includes("enquiry") || lead.status === "New"
                    ? "bg-blue-50 text-blue-700"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {lead.status || "UNKNOWN"}
                </span>
                <span className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider ${
                  lead.priority === "Hot"
                    ? "bg-red-50 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}>
                  {lead.priority || "NORMAL"}
                </span>
              </div>

              {/* Section 5: Actions */}
              <div className="flex items-center justify-end">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700">
                  <MoreHorizontal size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
}