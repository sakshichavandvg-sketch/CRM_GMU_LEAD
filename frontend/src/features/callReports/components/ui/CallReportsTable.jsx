"use client";

import React from "react";
import DataTable from "@/components/table/DataTable";
import TableCard from "@/components/table/TableCard";
import TablePagination from "@/components/table/TablePagination";
import Badge from "@/components/ui/Badge";
import ActionMenu from "@/components/table/ActionMenu";

// ── Helpers ──

const getInitials = (name) => {
  if (!name) return "?";
  return name.charAt(0).toUpperCase();
};

const formatDuration = (seconds) => {
  if (seconds == null) return "—";
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hrs > 0) {
    return `${hrs}h ${mins}m`;
  }
  return `${mins < 10 ? '0' : ''}${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
};

const formatDate = (dateString) => {
  if (!dateString) return "—";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getStatusVariant = (status) => {
  const s = (status || "Offline").toLowerCase();
  if (s === "online") return "success";
  if (s === "in call") return "blue";
  if (s === "idle") return "orange";
  return "neutral";
};

const getStatusLabel = (status) => {
  const s = (status || "Offline").toLowerCase();
  if (s === "online") return "Online";
  if (s === "in call") return "In Call";
  if (s === "idle") return "Idle";
  return "Offline";
};

// ── Column Definitions ──

const getColumns = (onRowClick) => [
  {
    key: "name",
    label: "Telecaller",
    width: "260px",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center font-bold text-red-700 shrink-0">
          {getInitials(row.name)}
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900 m-0">{row.name || "—"}</p>
          <p className="text-xs text-gray-400 m-0">{row.email || "—"}</p>
        </div>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (value) => (
      <Badge variant={getStatusVariant(value)} dot>
        {getStatusLabel(value)}
      </Badge>
    ),
  },
  {
    key: "totalCalls",
    label: "Total Calls",
    width: "110px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value) => (
      <span className="text-sm font-bold text-gray-900">{value || 0}</span>
    ),
  },
  {
    key: "connectedCalls",
    label: "Connected",
    width: "110px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value, row) => {
      const totalCalls = row.totalCalls || 0;
      const connectedCalls = value || 0;
      const connectedRate = totalCalls > 0 ? Math.round((connectedCalls / totalCalls) * 100) : 0;
      return (
        <div>
          <p className="text-sm font-bold text-gray-900 m-0">{connectedCalls}</p>
          <p className="text-xs text-green-600 m-0">{connectedRate}% rate</p>
        </div>
      );
    },
  },
  {
    key: "missedBusy",
    label: "Missed / Busy",
    width: "110px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value, row) => {
      const missedCalls = value || ((row.totalCalls || 0) - (row.connectedCalls || 0));
      return (
        <span className="text-sm font-bold text-gray-900">{missedCalls}</span>
      );
    },
  },
  {
    key: "totalTalkTime",
    label: "Total Talk Time",
    width: "130px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value) => (
      <span className="text-sm text-gray-700">{formatDuration(value)}</span>
    ),
  },
  {
    key: "avgDuration",
    label: "Avg Duration",
    width: "120px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value) => (
      <span className="text-sm text-gray-700">{formatDuration(value)}</span>
    ),
  },
  {
    key: "conversions",
    label: "Conversions",
    width: "110px",
    headerClassName: "text-right",
    cellClassName: "text-right",
    render: (value, row) => {
      const conversions = value || 0;
      const totalCalls = row.totalCalls || 0;
      const conversionRate = totalCalls > 0 ? Math.round((conversions / totalCalls) * 100) : 0;
      return (
        <div>
          <p className="text-sm font-bold text-gray-900 m-0">{conversions}</p>
          <p className="text-xs text-green-600 m-0">{conversionRate}% rate</p>
        </div>
      );
    },
  },
  {
    key: "recordingsCount",
    label: "Recordings",
    width: "120px",
    headerClassName: "text-right",
    cellClassName: "text-right flex justify-end",
    render: (value) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
          <span className="material-symbols-outlined text-[18px]">mic</span>
        </div>
        <span className="text-sm font-bold">{value || 0}</span>
      </div>
    ),
  },
  {
    key: "lastActive",
    label: "Last Active",
    width: "160px",
    render: (value) => (
      <span className="text-sm text-gray-700">{formatDate(value)}</span>
    ),
  },
];

// ── Component ──

export default function CallReportsTable({
  data,
  onRowClick,
  paginationProps,
}) {
  const columns = getColumns(onRowClick);

  return (
    <TableCard>
      <DataTable
        columns={columns}
        data={data}
        rowKey="userId"
        selectable={false}
        onRowClick={onRowClick}
        renderRowActions={(row) => (
          <ActionMenu
            actions={[
              {
                label: "View Logs",
                onClick: () => onRowClick(row),
              },
            ]}
          />
        )}
        emptyState={
          <div className="flex flex-col items-center gap-2">
            <span className="material-symbols-outlined text-4xl text-gray-300">phone_disabled</span>
            <span className="text-sm font-medium text-gray-800">No Call Reports Found</span>
          </div>
        }
      />

      <TablePagination
        mode="page"
        {...paginationProps}
      />
    </TableCard>
  );
}
