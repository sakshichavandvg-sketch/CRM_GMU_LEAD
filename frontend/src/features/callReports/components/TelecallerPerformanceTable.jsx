"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ChevronRight, UserCircle2 } from "lucide-react";
import { useCallReportsSummary } from "../hooks/useCallReports";
import DataTable from "@/components/table/DataTable";
import ManagementHeader from "@/components/management/ManagementHeader";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { EmptyState } from "@/components/dashboard-ui/EmptyState";
import { PhoneOff } from "lucide-react";

const COLUMNS = [
  {
    key: "name",
    label: "Telecaller",
    render: (value, row) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#7A1F2B] text-white flex items-center justify-center text-xs font-[700] shrink-0">
          {value
            ? value.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
            : <UserCircle2 size={16} />}
        </div>
        <span className="font-[600] text-gray-900">{value || "—"}</span>
      </div>
    ),
  },
  {
    key: "totalCalls",
    label: "Total Calls",
    render: (value) => (
      <span className="font-[600] text-gray-800">{value ?? "—"}</span>
    ),
  },
  {
    key: "connectedCalls",
    label: "Connected",
    render: (value, row) => {
      const total = row.totalCalls || 0;
      const connected = value || 0;
      const rate = total > 0 ? Math.round((connected / total) * 100) : 0;
      return (
        <div className="flex flex-col">
          <span className="font-[600] text-gray-800">{connected}</span>
          <span className="text-xs text-gray-400">{rate}% rate</span>
        </div>
      );
    },
  },
  {
    key: "avgDuration",
    label: "Avg Duration",
    render: (value) => {
      if (!value && value !== 0) return <span className="text-gray-400">—</span>;
      const mins = Math.floor(value / 60);
      const secs = value % 60;
      return (
        <span className="font-mono text-gray-700">
          {mins}m {secs}s
        </span>
      );
    },
  },
  {
    key: "recordingsCount",
    label: "Recordings",
    render: (value) => (
      <div className="flex items-center gap-1.5">
        <Phone size={13} className="text-gray-400" />
        <span className="text-gray-700">{value ?? 0}</span>
      </div>
    ),
  },
  {
    key: "lastActive",
    label: "Last Active",
    render: (value) => {
      if (!value) return <span className="text-gray-400">—</span>;
      return (
        <span className="text-sm text-gray-600">
          {new Date(value).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
];

export default function TelecallerPerformanceTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, isError } = useCallReportsSummary(
    { search },
    page,
    pageSize
  );

  const rows = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data?.users)
    ? data.users
    : Array.isArray(data)
    ? data
    : [];

  const totalPages = data?.totalPages ?? (rows.length > 0 ? 1 : 0);
  const totalItems = data?.totalElements ?? data?.totalItems ?? rows.length;

  const handleRowClick = (row) => {
    const id = row.userId ?? row.slNo ?? row.id ?? row.empId;
    if (id) {
      router.push(`/dashboard/management/call-reports/${id}`);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ManagementHeader
          title="Call Reports"
          description="Monitor telecaller activity and call performance"
          activeTab="calls"
          search={search}
          setSearch={setSearch}
        />
        <TableSkeleton rows={8} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-6">
        <ManagementHeader
          title="Call Reports"
          description="Monitor telecaller activity and call performance"
          activeTab="calls"
          search={search}
          setSearch={setSearch}
        />
        <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-red-200 bg-red-50/30 text-center">
          <p className="text-sm font-[600] text-red-600">Failed to load call reports</p>
          <p className="text-xs text-red-400 mt-1">Check your connection and try again</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0">
      <ManagementHeader
        title="Call Reports"
        description="Monitor telecaller activity and call performance"
        activeTab="calls"
        search={search}
        setSearch={setSearch}
      />

      {totalItems === 0 && !isLoading && !isError ? (
        <div className="flex-1 min-h-[300px] flex items-center justify-center">
          <EmptyState 
            title="No Call Reports Found" 
            description={search ? "No telecallers match your search criteria." : "There are no call reports available yet."}
            icon={PhoneOff} 
          />
        </div>
      ) : (
        <DataTable
          columns={COLUMNS}
          data={rows}
          rowKey="userId"
          selectable={false}
          density="compact"
          onRowClick={handleRowClick}
          renderRowActions={(row) => (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick(row);
              }}
              className="flex items-center gap-1 text-xs font-[600] text-[#7A1F2B] hover:underline"
            >
              View Logs <ChevronRight size={14} />
            </button>
          )}
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
    </div>
  );
}
