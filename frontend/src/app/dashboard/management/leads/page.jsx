"use client";

import ManagementHeader from "@/components/management/ManagementHeader";
import LeadsOverviewTable from "@/features/leads/components/LeadsOverviewTable";
import { breadcrumbs } from "@/config/breadcrumbs";
import { useLeadOverviewFilters } from "@/features/leads/hooks/useLeadOverviewFilters";

export default function LeadsPage() {
  const { search, filters, actions } = useLeadOverviewFilters();

  return (
    <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
      <ManagementHeader
        title="Leads Management"
        description="View and manage all system leads"
        activeTab="leads"
        breadcrumbs={breadcrumbs.leads}
      />
      <LeadsOverviewTable filters={filters} actions={actions} search={search} />
    </div>
  );
}
