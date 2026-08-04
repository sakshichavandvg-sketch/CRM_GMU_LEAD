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
import StitchPagination from "@/features/callReports/components/stitch/StitchPagination";

export default function TelecallerCallLogsPage() {
  const { id: userId } = useParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    hasRecording: "",
    direction: "",
  });

  // Table State
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCall, setSelectedCall] = useState(null);

  // Fetch all logs once
  const { data: rawData, isLoading, isError } = useTelecallerCallLogs(
    userId,
    {}, // no server-side filters
    0,
    1000 // get all
  );

  const allCallLogs = Array.isArray(rawData?.content)
    ? rawData.content
    : Array.isArray(rawData?.calls)
    ? rawData.calls
    : Array.isArray(rawData)
    ? rawData
    : [];

  const telecallerName = allCallLogs[0]?.name || "Telecaller";

  const filteredCallLogs = useMemo(() => {
    let rows = [...allCallLogs];

    if (filters.date) {
      rows = rows.filter(call => {
        const callDate = call.createdAt || call.date;
        if (!callDate) return false;
        return callDate.startsWith(filters.date) || new Date(callDate).toISOString().startsWith(filters.date);
      });
    }

    if (filters.status) {
      rows = rows.filter(call => {
        const out = call.callOutcome || call.outcome || "Unknown";
        return out.toLowerCase() === filters.status.toLowerCase();
      });
    }

    if (filters.direction) {
      rows = rows.filter(call => {
        const dir = (call.direction || "Outbound").toLowerCase() === "inbound" ? "Inbound" : "Outbound";
        return dir.toLowerCase() === filters.direction.toLowerCase();
      });
    }

    if (filters.hasRecording) {
      rows = rows.filter(call => {
        const hasRec = Boolean(call.recordingUrl || call.hasRecording);
        if (filters.hasRecording === "true") return hasRec;
        if (filters.hasRecording === "false") return !hasRec;
        return true;
      });
    }

    return rows;
  }, [allCallLogs, filters]);

  const kpiData = useMemo(() => {
    const totalCalls = filteredCallLogs.length;
    const connectedCalls = filteredCallLogs.filter(
      c => (c.callOutcome || c.outcome || "").toLowerCase() === "connected"
    ).length;
    const recordingsCount = filteredCallLogs.filter(
      c => Boolean(c.recordingUrl || c.hasRecording)
    ).length;
    
    const validDurations = filteredCallLogs.map(c => c.callDuration || c.duration).filter(Boolean);
    const avgDuration = validDurations.length > 0 
      ? Math.round(validDurations.reduce((a, b) => a + b, 0) / validDurations.length)
      : 0;

    return {
      totalCalls,
      connectedCalls,
      recordingsCount,
      avgDuration
    };
  }, [filteredCallLogs]);

  // Pagination logic
  const totalItems = filteredCallLogs.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const paginatedLogs = filteredCallLogs.slice(page * pageSize, (page + 1) * pageSize);

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
    <main className="stitch-call-report w-full max-w-container-max mx-auto px-page-padding py-10 flex flex-col gap-section-gap min-h-0 bg-background text-on-surface">
      <StitchHeader 
        title={telecallerName} 
        subtitle="Call logs and performance summary" 
        onBack={() => router.push("/dashboard/management/call-reports")}
      />
      
      <StitchKPISection data={kpiData} isLoading={isLoading} />
      
      <StitchFilterToolbar 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      <StitchCallReportTable 
        data={paginatedLogs} 
        isLoading={isLoading} 
        isError={isError}
        onPlayRecording={handleRowClick}
        startIndex={page * pageSize + 1}
      />
      
      {!isLoading && !isError && totalItems > 0 && (
        <StitchPagination 
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
