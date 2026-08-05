import React from "react";
import TablePagination from "@/components/table/TablePagination";

/**
 * UserPagination — thin wrapper around TablePagination in loadMore mode.
 * Preserves the infinite-scroll data loading strategy.
 */
export default function UserPagination({
  totalResults = 0,
  currentCount = 0,
  hasNextPage,
  fetchNextPage,
  isFetchingNextPage
}) {
  return (
    <TablePagination
      mode="loadMore"
      totalItems={totalResults}
      currentCount={currentCount}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  );
}
