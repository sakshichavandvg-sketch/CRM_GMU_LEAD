"use client";

import React, { useState } from "react";
import { Play, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { useTelecallerCallLogs } from "../hooks/useCallReports";
import DataTable from "@/components/table/DataTable";
import SearchBar from "@/components/management/SearchBar";
import CallDetailsModal from "@/features/telecaller/voice/components/details/CallDetailsModal";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneOff } from "lucide-react";

const OUTCOME_STYLES = {
  Connected:    { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "No Answer":  { bg: "bg-amber-50",   text: "text-amber-700",   dot: "bg-amber-400"  },
  Busy:         { bg: "bg-orange-50",  text: "text-orange-700",  dot: "bg-orange-400" },
  Failed:       { bg: "bg-red-50",     text: "text-red-700",     dot: "bg-red-400"    },
};
const defaultOutcomeStyle = { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };

function formatDuration(seconds) {
  if (!seconds) return "—";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s < 10 ? "0" : ""}${s}s`;
}

function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

const COLUMNS = [
  {
    key: "leadName",
    label: "Lead",
    render: (value, row) => (
      <div className="flex flex-col">
        <span className="font-[600] text-gray-900">{value || row.name || "Unknown"}</span>
        <span className="text-xs text-gray-400 font-mono">
          {row.phone || row.leadPhone || "—"}
        </span>
      </div>
    ),
  },
  {
    key: "callDirection",
    label: "Direction",
    render: (value, row) => {
      const dir = value || (row.direction === "inbound" ? "Inbound" : "Outbound");
      return (
        <div className="flex items-center gap-1.5">
          {dir === "Inbound"
            ? <PhoneIncoming size={13} className="text-blue-500" />
            : <PhoneOutgoing size={13} className="text-gray-400" />}
          <span className="text-xs text-gray-600 font-[500]">{dir}</span>
        </div>
      );
    },
  },
  {
    key: "callDateTime",
    label: "Date & Time",
    render: (value, row) => (
      <span className="text-sm text-gray-600">
        {formatDate(value || row.createdAt || row.date)}
      </span>
    ),
  },
  {
    key: "callDurationSeconds",
    label: "Duration",
    render: (value, row) => (
      <span className="font-mono text-gray-700">
        {formatDuration(value || row.callDuration || row.duration)}
      </span>
    ),
  },
  {
    key: "outcome",
    label: "Outcome",
    render: (value, row) => {
      const outcome = value || row.callOutcome || "Unknown";
      const style = OUTCOME_STYLES[outcome] || defaultOutcomeStyle;
      return (
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-[600] ${style.bg} ${style.text}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
          {outcome}
        </span>
      );
    },
  },
  {
    key: "recordingUrl",
    label: "Recording",
    render: (value) =>
      value ? (
        <div className="text-[#7A1F2B] w-fit p-1 bg-[#7A1F2B]/5 rounded-md" title="Has Recording">
          <Play size={13} className="ml-0.5" />
        </div>
      ) : (
        <span className="text-gray-300 text-xs">—</span>
      ),
  },
];

export default function CallLogsTable({ userId }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCallId, setSelectedCallId] = useState(null);

  const { data, isLoading, isError } = useTelecallerCallLogs(
    userId,
    { search },
    page,
    pageSize
  );

  const rows = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data?.calls)
    ? data.calls
    : Array.isArray(data)
    ? data
    : [];

  const totalPages = data?.totalPages ?? (rows.length > 0 ? 1 : 0);
  const totalItems = data?.totalElements ?? data?.totalItems ?? rows.length;

  const handleRowClick = (row) => {
    const callId = row.callId || row.id || row.interactionId;
    if (callId) setSelectedCallId(callId);
  };

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Search */}
      <div className="flex items-center gap-3">
        <SearchBar
          value={search}
          onChange={(val) => { setSearch(val); setPage(0); }}
          placeholder="Search by lead name or phone..."
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : isError ? (
        <div className="flex min-h-[250px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/30 text-center">
          <p className="text-sm font-[600] text-red-600">Failed to load call logs</p>
        </div>
      ) : totalItems === 0 ? (
        <div className="flex-1 min-h-[300px] flex items-center justify-center mt-4">
          <EmptyState 
            title="No Call Logs Found" 
            description={search ? "No calls match your search criteria." : "This telecaller hasn't made any calls yet."}
            icon={PhoneOff} 
          />
        </div>
      ) : (
        <DataTable
          columns={COLUMNS}
          data={rows}
          rowKey="callId"
          selectable={false}
          density="compact"
          onRowClick={handleRowClick}
          pagination={{
            currentPage: page,
            pageSize,
            totalPages,
            totalItems,
            onPageChange: setPage,
            onPageSizeChange: (s) => { setPageSize(s); setPage(0); },
          }}
        />
      )}

      {/* Call Details Modal — admin sees Recording tab */}
      <CallDetailsModal
        callId={selectedCallId}
        open={!!selectedCallId}
        onClose={() => setSelectedCallId(null)}
        showRecording={true}
      />
    </div>
  );
}
