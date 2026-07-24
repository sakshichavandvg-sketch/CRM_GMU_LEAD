"use client";

import ErrorState from "@/components/ui/ErrorState";
import { FormSkeleton } from "@/components/ui/Skeletons";
import TelecallerHeader from "./TelecallerHeader";
import PerformanceSnapshot from "./PerformanceSnapshot";
import ProfileSection from "./ProfileSection";
import CallsTrendChart from "./charts/CallsTrendChart";
import CallOutcomeChart from "./charts/CallOutcomeChart";
import LeadPipelineChart from "./charts/LeadPipelineChart";
import AssignedLeadsSection from "./AssignedLeadsSection";
import ManagementHeader from "@/components/management/ManagementHeader";
import { breadcrumbs } from "@/config/breadcrumbs";

export default function TelecallerDetailsView({
  userId,
  telecaller,
  isLoading,
  isError,
}) {
  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
        <FormSkeleton />
      </div>
    );
  }

  if (isError || !telecaller) {
    return (
      <div className="mt-6">
        <ErrorState
          title="Error Loading Telecaller Details"
          message="Failed to load telecaller details."
          onRetry={() => window.location.reload()}
        />
      </div>
    );
  }

  return (
    <>
      <ManagementHeader
        title="Performance Dashboard"
        description="View telecaller profile, performance analytics, and workload."
        breadcrumbs={breadcrumbs.telecallerDetails}
        actions={<div />}
      />
      
      <div className="flex flex-col gap-6 mt-6">
        <TelecallerHeader profile={telecaller.profile} kpi={telecaller.kpi} />

        <PerformanceSnapshot kpi={telecaller.kpi} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ProfileSection profile={telecaller.profile} />
          <CallsTrendChart data={telecaller.callsPerformance} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CallOutcomeChart data={telecaller.callOutcomes} />
          <LeadPipelineChart data={telecaller.leadPipeline} />
        </div>

        <AssignedLeadsSection leads={telecaller.assignedLeads} userId={userId} />
      </div>
    </>
  );
}
