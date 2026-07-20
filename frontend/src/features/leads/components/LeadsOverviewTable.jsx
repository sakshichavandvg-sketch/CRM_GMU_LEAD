"use client";

import { useState } from "react";
import SearchBar from "@/components/management/SearchBar";
import BulkActionBar from "@/components/table/BulkActionBar";
import DataTable from "@/components/table/DataTable";
import Pagination from "@/components/table/Pagination";
import StatusBadge from "@/components/table/StatusBadge";
import { TableSkeleton } from "@/components/ui/Skeletons";

import { useLeadOverviewFilters } from "../hooks/useLeadOverviewFilters";
import { useLeadOverview } from "../hooks/useLeadOverview";
import { useLeadFilterOptions } from "../hooks/useLeadFilterOptions";
import { LEAD_BUCKETS } from "../constants/leadConstants";

import LeadFilters from "./LeadFilters";
import LeadDetailsDialog from "./LeadDetailsDialog";

const columns = [
  { key: "enquiryNo", label: "Enquiry No" },
  { key: "name", label: "Name" },
  { key: "mobileNo", label: "Mobile" },
  { key: "course", label: "Course" },
  { key: "source", label: "Source" },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value} />,
  },
];

export default function LeadsOverviewTable() {
  const { search, filters, actions } = useLeadOverviewFilters("hot");

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  
  const { data: filterOptions } = useLeadFilterOptions();
  const { data, isLoading, isError, error } = useLeadOverview(filters);

  // When a row is clicked, we want to open the details dialog
  const handleRowClick = (lead) => {
    setSelectedLeadId(lead.enquiryNo);
  };

  return (
    <>
      <div className="space-y-6">
        {/* Bucket Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          {LEAD_BUCKETS.map((bucket) => (
            <button
              key={bucket.id}
              onClick={() => actions.setType(bucket.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                filters.type === bucket.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-600 hover:bg-gray-100 border-gray-200"
              }`}
            >
              {bucket.label}
            </button>
          ))}
        </div>

        {/* Filters */}
        <LeadFilters filters={filters} actions={actions} options={filterOptions} />

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchBar
              value={search}
              onChange={actions.setSearch}
              placeholder="Search leads..."
            />
          </div>
        </div>

        <BulkActionBar
          selectedCount={selectedRows.length}
          onClear={() => setSelectedRows([])}
        />

        {isLoading ? (
          <TableSkeleton rows={5} columns={6} />
        ) : isError ? (
          <div className="py-10 text-center text-red-500">
            {error?.response?.data?.message || "Failed to load leads."}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
            <DataTable
              columns={columns}
              data={data?.leads ?? []}
              rowKey="enquiryNo"
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              onRowClick={handleRowClick}
            />
          </div>
        )}

        <Pagination
          currentPage={(data?.currentPage ?? 0) + 1}
          totalPages={data?.totalPages ?? 1}
          totalItems={data?.totalItems ?? 0}
          pageSize={filters.size}
          onPageChange={(page) => actions.setPage(page - 1)}
        />
      </div>

      <LeadDetailsDialog
        open={!!selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        enquiryNo={selectedLeadId}
      />
    </>
  );
}
