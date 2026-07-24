import RecentLeadsTable from "./RecentLeadsTable";
import FollowUpsCard from "./FollowUpsCard";
import ActivityTimeline from "./ActivityTimeline";

export default function DashboardBottom({ tables, timeline }) {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">

        <div className="xl:col-span-2">
          <RecentLeadsTable recentLeads={tables?.recentLeads} />
        </div>

        <FollowUpsCard followups={tables?.followups} />

      </div>

      <ActivityTimeline timeline={timeline} />

    </div>
  );
}