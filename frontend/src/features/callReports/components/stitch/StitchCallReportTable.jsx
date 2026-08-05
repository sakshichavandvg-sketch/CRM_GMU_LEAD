import React from "react";
import DataTable from "@/components/table/DataTable";
import Badge from "@/components/ui/Badge";
import { Play, PhoneOff } from "lucide-react";

const getStatusVariant = (status) => {
  const s = (status || "Unknown").toLowerCase();
  
  if (s === "answered" || s === "connected") return "success";
  if (s === "missed" || s === "no answer") return "danger";
  if (s === "busy") return "orange";
  if (s === "voicemail") return "neutral";
  if (s === "call back") return "yellow";
  if (s === "interested") return "blue";
  
  return "neutral";
};

function parseDurationToSeconds(dur) {
  if (typeof dur === "number") return dur;
  if (typeof dur !== "string" || !dur) return 0;
  const parts = dur.split(":").map(Number);
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return 0;
}

function formatDuration(val) {
  if (!val && val !== 0) return "—";
  const seconds = parseDurationToSeconds(val);
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
    hour: "2-digit",
    minute: "2-digit"
  });
}

const getColumns = (startIndex, onPlayRecording) => [
  {
    key: "slNo",
    label: "SL NO",
    width: "70px",
    render: (_, row) => (
      <span className="text-sm text-gray-500 font-medium">{startIndex + (row._index || 0)}</span>
    ),
  },
  {
    key: "callDate",
    label: "Call Date",
    width: "160px",
    render: (_, row) => (
      <span className="text-sm font-medium text-gray-900">{formatDate(row.createdAt || row.date || row.time || row.callDateTime)}</span>
    ),
  },
  {
    key: "leadName",
    label: "Lead Name",
    width: "200px",
    render: (_, row) => (
      <span className="text-sm font-bold text-gray-900">{row.name || row.leadName || row.contactName || "Unknown"}</span>
    ),
  },
  {
    key: "mobileNo",
    label: "Mobile No",
    width: "140px",
    render: (_, row) => (
      <span className="text-sm text-gray-600 font-mono">{row.phone || row.leadPhone || row.mobileNo || row.mobile || row.contactPhone || "—"}</span>
    ),
  },
  {
    key: "callCount",
    label: "Call Count",
    width: "110px",
    headerClassName: "text-center",
    cellClassName: "text-center",
    render: (_, row) => (
      <span className="text-sm font-bold text-gray-900">{row.callCount || 1}</span>
    ),
  },
  {
    key: "duration",
    label: "Duration",
    width: "110px",
    render: (_, row) => (
      <span className="text-sm font-mono text-gray-700">{formatDuration(row.callDuration || row.duration)}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (_, row) => {
      const outcome = row.callOutcome || row.outcome || row.status || "Unknown";
      return (
        <Badge variant={getStatusVariant(outcome)} dot>
          {outcome}
        </Badge>
      );
    },
  },
  {
    key: "course",
    label: "Course",
    width: "120px",
    render: (_, row) => (
      <span className="text-sm text-gray-700">{row.course || row.courseName || "—"}</span>
    ),
  },
  {
    key: "district",
    label: "District",
    width: "140px",
    render: (_, row) => (
      <span className="text-sm text-gray-700">{row.district || row.districtName || "—"}</span>
    ),
  },
  {
    key: "recordingUrl",
    label: "Recording",
    width: "100px",
    headerClassName: "text-center",
    cellClassName: "flex justify-center",
    render: (_, row) => {
      const hasRecording = Boolean(row.recordingUrl || row.hasRecording || row.recording);
      return hasRecording ? (
        <button 
          onClick={(e) => { e.stopPropagation(); onPlayRecording(row); }}
          className="w-8 h-8 inline-flex rounded-full bg-[#7A1F2B]/5 text-[#7A1F2B] items-center justify-center hover:bg-[#7A1F2B]/10 transition-colors"
          title="Play Recording"
        >
          <Play size={14} className="ml-0.5" />
        </button>
      ) : (
        <span className="text-gray-300 text-sm">—</span>
      );
    },
  },
];

export default function StitchCallReportTable({ data = [], isLoading, isError, onPlayRecording, startIndex = 1 }) {
  // Inject _index for Sl No rendering based on actual array index
  const indexedData = data.map((item, idx) => ({ ...item, _index: idx }));
  const columns = getColumns(startIndex, onPlayRecording);

  return (
    <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-0">
      <DataTable
        columns={columns}
        data={indexedData}
        rowKey={(row) => row.callId || row._index}
        selectable={false}
        loading={isLoading}
        onRowClick={onPlayRecording}
        emptyState={
          <div className="flex flex-col items-center justify-center text-gray-500 py-12">
            <PhoneOff size={48} className="mb-2 text-gray-300" strokeWidth={1.5} />
            <p className="font-semibold text-gray-900">No Call Logs Found</p>
            <p className="text-sm text-gray-500">No calls available for this period.</p>
          </div>
        }
      />
    </div>
  );
}
