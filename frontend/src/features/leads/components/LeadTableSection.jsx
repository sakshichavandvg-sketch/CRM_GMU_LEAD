import React, { useMemo } from "react";
import LeadsDataTable from "./LeadsDataTable";
import TableCard from "@/components/table/TableCard";
import TablePagination from "@/components/table/TablePagination";
import { TableSkeleton } from "@/components/ui/Skeletons";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function LeadTableSection({
  data,
  selectedRows,
  setSelectedRows,
  onRowClick,
  isLoading,
  isError,
  error,
  isFetching,
  pagination,
  onRetry,
  onOpenFilters
}) {
  const memoizedData = useMemo(() => data, [data]);

  // Initial load skeleton
  if (isLoading) {
    return <TableSkeleton rows={8} columns={6} />;
  }

  // Error state with no data
  if (isError && (!data || data.length === 0)) {
    return (
      <div className="py-10 flex flex-col items-center justify-center text-red-500 bg-white rounded-xl border border-gray-200">
        <AlertCircle className="w-8 h-8 mb-2 opacity-80" />
        <p className="text-sm">{error?.response?.data?.message || error?.message || "Failed to load leads."}</p>
        <button
          onClick={onRetry}
          className="mt-4 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded-md text-sm font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="relative">
      {/* Table toolbar — page context, outside the table card */}
      <div className="px-1 pb-4 flex justify-between items-center">
        <h4 className="text-xl font-semibold text-gray-900">
          {pagination?.totalItems || 0} Leads Found
        </h4>
        <div className="flex items-center gap-4">
          <button
            onClick={onOpenFilters}
            className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2 hover:bg-gray-50 hover:text-[#6F1D28] transition-all text-sm font-medium text-gray-700 shadow-sm"
          >
            Refine Filters
            <span className="material-symbols-outlined text-[18px] text-gray-500">tune</span>
          </button>
        </div>
      </div>

      {/* Table Card: DataTable + TablePagination */}
      <TableCard>
        <LeadsDataTable
          data={memoizedData}
          selectedRows={selectedRows}
          setSelectedRows={setSelectedRows}
          onRowClick={onRowClick}
        />

        <TablePagination
          mode="page"
          currentPage={pagination?.currentPage || 0}
          pageSize={pagination?.pageSize || 10}
          totalPages={pagination?.totalPages || 1}
          totalItems={pagination?.totalItems || 0}
          onPageChange={pagination?.onPageChange}
          onPageSizeChange={pagination?.onPageSizeChange}
        />
      </TableCard>

      {/* Fetching overlay (background page transitions) */}
      {isFetching && !isLoading && !isError && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-30 flex items-center justify-center pointer-events-none rounded-[22px]">
          <div className="bg-white p-3 rounded-full shadow-lg border border-gray-100 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-gray-200 border-t-[#6F1D28] rounded-full animate-spin" />
          </div>
        </div>
      )}

      {/* Error overlay (stale data present but page refetch failed) */}
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
    </section>
  );
}
