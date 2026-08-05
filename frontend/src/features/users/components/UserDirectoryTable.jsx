import React from "react";
import DataTable from "@/components/table/DataTable";
import ActionMenu from "@/components/table/ActionMenu";
import Badge from "@/components/ui/Badge";

// ── Column Definitions ──

const getColumns = (onView) => [
  {
    key: "index",
    label: "SL No",
    width: "90px",
    render: (_, row) => (
      <span className="text-sm text-gray-500 font-medium">{row._index}</span>
    ),
  },
  {
    key: "role",
    label: "Role",
    width: "140px",
    render: (value, row) => {
      const isAdmin = String(row.role || "").toLowerCase() === "admin";
      const roleDisplay = row.role || "Telecaller";
      return isAdmin ? (
        <Badge variant="purple" dot={false}>
          <span className="material-symbols-outlined text-sm mr-0.5">shield</span>
          {roleDisplay}
        </Badge>
      ) : (
        <Badge variant="neutral" dot={false}>
          <span className="material-symbols-outlined text-sm mr-0.5">person</span>
          {roleDisplay}
        </Badge>
      );
    },
  },
  {
    key: "name",
    label: "Name / Email",
    width: "260px",
    render: (value, row) => (
      <div className="flex flex-col">
        <span className="text-sm font-bold text-gray-900">{row.name || "Unknown"}</span>
        <span className="text-xs text-gray-400">{row.email || "-"}</span>
      </div>
    ),
  },
  {
    key: "phoneNo",
    label: "Phone No",
    width: "170px",
    render: (value, row) => (
      <div className="flex items-center gap-2 text-gray-700">
        <span className="material-symbols-outlined text-[#8B0D16] text-lg">call</span>
        <span className="text-sm">{row.phoneNo || "-"}</span>
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "140px",
    render: (value, row) => {
      const isActive = String(row.status || "").toLowerCase() === "active";
      return (
        <Badge variant={isActive ? "success" : "danger"} dot>
          {isActive ? "Active" : "Inactive"}
        </Badge>
      );
    },
  },
  {
    key: "empId",
    label: "Emp ID",
    width: "100px",
    render: (value) => (
      <span className="text-sm text-gray-600">{value || "-"}</span>
    ),
  },
  {
    key: "username",
    label: "Username",
    width: "120px",
    render: (value) => (
      <span className="text-sm text-gray-600">{value || "-"}</span>
    ),
  },
  {
    key: "programme",
    label: "Programme",
    width: "100px",
    render: (value) => (
      <Badge variant="purple" dot={false} className="text-[10px] font-black uppercase">
        {value || "ALL"}
      </Badge>
    ),
  },
  {
    key: "course",
    label: "Course",
    width: "100px",
    render: (value) => (
      <span className="text-sm text-gray-600">{value || "-"}</span>
    ),
  },
  {
    key: "discipline",
    label: "Discipline",
    width: "120px",
    render: (value) => (
      <span className="text-sm text-gray-600">{value || "-"}</span>
    ),
  },
];

// ── Component ──

export default function UserDirectoryTable({ users = [], onView }) {
  // Add _index for SL No column
  const indexedUsers = users.map((user, index) => ({ ...user, _index: index + 1 }));

  const columns = getColumns(onView);

  return (
    <DataTable
      columns={columns}
      data={indexedUsers}
      rowKey="empId"
      selectable={false}
      onRowClick={onView}
      renderRowActions={(row) => (
        <ActionMenu
          actions={[
            { label: "View Details", onClick: () => onView && onView(row) },
          ]}
        />
      )}
      emptyState={
        <div className="flex flex-col items-center gap-2">
          <span className="material-symbols-outlined text-4xl text-gray-300">people</span>
          <span className="text-sm font-medium text-gray-800">No Telecallers Found</span>
        </div>
      }
    />
  );
}
