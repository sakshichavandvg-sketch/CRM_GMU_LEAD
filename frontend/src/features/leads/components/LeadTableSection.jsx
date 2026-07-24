import React, { useMemo } from "react";
import DataTable from "@/components/table/DataTable";
import { TableSkeleton } from "@/components/ui/Skeletons";

const MemoizedDataTable = React.memo(DataTable);

export default function LeadTableSection({
  columns,
  data,
  selectedRows,
  setSelectedRows,
  onRowClick,
  isLoading,
  isError,
  error,
  hasNextPage,
  isFetchingNextPage,
  loadMoreRef,
  totalResults
}) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  if (isLoading) {
    return <TableSkeleton rows={8} columns={6} />;
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500 bg-white rounded-xl border border-gray-200">
        {error?.response?.data?.message ||
          error?.message ||
          "Failed to load leads."}
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="py-16 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
        <p className="text-lg font-medium">No Leads Found</p>
      </div>
    );
  }

  return (
    // This is the one container that holds height. flex-1 + min-h-0 lets it
    // shrink to fit the parent flex column and give DataTable a real height.
    <div className="flex-1 min-h-0 flex flex-col">
      <MemoizedDataTable
        columns={memoizedColumns}
        data={memoizedData}
        rowKey="enquiryNo"
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={onRowClick}
        // Pass the sentinel and pagination state so DataTable can render it
        // inside the scroll container where the IntersectionObserver can fire.
        loadMoreRef={loadMoreRef}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
      />
    </div>
  );
}
