"use client";

import ManagementHeader from "@/components/management/ManagementHeader";
import LeadsOverviewTable from "@/features/leads/components/LeadsOverviewTable";
import { breadcrumbs } from "@/config/breadcrumbs";

export default function LeadsPage() {
  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <ManagementHeader
        title="Leads Management"
        description="View and manage all system leads"
        activeTab="leads"
        breadcrumbs={breadcrumbs.leads}
      />
      <LeadsOverviewTable />
    </div>
  );
}
