import RecentLeadsTable from "./RecentLeadsTable";
import FollowUpsCard from "./FollowUpsCard";
import ActivityTimeline from "./ActivityTimeline";
import TelecallerPerformanceCard from "./TelecallerPerformanceCard";
import AdmissionSummaryCard from "./AdmissionSummaryCard";
import MonthlyAdmissionTrendCard from "./MonthlyAdmissionTrendCard";

export default function DashboardBottom({ tables, timeline }) {
  return (
    <div className="space-y-6">

      {/* 4. Recent Leads (65%) | Today's Follow-ups (35%) -> roughly 2/3 and 1/3 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <RecentLeadsTable recentLeads={tables?.recentLeads} />
        </div>
        <div className="xl:col-span-1">
          <FollowUpsCard followups={tables?.followups} />
        </div>
      </div>

      {/* 5. Telecaller Performance (full width) */}
      <div className="grid grid-cols-1 gap-6">
        <div className="w-full">
          <TelecallerPerformanceCard />
        </div>
      </div>

      {/* 6. Recent Activity (40%) | Monthly Admission Trend (60%) -> 4/10 and 6/10 */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-10">
        <div className="xl:col-span-4">
          <ActivityTimeline timeline={timeline} />
        </div>
        <div className="xl:col-span-6">
          <MonthlyAdmissionTrendCard />
        </div>
      </div>

      {/* 7. Today's Admission Summary */}
      <div className="grid grid-cols-1 gap-6">
        <AdmissionSummaryCard />
      </div>

    </div>
  );
}