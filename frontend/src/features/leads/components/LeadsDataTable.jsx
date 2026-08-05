"use client";

import React from "react";
import DataTable from "@/components/table/DataTable";
import ActionMenu from "@/components/table/ActionMenu";
import Badge from "@/components/ui/Badge";

// ── Helpers (preserved from original) ──

const getInitials = (name) => {
  if (!name) return "?";
  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
};

const getAvatarColor = (name) => {
  const colors = [
    "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500",
    "bg-pink-500", "bg-teal-500", "bg-red-500", "bg-indigo-500"
  ];
  if (!name) return colors[0];
  const idx = name.charCodeAt(0) % colors.length;
  return colors[idx];
};

const formatDate = (dateString) => {
  if (!dateString) return { date: "-", time: "-" };
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return { date: "-", time: "-" };
    const date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { date, time };
  } catch {
    return { date: "-", time: "-" };
  }
};

const getStatusVariant = (status) => {
  const s = (status || "").toLowerCase().replace(/_/g, " ");
  if (s.includes("hot")) return "orange";
  if (s.includes("cold")) return "blue";
  if (s.includes("converted") || s.includes("alloted") || s.includes("allotted")) return "success";
  if (s.includes("not interest")) return "danger";
  if (s.includes("not consulted")) return "rose";
  if (s.includes("completed")) return "success";
  if (s.includes("enquiry") || s.includes("new")) return "info";
  return "neutral";
};

const getSourceIcon = (source) => {
  const s = (source || "").toLowerCase();
  if (s.includes("referral")) return { icon: "group", color: "text-purple-500" };
  if (s.includes("instagram") || s.includes("social")) return { icon: "camera_enhance", color: "text-pink-500" };
  if (s.includes("walk")) return { icon: "directions_walk", color: "text-green-500" };
  if (s.includes("web") || s.includes("online")) return { icon: "language", color: "text-blue-500" };
  if (s.includes("phone") || s.includes("call")) return { icon: "call", color: "text-indigo-500" };
  return { icon: "public", color: "text-gray-400" };
};

// ── Column Definitions ──

const COLUMNS = [
  {
    key: "enquiryNo",
    label: "Enquiry No",
    width: "90px",
    render: (value, row) => (
      <span className="text-sm font-bold text-[#8B0D16]">
        #{row.enquiryNo || row.id}
      </span>
    ),
  },
  {
    key: "name",
    label: "Student",
    width: "260px",
    render: (value, row) => (
      <div className="flex items-center gap-3 min-w-[140px]">
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(row.name)}`}>
          {getInitials(row.name)}
        </div>
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold text-gray-900 truncate">{row.name || "-"}</span>
          <span className="text-xs text-gray-400 truncate">{row.email || "-"}</span>
        </div>
      </div>
    ),
  },
  {
    key: "mobileNo",
    label: "Mobile",
    width: "140px",
    render: (value, row) => (
      <div className="flex items-center gap-1.5 text-gray-600">
        <span className="material-symbols-outlined text-[16px] text-gray-400">call</span>
        <span className="text-sm">{row.mobileNo || row.mobile || "-"}</span>
      </div>
    ),
  },
  {
    key: "course",
    label: "Course",
    width: "140px",
    render: (value, row) => (
      <div className="flex flex-col min-w-[80px]">
        <span className="text-sm font-medium text-gray-800">{value || row.course || row?.education?.course || row.programme || "-"}</span>
        <span className="text-xs text-gray-400">Session {new Date().getFullYear()}</span>
      </div>
    ),
  },
  {
    key: "source",
    label: "Source",
    width: "140px",
    render: (value, row) => {
      const sourceData = getSourceIcon(row.source);
      return (
        <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
          <span className={`material-symbols-outlined text-[15px] ${sourceData.color}`}>{sourceData.icon}</span>
          <span className="text-xs font-medium text-gray-600">{row.source || "Unknown"}</span>
        </div>
      );
    },
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (value, row) => (
      <Badge variant={getStatusVariant(row.status)} dot>
        {row.status || "NEW"}
      </Badge>
    ),
  },
  {
    key: "assignedUser",
    label: "Assigned To",
    width: "200px",
    render: (value, row) => {
      // The actual backend contract returns the assigned telecaller in the 'callerName' field
      const assignedName = row.callerName || "Unassigned";
      
      return (
        <div className="flex items-center gap-2 min-w-[110px]">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(assignedName)}`}>
            {getInitials(assignedName)}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-semibold text-gray-800 truncate">{assignedName}</span>
            <span className="text-[11px] text-gray-400 truncate">Telecaller</span>
          </div>
        </div>
      );
    },
  },
  {
    key: "createdAt",
    label: "Created On",
    width: "160px",
    cellClassName: "whitespace-nowrap",
    render: (value, row) => {
      const { date: createdDate, time: createdTime } = formatDate(value || row.createdAt || row.createdDate || row.created_at || row.date || row?.lead?.createdAt);
      return (
        <div className="flex flex-col">
          <span className="text-sm text-gray-700">{createdDate}</span>
          <span className="text-xs text-gray-400">{createdTime}</span>
        </div>
      );
    },
  },
];

// ── Component ──

export default function LeadsDataTable({
  data = [],
  selectedRows = [],
  setSelectedRows,
  onRowClick,
  pagination,
  loading = false,
}) {
  return (
    <DataTable
      columns={COLUMNS}
      data={data}
      selectedRows={selectedRows}
      setSelectedRows={setSelectedRows}
      rowKey="enquiryNo"
      onRowClick={onRowClick}
      selectable={true}
      loading={loading}
      renderRowActions={(row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (onRowClick) onRowClick(row);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-[#6F1D28] transition-colors shadow-sm"
        >
          <span className="material-symbols-outlined text-[18px]">visibility</span>
          View
        </button>
      )}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-4xl text-gray-300">folder_open</span>
          <span className="text-sm text-gray-500">No leads found</span>
        </div>
      }
    />
  );
}
