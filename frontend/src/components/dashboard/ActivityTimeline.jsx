import { Activity } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";
import { EmptyState } from "../dashboard-ui/EmptyState";
import { ActivityCard } from "../dashboard-ui/ActivityCard";

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
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Recent Activity" className="mb-2">
        <div className="flex flex-col gap-3 mt-4">
          {data.length === 0 ? (
            <div className="py-8">
              <EmptyState title="No recent activity" description="There are no recent updates in the system." icon={Activity} />
            </div>
          ) : (
            data.map((activity, index) => {
              // Map old activity format to new format if needed
              const formattedActivity = {
                ...activity,
                action: activity.action || activity.title,
                time: activity.time
              };
              
              return (
                <ActivityCard key={activity.id || index} activity={formattedActivity} />
              );
            })
          )}
        </div>
      </DashboardSection>
    </div>
  );
}