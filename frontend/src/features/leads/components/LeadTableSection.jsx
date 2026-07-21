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
      <div className="py-10 text-center text-red-500 bg-white rounded-xl shadow-sm border border-gray-200">
        {error?.response?.data?.message || error?.message || "Failed to load leads."}
      </div>
    );
  }

  if (totalResults === 0) {
    return (
      <div className="py-16 text-center text-gray-500 bg-white rounded-xl shadow-sm border border-gray-200">
        <p className="text-lg font-medium">No Leads Found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1">
        <MemoizedDataTable
          columns={memoizedColumns}
          data={memoizedData}
          rowKey="enquiryNo"
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onRowClick={onRowClick}
        />
      </div>

      <div className="py-4 text-center text-sm text-gray-500 font-medium">
        {hasNextPage ? (
          <div ref={loadMoreRef} className="flex items-center justify-center gap-2">
            {isFetchingNextPage ? (
              <>
                <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
                <span>Loading more leads...</span>
              </>
            ) : (
              "Scroll for more"
            )}
          </div>
        ) : (
          "End of Results"
        )}
      </div>
    </div>
  );
}
