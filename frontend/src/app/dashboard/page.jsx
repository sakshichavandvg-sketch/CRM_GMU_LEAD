"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import LeadTemperature from "@/components/dashboard/LeadTemperature";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DashboardBottom from "@/components/dashboard/DashboardBottom";
import { breadcrumbs } from "@/config/breadcrumbs";
import { useDashboardStats } from "@/features/leads/hooks/useDashboardStats";
import { StatsSkeleton } from "@/components/ui/Skeletons";
import ErrorState from "@/components/ui/ErrorState";

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useDashboardStats();

  return (
    <div className="flex-1 min-h-0 overflow-y-auto space-y-6 pr-2">
      <DashboardHeader breadcrumbs={breadcrumbs.dashboard} />

      {isLoading ? (
        <div className="space-y-6">
          <StatsSkeleton count={7} />
          {/* Chart Skeletons reused from existing UI elements */}
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-64 animate-pulse"></div>
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm h-64 animate-pulse"></div>
          </div>
        </div>
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