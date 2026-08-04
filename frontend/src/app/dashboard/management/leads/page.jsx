"use client";

import LeadsHeader from "@/features/leads/components/LeadsHeader";
import LeadsOverviewTable from "@/features/leads/components/LeadsOverviewTable";
import { useLeadOverviewFilters } from "@/features/leads/hooks/useLeadOverviewFilters";

export default function LeadsPage() {
  const { search, filters, actions } = useLeadOverviewFilters();

  return (
    <div className="p-8 flex flex-col gap-8 max-w-[1600px] mx-auto w-full">
      <LeadsHeader />
      <LeadsOverviewTable filters={filters} actions={actions} search={search} />
    </div>
  );
}
