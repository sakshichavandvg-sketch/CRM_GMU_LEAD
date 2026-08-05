"use client";

import React, { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTelecallerCallLogs } from "@/features/callReports/hooks/useCallReports";
import CallDetailsModal from "@/features/telecaller/voice/components/details/CallDetailsModal";

// Stitch UI Components
import "@/features/callReports/components/stitch/stitch-theme.css";
import StitchHeader from "@/features/callReports/components/stitch/StitchHeader";
import StitchKPISection from "@/features/callReports/components/stitch/StitchKPISection";
import StitchFilterToolbar from "@/features/callReports/components/stitch/StitchFilterToolbar";
import StitchCallReportTable from "@/features/callReports/components/stitch/StitchCallReportTable";
import TablePagination from "@/components/table/TablePagination";

export default function TelecallerCallLogsPage() {
  const { id: userId } = useParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    search: "",
    dateFrom: "",
    dateTo: "",
    status: "",
    hasRecording: "",
    direction: "",
  });

  // Table State
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCall, setSelectedCall] = useState(null);

  // Fetch paginated and filtered logs from backend
  const { data: rawData, isLoading, isError } = useTelecallerCallLogs(
    userId,
    filters, // Backend filters
    page,
    pageSize // Backend pagination
  );

  const allCallLogs = Array.isArray(rawData?.content)
    ? rawData.content
    : Array.isArray(rawData?.calls)
    ? rawData.calls
    : Array.isArray(rawData)
    ? rawData
    : [];

  const telecallerName = allCallLogs[0]?.name || "Telecaller";

  // Derive KPI stats from the currently fetched dataset (as instructed)
  const kpiData = useMemo(() => {
    // In a real scenario, KPI stats would be fetched via a separate summary API, 
    // but per instructions we compute it from the fetched dataset for now.
    const totalCalls = allCallLogs.length;
    const connectedCalls = allCallLogs.filter(
      c => (c.callOutcome || c.outcome || c.status || "").toLowerCase() === "connected" || 
           (c.callOutcome || c.outcome || c.status || "").toLowerCase() === "answered"
    ).length;
    const recordingsCount = allCallLogs.filter(
      c => Boolean(c.recordingUrl || c.hasRecording || c.recording)
    ).length;
    
    // Parse durations to seconds
    const parseDur = (dur) => {
      if (typeof dur === "number") return dur;
      if (typeof dur !== "string" || !dur) return 0;
      const parts = dur.split(":").map(Number);
      if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
      if (parts.length === 2) return parts[0] * 60 + parts[1];
      return 0;
    };

    const validDurations = allCallLogs.map(c => parseDur(c.callDuration || c.duration)).filter(d => d > 0);
    const avgDuration = validDurations.length > 0 
      ? Math.round(validDurations.reduce((a, b) => a + b, 0) / validDurations.length)
      : 0;

    return {
      totalCalls,
      connectedCalls,
      recordingsCount,
      avgDuration
    };
  }, [allCallLogs]);

  // Pagination logic mapped from backend response
  const totalItems = rawData?.totalElements ?? rawData?.totalItems ?? (rawData?.length > pageSize ? rawData.length : allCallLogs.length);
  const totalPages = rawData?.totalPages ?? Math.max(1, Math.ceil(totalItems / pageSize));
  const paginatedLogs = allCallLogs;

  const handleFilterChange = (updater) => {
    setFilters(updater);
    setPage(0); // Reset pagination on filter change
  };

  const handleRowClick = (row) => {
    if (row && row.callId) {
      setSelectedCall(row);
    }
  };

  return (
    <main className="stitch-call-report w-full max-w-container-max mx-auto px-page-padding py-10 flex flex-col gap-section-gap min-h-0 bg-white text-on-surface">
      <StitchHeader 
        title={telecallerName} 
        subtitle="Call logs and performance summary" 
        onBack={() => router.push("/dashboard/management/call-reports")}
      />
      
      <StitchKPISection data={kpiData} isLoading={isLoading} />
      
      <StitchFilterToolbar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        isLoading={isLoading}
      />
      
      <StitchCallReportTable 
        data={paginatedLogs} 
        isLoading={isLoading} 
        isError={isError}
        onPlayRecording={handleRowClick}
        startIndex={page * pageSize + 1}
      />
      
      {!isLoading && !isError && totalItems > 0 && (
        <TablePagination 
          mode="page"
          currentPage={page}
          pageSize={pageSize}
          totalItems={totalItems}
          totalPages={totalPages}
          onPageChange={setPage}
          onPageSizeChange={(s) => { setPageSize(s); setPage(0); }}
        />
      )}

      {/* Call Details Modal */}
      <CallDetailsModal
        callId={selectedCall?.callId}
        callData={selectedCall}
        open={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        showRecording={true}
      />
    </main>
  );
}
