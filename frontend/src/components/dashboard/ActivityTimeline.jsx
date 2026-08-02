import { Activity } from "lucide-react";
import { EmptyState } from "../dashboard-ui/EmptyState";
import { formatTimeAgo } from "../dashboard-ui/ActivityCard";

// Rotating dot colors per Stitch design
const DOT_COLORS = [
  "bg-green-500",
  "bg-blue-600",
  "bg-[#7b1a1a]",
  "bg-amber-500",
  "bg-purple-500",
];

export default function ActivityTimeline({ timeline }) {
  const error = timeline?.error;
  const data = timeline?.data || [];

  if (error) {
    return (
      <div className="h-full min-h-[300px]">
        <EmptyState title="Failed to load activity" description="An error occurred while fetching recent activity." />
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col" style={{ borderRadius: "16px" }}>
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      
      {/* Header */}
      <div className="px-5 py-4 flex justify-between items-center border-b border-gray-50 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
      </div>

      {/* Timeline List */}
      {data.length === 0 ? (
        <div className="py-8 px-5 flex-1 h-[500px]">
          <EmptyState title="No recent activity" description="There are no recent updates in the system." icon={Activity} />
        </div>
      ) : (
        <div 
          className="px-5 py-2 flex-1 overflow-y-auto hide-scrollbar"
          style={{ 
            maxHeight: "500px",
            scrollbarWidth: "none", 
            msOverflowStyle: "none" 
          }}
        >
          {data.map((activity, index) => {
            const dotColor = DOT_COLORS[index % DOT_COLORS.length];

            // Compute display time
            const displayTime = activity.time
              || (activity.timestamp ? formatTimeAgo(new Date(activity.timestamp)) : "Just now");

            return (
              <div key={activity.id || index} className="flex gap-4 py-4 items-start">
                {/* Colored Dot */}
                <div className="flex-shrink-0 mt-1.5">
                  <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
                </div>

                {/* Activity Content */}
                <div className="flex-grow">
                  <p className="text-sm font-bold text-gray-900">
                    {activity.description || activity.action || activity.title || "Activity"}
                  </p>
                  <p className="text-xs font-semibold text-gray-400 mt-1 uppercase">
                    {displayTime}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer — Stitch: centered "View All Activity" link */}
      {data.length > 0 && (
        <div className="px-5 py-4 border-t border-gray-100 flex justify-center mt-auto flex-shrink-0">
          <a
            className="text-sm font-bold text-[#7b1a1a] underline hover:opacity-80 transition-opacity"
            href="#"
          >
            View All Activity →
          </a>
        </div>
      )}
    </div>
  );
}