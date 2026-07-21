"use client";

import { useState, useMemo } from "react";

import Button from "@/components/ui/Button";

import SearchBar from "@/components/management/SearchBar";

import BulkActionBar from "@/components/table/BulkActionBar";
import DataTable from "@/components/table/DataTable";
import StatusBadge from "@/components/table/StatusBadge";
import { TableSkeleton } from "@/components/ui/Skeletons";

import EditUserDialog from "./components/EditUserDialog";
import UserTableActions from "./components/UserTableActions";

import useInfiniteUsers from "./useInfiniteUsers";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";

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

  const [selectedRows, setSelectedRows] =
    useState([]);

  const [isEditOpen, setIsEditOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] =
    useState(null);

  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteUsers({
    size: 10,
    search,
  });

  const loadMoreRef = useInfiniteScrollObserver({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const usersData = useMemo(() => {
    return data?.pages?.flatMap(page => page?.users ?? page?.content ?? []) ?? [];
  }, [data]);

  const totalResults = data?.pages?.[0]?.totalItems ?? data?.pages?.[0]?.page?.totalElements ?? 0;

  const handleEdit = (user) => {
    console.log("Edit:", user);

    setSelectedUser(user);

    setIsEditOpen(true);
  };

  if (isLoading) {
    return <TableSkeleton rows={5} columns={5} />;
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
              placeholder="Search telecallers..."
            />
          </div>

        </div>

        <BulkActionBar
          selectedCount={selectedRows.length}
          onClear={() =>
            setSelectedRows([])
          }
        />

        <DataTable
          density="compact"
          columns={columns}
          data={usersData}
          rowKey="slNo"
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          renderRowActions={(user) => (
            <UserTableActions
              user={user}
              onEdit={handleEdit}
            />
          )}
        />

        {!isLoading && !isError && totalResults === 0 && (
          <div className="py-16 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
            <p className="text-lg font-medium">No Telecallers Found</p>
          </div>
        )}

        {!isLoading && !isError && totalResults > 0 && (
          <div className="py-6 text-center text-sm text-gray-500 font-medium">
            {hasNextPage ? (
              <div ref={loadMoreRef} className="flex items-center justify-center gap-2">
                {isFetchingNextPage ? (
                  <>
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                    <span>Loading more telecallers...</span>
                  </>
                ) : (
                  "Scroll for more"
                )}
              </div>
            ) : (
              "End of Results"
            )}
          </div>
        )}

      </div>

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