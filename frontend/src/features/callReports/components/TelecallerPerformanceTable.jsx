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
      <div className="call-reports-theme flex flex-col gap-0 flex-1 min-h-0 bg-background font-body-md text-on-surface">
        <CallReportsHeader />
        <CallReportsStats />
        <TableSkeleton rows={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="call-reports-theme flex flex-col gap-0 flex-1 min-h-0 bg-background font-body-md text-on-surface">
        <CallReportsHeader />
        <CallReportsStats />
        <ErrorState 
          title="Failed to load call reports"
          message="Check your connection and try again"
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  return (
    <div className="call-reports-theme flex flex-col gap-0 flex-1 min-h-0 bg-background font-body-md text-on-surface selection:bg-primary-fixed selection:text-primary pb-8">
      <CallReportsHeader />
      <CallReportsStats />
      
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
