"use client";

import React, { useState } from "react";
import { Play, PhoneIncoming, PhoneOutgoing } from "lucide-react";
import { useTelecallerCallLogs } from "../hooks/useCallReports";
import DataTable from "@/components/table/DataTable";
import SearchBar from "@/components/management/SearchBar";
import CallDetailsModal from "@/features/telecaller/voice/components/details/CallDetailsModal";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneOff, SlidersHorizontal } from "lucide-react";
import ErrorState from "@/components/ui/ErrorState";
import CallFilterDrawer from "./CallFilterDrawer";
import ActiveFilterChips from "./CallActiveFilterChips";

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

export default function CallLogsTable({ data = [], isLoading, isError, filters, onFilterChange }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedCall, setSelectedCall] = useState(null);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [draftFilters, setDraftFilters] = useState({});

  const totalItems = data.length;
  const totalPages = Math.ceil(totalItems / pageSize) || 1;
  const rows = data.slice(page * pageSize, (page + 1) * pageSize);

  const handleRowClick = (row) => {
    if (row && row.callId) {
      setSelectedCall(row);
    }
  };

  const handleApplyFilters = () => {
    onFilterChange(prev => ({
      ...prev,
      status: draftFilters.status || "",
      hasRecording: draftFilters.hasRecording || "",
      direction: draftFilters.direction || "",
    }));
    setPage(0);
    setIsDrawerOpen(false);
  };

  const handleResetFilters = () => {
    setDraftFilters({});
    onFilterChange({
      date: "",
      status: "",
      hasRecording: "",
      direction: "",
    });
    setPage(0);
    setIsDrawerOpen(false);
  };

  const handleRemoveFilter = (key) => {
    onFilterChange(prev => ({ ...prev, [key]: "" }));
    setPage(0);
  };

  const handleClearAll = () => {
    onFilterChange({
      date: "",
      status: "",
      hasRecording: "",
      direction: "",
    });
    setDraftFilters({});
    setPage(0);
  };

  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      {/* Filters */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-gray-200">
          <div className="flex items-center gap-2">
            <input 
              type="date" 
              value={filters.date}
              onChange={(e) => { 
                onFilterChange(prev => ({ ...prev, date: e.target.value })); 
                setPage(0); 
              }}
              className="h-10 rounded-xl border border-gray-200 px-3 text-sm text-gray-700 outline-none focus:border-[#7A1F2B]"
            />
          </div>

          <div className="flex items-center gap-2">
            {(filters.date || filters.status || filters.hasRecording || filters.direction) && (
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-gray-500 hover:text-red-600 transition-colors mr-2"
              >
                Clear All
              </button>
            )}
            <button
              onClick={() => {
                setDraftFilters({ 
                  status: filters.status, 
                  hasRecording: filters.hasRecording, 
                  direction: filters.direction 
                });
              setIsDrawerOpen(true);
            }}
            className="flex-shrink-0 flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-semibold transition-colors border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-1 h-10"
          >
            <SlidersHorizontal size={16} />
            Refine Filters
          </button>
        </div>
      </div>
      
      <ActiveFilterChips 
        filters={filters} 
        onRemove={handleRemoveFilter} 
        onClearAll={handleClearAll} 
      />
    </div>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={8} />
      ) : isError ? (
        <ErrorState 
          title="Failed to load call logs"
          message="Check your connection and try again"
        />
      ) : totalItems === 0 ? (
        <div className="flex-1 min-h-[300px] flex items-center justify-center mt-4">
          <EmptyState 
            title="No Call Logs Found" 
            description={(filters.date || filters.status || filters.direction || filters.hasRecording) ? "No calls match your filters." : "This telecaller hasn't made any calls yet."}
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
        callId={selectedCall?.callId}
        callData={selectedCall}
        open={!!selectedCall}
        onClose={() => setSelectedCall(null)}
        showRecording={true}
      />

      <CallFilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      />
    </div>
  );
}
