import RecentLeadsTable from "./RecentLeadsTable";
import FollowUpsCard from "./FollowUpsCard";
import ActivityTimeline from "./ActivityTimeline";

export default function DashboardBottom() {
  return (
    <div className="space-y-4">

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentLeadsTable />
        </div>

        <FollowUpsCard />

      </div>

      <ActivityTimeline />

    </div>
  );
}