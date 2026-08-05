"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCallReportsSummary } from "../hooks/useCallReports";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneOff } from "lucide-react";
import ErrorState from "@/components/ui/ErrorState";

import CallReportsHeader from "./ui/CallReportsHeader";
import CallReportsStats from "./ui/CallReportsStats";
import CallReportsFilters from "./ui/CallReportsFilters";
import CallReportsTable from "./ui/CallReportsTable";

function parseDurationToSeconds(dur) {
  if (typeof dur === "number") return dur;
  if (typeof dur !== "string" || !dur) return 0;
  const parts = dur.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function formatDuration(s) {
  if (!s) return "—";
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m ${sec}s`;
}

export default function TelecallerPerformanceTable() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useCallReportsSummary(
    { date: selectedDate, search },
    page,
    pageSize
  );

  const rows = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data?.users)
    ? data.users
    : Array.isArray(data)
    ? data
    : [];

  const totalPages = data?.totalPages ?? (rows.length > 0 ? 1 : 0);
  const totalItems = data?.totalElements ?? data?.totalItems ?? rows.length;

  const stats = React.useMemo(() => {
    let totalCalls = 0;
    let connectedCalls = 0;
    let durationSecs = 0;
    
    rows.forEach(row => {
      totalCalls += (row.calls || row.totalCalls || 0);
      connectedCalls += (row.connectedCalls || 0);
      durationSecs += parseDurationToSeconds(row.duration || row.avgDuration);
    });

    const avgSecs = rows.length > 0 ? Math.round(durationSecs / rows.length) : 0;

    return {
      totalCalls: totalCalls > 0 ? totalCalls : "—",
      connectedCalls: connectedCalls > 0 ? connectedCalls : "—",
      avgDuration: avgSecs > 0 ? formatDuration(avgSecs) : "—",
      recordings: "—", // Missing from backend
      successRate: totalCalls > 0 && connectedCalls > 0 ? Math.round((connectedCalls / totalCalls) * 100) : null,
      todaysCalls: "—" // Missing from backend
    };
  }, [rows]);

  const handleRowClick = (row) => {
    const id = row.userId ?? row.slNo ?? row.id ?? row.empId;
    if (id) {
      router.push(`/dashboard/management/call-reports/${id}`);
    }
  };

  const paginationProps = {
    currentPage: page,
    pageSize,
    totalPages,
    totalItems,
    onPageChange: setPage,
    onPageSizeChange: (s) => { setPageSize(s); setPage(0); },
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-0 flex-1 min-h-0 bg-white font-body-md text-on-surface pb-8">
        <CallReportsHeader />
        <CallReportsStats stats={{}} />
        <TableSkeleton rows={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-0 flex-1 min-h-0 bg-white font-body-md text-on-surface pb-8">
        <CallReportsHeader />
        <CallReportsStats stats={{}} />
        <ErrorState 
          title="Failed to load call reports"
          message="Check your connection and try again"
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-0 flex-1 min-h-0 bg-white font-body-md text-on-surface pb-8 px-4">
      <CallReportsHeader />
      <CallReportsStats stats={stats} />
      
      <CallReportsFilters 
        search={search}
        onSearchChange={(val) => { setSearch(val); setPage(0); }}
        selectedDate={selectedDate}
        onDateChange={(val) => { setSelectedDate(val); setPage(0); }}
      />

      {totalItems === 0 && !isLoading && !isError ? (
        <div className="flex-1 min-h-[300px] flex items-center justify-center bg-surface-container-lowest rounded-[24px]">
          <EmptyState 
            title="No Call Reports Found" 
            description={selectedDate || search ? "No telecallers match your selected filters." : "There are no call reports available yet."}
            icon={PhoneOff} 
          />
        </div>
      ) : (
        <CallReportsTable 
          data={rows}
          onRowClick={handleRowClick}
          paginationProps={paginationProps}
        />
      )}
    </div>
  );
}
