import { Calendar, Phone, MessageCircle } from "lucide-react";
import { EmptyState } from "../dashboard-ui/EmptyState";

// Priority badge styles matching Stitch design
const PRIORITY_STYLES = {
  High: { bg: "bg-[#FDF2F2]", text: "text-[#DE6B6B]", label: "HIGH PRIORITY" },
  Medium: { bg: "bg-[#FEF9EC]", text: "text-[#E9B35C]", label: "MEDIUM PRIORITY" },
  Low: { bg: "bg-blue-50", text: "text-blue-500", label: "LOW PRIORITY" },
};

// Icon colors per Stitch: first item maroon, second item blue
const ICON_COLORS = [
  "text-[#5D1717]",
  "text-[#4A69BD]",
  "text-[#5D1717]",
  "text-[#4A69BD]",
];

export default function FollowUpsCard({ followups }) {
  const upcomingError = followups?.upcoming?.error;
  const overdueError = followups?.overdue?.error;

  const upcomingData = followups?.upcoming?.data || [];
  const overdueData = followups?.overdue?.data || [];

  // Combine overdue and upcoming for display (preserve existing logic)
  const data = [...overdueData, ...upcomingData];

  if (upcomingError || overdueError) {
    return (
      <div className="h-full min-h-[300px]">
        <EmptyState title="Failed to load follow-ups" description="An error occurred while fetching follow-ups." />
      </div>
    );
  }

  // Choose icon based on index (alternating phone/chat per Stitch)
  const getIcon = (idx) => {
    return idx % 2 === 0
      ? <Phone size={20} />
      : <MessageCircle size={20} />;
  };

  // Get priority style
  const getPriorityStyle = (priority) => {
    const key = typeof priority === "string"
      ? priority.charAt(0).toUpperCase() + priority.slice(1).toLowerCase()
      : "Medium";
    return PRIORITY_STYLES[key] || PRIORITY_STYLES.Medium;
  };

  return (
    <article className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 xl:p-6 h-full flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 xl:mb-8">
        <h2 className="text-[22px] xl:text-[26px] font-bold text-gray-900">Today&apos;s Follow-ups</h2>
        <a
          className="text-[#5D1717] font-semibold flex items-center gap-1 hover:underline text-sm xl:text-base"
          href="#"
        >
          View Calendar
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </header>

      {/* Follow-ups List with Timeline */}
      {data.length === 0 ? (
        <div className="py-4 flex-1">
          <EmptyState title="No follow-ups" description="You have no follow-ups scheduled for today." icon={Calendar} />
        </div>
      ) : (
        <section className="relative flex-1">
          {/* Vertical Timeline Stem */}
          {data.length > 1 && (
            <div className="absolute left-[23px] top-12 bottom-12 w-[1px] bg-gray-100" />
          )}

          <div className="space-y-6 xl:space-y-8">
            {data.map((item, index) => {
              const priorityStyle = getPriorityStyle(item.priority);
              const iconColor = ICON_COLORS[index % ICON_COLORS.length];

              return (
                <div
                  key={index}
                  className="flex items-center justify-between relative"
                >
                  <div className="flex items-center gap-4 xl:gap-6">
                    {/* Circular Icon Container — Stitch: white bg, bordered circle */}
                    <div className={`relative z-10 w-12 h-12 flex items-center justify-center bg-white border border-gray-100 rounded-full shadow-sm ${iconColor} shrink-0`}>
                      {getIcon(index)}
                    </div>

                    {/* Name + Subtitle */}
                    <div className="flex flex-col">
                      <span className="text-lg xl:text-xl font-bold text-[#1A1A1A]">
                        {item.student || "Unknown"}
                      </span>
                      <span className="text-sm text-gray-400 font-medium mt-0.5">
                        {item.time || "Scheduled"}{item.assignedTo ? ` • Assigned to ${item.assignedTo}` : ""}
                      </span>
                    </div>
                  </div>

                  {/* Priority Badge */}
                  <div className="shrink-0 ml-4">
                    <span className={`px-3 xl:px-4 py-1.5 xl:py-2 rounded-md text-[10px] tracking-wider font-bold ${priorityStyle.bg} ${priorityStyle.text}`}>
                      {priorityStyle.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </article>
  );
}