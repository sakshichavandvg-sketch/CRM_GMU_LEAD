import React from "react";
import { KPICard } from "@/components/dashboard-ui/KPICard";
import { Users, Zap, Clock, CheckCircle2, XCircle, Star } from "lucide-react";

export default function MyLeadsKPISection({ kpiData }) {
  const {
    totalAssigned = 0,
    newLeads = 0,
    inProgress = 0,
    interested = 0,
    notInterested = 0,
    converted = 0,
  } = kpiData || {};

  return (
    <div className="overflow-x-auto hide-scrollbar -mx-4 px-4 md:mx-0 md:px-0 mb-8">
      <div className="flex md:grid md:grid-cols-3 lg:grid-cols-6 gap-card-gap min-w-max md:min-w-0">
        
        <KPICard
          title="Total Assigned"
          value={totalAssigned}
          subtitle="All your assigned leads"
          icon={Users}
          variant="primary"
        />

        <KPICard
          title="New Leads"
          value={newLeads}
          subtitle="Require your attention"
          icon={Zap}
          variant="orange"
        />

        <KPICard
          title="In Progress"
          value={inProgress}
          subtitle="Active follow-ups"
          icon={Clock}
          variant="purple"
        />

        <KPICard
          title="Interested"
          value={interested}
          subtitle="Showing interest"
          icon={CheckCircle2}
          variant="success"
        />

        <KPICard
          title="Not Interested"
          value={notInterested}
          subtitle="Not showing interest"
          icon={XCircle}
          variant="danger"
        />

        <KPICard
          title="Converted"
          value={converted}
          subtitle="Successfully converted"
          icon={Star}
          variant="blue"
        />

      </div>
    </div>
  );
}
