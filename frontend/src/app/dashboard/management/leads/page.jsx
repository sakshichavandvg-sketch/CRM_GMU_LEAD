"use client";

import ManagementHeader from "@/components/management/ManagementHeader";
import LeadsOverviewTable from "@/features/leads/components/LeadsOverviewTable";

export default function LeadsPage() {
  return (
    <>
      <ManagementHeader 
        title="Leads Management" 
        description="View and manage all system leads" 
        activeTab="leads" 
      />
      <LeadsOverviewTable />
    </>
  );
}
