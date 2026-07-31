"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useCallReportsSummary } from "@/features/callReports/hooks/useCallReports";
import TelecallerSummary from "@/features/callReports/components/TelecallerSummary";
import CallLogsTable from "@/features/callReports/components/CallLogsTable";
import Button from "@/components/ui/Button";

export default function TelecallerCallLogsPage() {
  const { id: userId } = useParams();
  const router = useRouter();

  // Re-use the summary query but scoped to this single telecaller
  const { data: summaryData, isLoading: summaryLoading } = useCallReportsSummary(
    { userId },
    0,
    1
  );

  // Derive the telecaller's name from the summary response for the header
  const telecallerName =
    summaryData?.name ||
    (Array.isArray(summaryData?.content) ? summaryData.content[0]?.name : null) ||
    (Array.isArray(summaryData) ? summaryData[0]?.name : null) ||
    "Telecaller";

  // Use first record as the KPI source if it's a list
  const kpiData =
    summaryData && !Array.isArray(summaryData)
      ? summaryData
      : Array.isArray(summaryData?.content)
      ? summaryData.content[0]
      : Array.isArray(summaryData)
      ? summaryData[0]
      : null;

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
      <TelecallerSummary data={kpiData} isLoading={summaryLoading} />

      {/* ── Call Logs Table ───────────────────────────────────────────── */}
      <CallLogsTable userId={userId} />
    </div>
  );
}
