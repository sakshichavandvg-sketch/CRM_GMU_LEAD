"use client";

import { useState, useMemo } from "react";

import Button from "@/components/ui/Button";

import SearchBar from "@/components/management/SearchBar";

import BulkActionBar from "@/components/table/BulkActionBar";
import DataTable from "@/components/table/DataTable";
import StatusBadge from "@/components/table/StatusBadge";
import { TableSkeleton } from "@/components/ui/Skeletons";

import { useRouter } from "next/navigation";

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

import UserKPICards from "./components/UserKPICards";
import UserToolbar from "./components/UserToolbar";
import UserDirectoryTable from "./components/UserDirectoryTable";
import UserPagination from "./components/UserPagination";

export default function UsersTable() {
  const router = useRouter();
  const [search, setSearch] = useState("");

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

  const usersData = useMemo(() => {
    return data?.pages?.flatMap(page => page?.users ?? page?.content ?? []) ?? [];
  }, [data]);

  const totalResults = data?.pages?.[0]?.totalItems ?? data?.pages?.[0]?.page?.totalElements ?? 0;

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
    <div className="p-page-padding space-y-section-gap font-body-sm">
      <UserKPICards users={usersData} totalResults={totalResults} />
      
      <UserToolbar search={search} onSearchChange={setSearch} />
      
      <div className="flex flex-col">
        <UserDirectoryTable 
          users={usersData} 
          onView={(user) => router.push(`/dashboard/management/user-directory/${user.empId}`)} 
        />
        
        {totalResults === 0 ? (
          <div className="py-16 text-center text-gray-500 bg-white rounded-b-card shadow-sm border border-t-0 border-[#E8EAF2]">
            <p className="text-lg font-medium">No Telecallers Found</p>
          </div>
        ) : (
          <UserPagination 
            totalResults={totalResults}
            currentCount={usersData.length}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
      
      {/* Bottom Space for Scroll Breathability */}
      <div className="h-10"></div>
    </div>
  );
}