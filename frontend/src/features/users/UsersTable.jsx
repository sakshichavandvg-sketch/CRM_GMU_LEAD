"use client";

import { useState } from "react";

import Button from "@/components/ui/Button";

import SearchBar from "@/components/management/SearchBar";

import BulkActionBar from "@/components/table/BulkActionBar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/table/Pagination";
import StatusBadge from "@/components/table/StatusBadge";

import AddUserDialog from "./components/AddUserDialog";
import EditUserDialog from "./components/EditUserDialog";
import UserTableActions from "./components/UserTableActions";

import useUsers from "./useUsers";
import useToggleUser from "../useToggleUser";

const columns = [
  {
    key: "empId",
    label: "Employee ID",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "username",
    label: "Username",
  },
  {
    key: "phoneNo",
    label: "Phone",
  },
  {
    key: "status",
    label: "Status",
    render: (value) => (
      <StatusBadge status={value} />
    ),
  },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [isAddOpen, setIsAddOpen] =
    useState(false);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useUsers({
    page,
    size: 10,
    search,
  });

  const {
    mutate: toggleStatus,
  } = useToggleUser({
    onSuccess: () => {
      console.log("User status updated.");
    },
  });

  const handleEdit = (user) => {
    console.log("Edit:", user);

    setSelectedUser(user);

    setIsEditOpen(true);
  };

  const handleToggleStatus = (user) => {
    console.log("Toggle:", user);

    toggleStatus(user.slNo);
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-slate-500">
        Loading users...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search users..."
            />
          </div>

          <Button
            fullWidth={false}
            onClick={() => setIsAddOpen(true)}
          >
            Add User
          </Button>

        </div>

        <BulkActionBar
          selectedCount={selectedRows.length}
          onClear={() =>
            setSelectedRows([])
          }
        />

        <DataTable
          columns={columns}
          data={data?.users ?? []}
          rowKey="slNo"
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          renderRowActions={(user) => (
            <UserTableActions
              user={user}
              onEdit={handleEdit}
              onToggleStatus={
                handleToggleStatus
              }
            />
          )}
        />

        <Pagination
          currentPage={
            (data?.currentPage ?? 0) + 1
          }
          totalPages={
            data?.totalPages ?? 1
          }
          totalItems={
            data?.totalItems ?? 0
          }
          pageSize={
            data?.pageSize ?? 10
          }
          onPageChange={(page) =>
            setPage(page - 1)
          }
        />

      </div>

      <AddUserDialog
        open={isAddOpen}
        onClose={() =>
          setIsAddOpen(false)
        }
      />

      <EditUserDialog
        open={isEditOpen}
        user={selectedUser}
        onClose={() => {
          setIsEditOpen(false);
          setSelectedUser(null);
        }}
      />
    </>
  );
}