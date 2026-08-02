"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useTelecallerCallLogs } from "@/features/callReports/hooks/useCallReports";
import TelecallerSummary from "@/features/callReports/components/TelecallerSummary";
import CallLogsTable from "@/features/callReports/components/CallLogsTable";
import Button from "@/components/ui/Button";
import { useMemo } from "react";

export default function TelecallerCallLogsPage() {
  const { id: userId } = useParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    hasRecording: "",
    direction: "",
  });

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

  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0">
      {/* ── Page Header ──────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => router.push("/dashboard/management/call-reports")}
            >
              <ArrowLeft size={16} className="mr-1" />
              Back to Reports
            </Button>
          </div>
          <h1 className="text-4xl font-bold font-outfit text-slate-900 mt-3">
            {telecallerName}
          </h1>
          <p className="text-gray-500 mt-2">
            Call logs and performance summary
          </p>
        </div>
      </div>

      {/* ── KPI Summary Strip ─────────────────────────────────────────── */}
      <TelecallerSummary data={kpiData} isLoading={isLoading} />

      {/* ── Call Logs Table ───────────────────────────────────────────── */}
      <CallLogsTable 
        data={filteredCallLogs}
        isLoading={isLoading}
        isError={isError}
        filters={filters}
        onFilterChange={setFilters}
      />
    </div>
  );
}
