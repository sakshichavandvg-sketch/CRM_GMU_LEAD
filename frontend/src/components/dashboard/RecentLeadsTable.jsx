import { Book, Headset, MoreHorizontal, Users } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";
import { EmptyState } from "../dashboard-ui/EmptyState";
import StatusBadge from "@/components/table/StatusBadge";

export default function RecentLeadsTable({ recentLeads }) {
  if (recentLeads?.error) {
    return (
      <div className="h-full min-h-[300px]">
        <EmptyState title="Failed to load leads" description="An error occurred while fetching recent leads." />
      </div>
    );
  }

  const data = recentLeads?.data || [];

  const action = (
    <div className="flex items-center gap-3">
      <select className="rounded-lg border border-[#ECECEC] bg-white px-3 py-1.5 text-sm font-[500] text-gray-700 outline-none hover:border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] transition-colors">
        <option>All Statuses</option>
        <option>Enquiry</option>
        <option>Interested</option>
      </select>
      <select className="hidden sm:block rounded-lg border border-[#ECECEC] bg-white px-3 py-1.5 text-sm font-[500] text-gray-700 outline-none hover:border-gray-300 focus:ring-2 focus:ring-[#7A1F2B] transition-colors">
        <option>Newest First</option>
        <option>Oldest First</option>
      </select>
    </div>
  );

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Recent Leads" action={action} className="mb-2">
        <div className="flex flex-col gap-3 mt-4">
          {data.length === 0 ? (
            <div className="py-8">
              <EmptyState title="No recent leads" description="There are no recent leads in your pipeline." icon={Users} />
            </div>
          ) : (
            data.map((lead) => (
              <div 
                key={lead.id} 
                className="group flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-[16px] border border-[#ECECEC] bg-white p-4 transition-all duration-300 hover:border-gray-300 hover:shadow-md hover:bg-gray-50/50 cursor-pointer"
              >
                {/* Section 1: Avatar + Name */}
                <div className="flex w-full items-center gap-3 md:w-[220px]">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50 font-bold text-blue-600 ring-2 ring-white shadow-sm group-hover:ring-blue-100 transition-all">
                    {lead.student ? lead.student.charAt(0).toUpperCase() : "?"}
                  </div>
                  <span className="font-[600] text-gray-900 truncate tracking-tight text-[15px]" title={lead.student}>{lead.student || "Unknown"}</span>
                </div>

                {/* Section 2: Course */}
                <div className="flex w-full items-center gap-3 md:w-[160px]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Book size={16} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[11px] font-[600] uppercase tracking-wider text-slate-400">Course</span>
                    <span className="truncate text-sm font-[500] text-gray-700" title={lead.course}>{lead.course || "Not Assigned"}</span>
                  </div>
                </div>

                {/* Section 3: Assigned */}
                <div className="flex w-full items-center gap-3 md:w-[160px]">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 transition-colors group-hover:bg-blue-50 group-hover:text-blue-600">
                    <Headset size={16} />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-[11px] font-[600] uppercase tracking-wider text-slate-400">Assigned</span>
                    <span className="truncate text-sm font-[500] text-gray-700" title={lead.assignedTo}>{lead.assignedTo || "Unassigned"}</span>
                  </div>
                </div>

                {/* Section 4: Badges */}
                <div className="flex w-full items-center gap-2 md:w-[140px]">
                  <StatusBadge status={lead.status} />
                </div>

                {/* Section 5: Actions */}
                <div className="flex items-center justify-end">
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-gray-900 hover:shadow-sm border border-transparent hover:border-gray-200">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </DashboardSection>
    </div>
  );
}