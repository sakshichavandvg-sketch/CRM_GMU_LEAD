"use client";

import { useState, useMemo } from "react";

import { TableSkeleton } from "@/components/ui/Skeletons";
import TableCard from "@/components/table/TableCard";

import { useRouter } from "next/navigation";

import useInfiniteUsers from "./useInfiniteUsers";

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
      
      <TableCard>
        <UserDirectoryTable 
          users={usersData} 
          onView={(user) => router.push(`/dashboard/management/user-directory/${user.empId}`)} 
        />
        
        {totalResults > 0 && (
          <UserPagination 
            totalResults={totalResults}
            currentCount={usersData.length}
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </TableCard>
      
      {/* Bottom Space for Scroll Breathability */}
      <div className="h-10"></div>
    </div>
  );
}