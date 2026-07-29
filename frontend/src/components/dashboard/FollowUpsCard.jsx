import { Calendar, PhoneCall } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";
import { EmptyState } from "../dashboard-ui/EmptyState";
import StatusBadge from "@/components/table/StatusBadge";

export default function FollowUpsCard({ followups }) {
  const upcomingError = followups?.upcoming?.error;
  const overdueError = followups?.overdue?.error;
  
  const upcomingData = followups?.upcoming?.data || [];
  const overdueData = followups?.overdue?.data || [];
  
  // Combine overdue and upcoming for display
  const data = [...overdueData, ...upcomingData];

  if (upcomingError || overdueError) {
    return (
      <div className="h-full min-h-[300px]">
        <EmptyState title="Failed to load follow-ups" description="An error occurred while fetching follow-ups." />
      </div>
    );
  }

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Today's Follow-ups" className="mb-2">
        <div className="flex flex-col gap-3 mt-4">
          {data.length === 0 ? (
            <div className="py-8">
              <EmptyState title="No follow-ups" description="You have no follow-ups scheduled for today." icon={Calendar} />
            </div>
          ) : (
            data.map((item, index) => {
              const isOverdue = item.time === "Overdue";
              return (
                <div
                  key={index}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[16px] border border-[#ECECEC] p-4 transition-all duration-300 hover:border-gray-300 hover:shadow-md hover:bg-gray-50/50 cursor-pointer"
                >
                  <div className="flex items-center gap-3 w-full">
                    <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full font-bold ring-2 ring-white shadow-sm transition-all ${isOverdue ? 'bg-rose-50 text-rose-600 group-hover:ring-rose-100' : 'bg-orange-50 text-orange-600 group-hover:ring-orange-100'}`}>
                      {item.student ? item.student.charAt(0).toUpperCase() : "?"}
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="font-[600] text-gray-900 truncate tracking-tight text-[15px]" title={item.student}>{item.student}</span>
                      <span className="truncate text-xs font-[500] text-gray-500" title={item.course}>{item.course}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 w-full">
                    <div className="flex items-center gap-2">
                      {isOverdue ? (
                        <span className="rounded-md bg-rose-50 px-2 py-1 text-[11px] font-[700] text-rose-600 border border-rose-100 uppercase tracking-wider">
                          Overdue
                        </span>
                      ) : (
                        <span className="rounded-md bg-blue-50 px-2 py-1 text-[11px] font-[700] text-blue-600 border border-blue-100 uppercase tracking-wider">
                          Today
                        </span>
                      )}
                      <StatusBadge status={item.priority} />
                    </div>
                    
                    <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600 transition-colors hover:bg-green-600 hover:text-white hover:shadow-sm">
                      <PhoneCall size={14} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </DashboardSection>
    </div>
  );
}