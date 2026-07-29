import React, { useMemo } from "react";
import DataTable from "@/components/table/DataTable";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { AlertCircle, RefreshCw } from "lucide-react";

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
  isFetching,
  pagination,
  onRetry
}) {
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);

  // Initial load
  if (isLoading) {
    return <TableSkeleton rows={8} columns={6} />;
  }

  // If we have absolutely no data and it's an error
  if (isError && (!data || data.length === 0)) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-red-500 bg-white rounded-xl border border-gray-200">
        <AlertCircle className="w-8 h-8 mb-2 opacity-80" />
        <p>{error?.response?.data?.message || error?.message || "Failed to load leads."}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-md font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!isError && data?.length === 0 && pagination.totalItems === 0) {
    return (
      <div className="py-16 text-center text-gray-500 bg-white rounded-xl border border-gray-200">
        <p className="text-lg font-medium">No Leads Found</p>
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col relative">
      <MemoizedDataTable
        columns={memoizedColumns}
        data={memoizedData}
        rowKey="enquiryNo"
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
        onRowClick={onRowClick}
        pagination={pagination}
      />
      
      {/* Loading Overlay (for background fetches / page transitions) */}
      {isFetching && !isLoading && !isError && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-30 flex items-center justify-center pointer-events-none rounded-[22px]">
          <div className="bg-white p-3 rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#6F1D28] rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error Overlay (when we have data but the background fetch failed) */}
      {isError && data?.length > 0 && (
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px] z-30 flex items-center justify-center rounded-[22px]">
          <div className="bg-white p-6 rounded-xl shadow-xl border border-red-100 flex flex-col items-center max-w-sm text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-900 mb-1">Failed to load page</h3>
            <p className="text-sm text-gray-500 mb-4">There was a problem fetching the requested page. Please try again.</p>
            <button
              onClick={onRetry}
              className="flex items-center gap-2 px-5 py-2 bg-[#6F1D28] text-white hover:bg-[#5a1720] rounded-lg font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
