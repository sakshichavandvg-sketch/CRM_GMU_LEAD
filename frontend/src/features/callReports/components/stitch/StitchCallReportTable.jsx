import React from "react";
import { TableSkeleton } from "@/components/ui/Skeletons";
import ErrorState from "@/components/ui/ErrorState";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneOff } from "lucide-react";

const getStatusBadge = (status) => {
  const s = (status || "Unknown").toLowerCase();
  
  if (s === "connected") {
    return { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-600" };
  } else if (s === "no answer") {
    return { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-600" };
  } else if (s === "busy") {
    return { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-600" };
  } else if (s === "voicemail") {
    return { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" };
  } else if (s === "call back") {
    return { bg: "bg-yellow-50", text: "text-yellow-800", dot: "bg-yellow-600" };
  } else if (s === "interested") {
    return { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-600" };
  }
  
  // Default fallback
  return { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
};

function formatDuration(seconds) {
  if (!seconds && seconds !== 0) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s < 10 ? "0" : ""}${s}`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function StitchCallReportTable({ data = [], isLoading, isError, onPlayRecording, startIndex = 1 }) {
  if (isLoading) {
    return (
      <section className="bg-white rounded-[24px] main-shadow border border-outline-variant/50 overflow-hidden flex flex-col p-6">
        <TableSkeleton rows={8} />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="bg-white rounded-[24px] main-shadow border border-outline-variant/50 overflow-hidden flex flex-col p-6">
        <ErrorState title="Failed to load call logs" message="Check your connection and try again" />
      </section>
    );
  }

  if (data.length === 0) {
    return (
      <section className="bg-white rounded-[24px] main-shadow border border-outline-variant/50 overflow-hidden flex flex-col p-6 min-h-[300px] justify-center">
        <EmptyState title="No Call Logs Found" description="No calls available." icon={PhoneOff} />
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[24px] main-shadow border border-outline-variant/50 overflow-hidden flex flex-col flex-1">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFF6F5] border-b border-outline-variant">
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">SL NO</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">CALL DATE</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">LEAD NAME</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">MOBILE NO</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider text-center">CALL COUNT</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">DURATION</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">STATUS</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">COURSE</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider">DISTRICT</th>
              <th className="px-6 py-5 font-table-header text-table-header text-on-surface-variant uppercase tracking-wider text-right">RECORDING</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#EEF1F5]">
            {data.map((row, index) => {
              const outcome = row.callOutcome || row.outcome || "Unknown";
              const badge = getStatusBadge(outcome);
              const hasRecording = Boolean(row.recordingUrl || row.hasRecording);
              
              return (
                <tr key={row.callId || index} className="h-[72px] table-row-hover transition-standard">
                  <td className="px-6 text-body-md text-on-surface-variant">{startIndex + index}</td>
                  <td className="px-6 text-body-md font-medium">{formatDate(row.createdAt || row.date)}</td>
                  <td className="px-6 text-body-md font-bold text-on-surface">{row.name || row.leadName || "Unknown"}</td>
                  <td className="px-6 text-body-md text-on-surface-variant">{row.phone || row.leadPhone || "—"}</td>
                  <td className="px-6 text-body-md text-center font-bold">{row.callCount || 1}</td>
                  <td className="px-6 text-body-md">{formatDuration(row.callDuration || row.duration)}</td>
                  <td className="px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${badge.bg} ${badge.text} text-[12px] font-bold`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${badge.dot}`}></span>
                      {outcome}
                    </span>
                  </td>
                  <td className="px-6 text-body-md">{row.course || "—"}</td>
                  <td className="px-6 text-body-md">{row.district || "—"}</td>
                  <td className="px-6 text-right">
                    {hasRecording ? (
                      <button 
                        onClick={() => onPlayRecording(row)}
                        className="w-10 h-10 inline-flex rounded-full border border-primary text-primary items-center justify-center hover:bg-primary-fixed transition-standard focus:ring-2 focus:ring-primary"
                        aria-label="Play Recording"
                      >
                        <span className="material-symbols-outlined" style={{ fontVariationSettings: '"FILL" 1' }}>play_arrow</span>
                      </button>
                    ) : (
                      <span className="mr-4 text-on-surface-variant text-body-md">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
