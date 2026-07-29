"use client";


import DashboardStats from "@/components/dashboard/DashboardStats";
import LeadTemperature from "@/components/dashboard/LeadTemperature";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DashboardBottom from "@/components/dashboard/DashboardBottom";
import { useDashboardStats } from "@/features/leads/hooks/useDashboardStats";
import { DashboardSkeleton } from "@/components/dashboard-ui/DashboardSkeleton";
import ErrorState from "@/components/ui/ErrorState";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pr-2 pb-10">
      {/* DashboardNavbar in layout already provides the header and breadcrumbs */}

      {isLoading ? (
        <DashboardSkeleton />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : (
        <>
          <DashboardStats stats={data?.stats} />
          <LeadTemperature temperature={data?.temperature} />
          <DashboardCharts 
            charts={data?.charts}
          />
          <DashboardBottom tables={data?.tables} timeline={data?.timeline} />
        </>
      )}
    </div>
  );
}