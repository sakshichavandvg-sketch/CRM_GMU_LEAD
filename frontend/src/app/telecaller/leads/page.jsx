"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import DataTable from "@/components/table/DataTable";
import StatusBadge from "@/components/table/StatusBadge";
import { useTelecallerLeads } from "@/features/telecaller/hooks/useMyLeads";
import { TableSkeleton } from "@/components/ui/Skeletons";

export default function TelecallerLeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [selectedRows, setSelectedRows] = useState([]);
  
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);

  const {
    data,
    isLoading,
    error,
  } = useTelecallerLeads({ search: searchTerm }, page, size);

  // Client-side filtering as fallback in case backend doesn't filter
  let allLeads = data?.leads || [];
  if (searchTerm && allLeads.length > 0) {
    const lowerSearch = searchTerm.toLowerCase();
    allLeads = allLeads.filter(l => 
      l.name?.toLowerCase().includes(lowerSearch) || 
      l.mobileNo?.includes(lowerSearch) ||
      l.enquiryNo?.toString().includes(lowerSearch)
    );
  }

  const totalItems = data?.totalItems || allLeads.length;
  const totalPages = data?.totalPages || Math.ceil(allLeads.length / size);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
    setPage(0);
    // Update URL without reload
    const newUrl = new URL(window.location);
    if (searchInput) newUrl.searchParams.set("search", searchInput);
    else newUrl.searchParams.delete("search");
    window.history.pushState({}, '', newUrl);
  };

  const columns = [
    {
      key: "enquiryNo",
      label: "Enquiry No",
      render: (val) => <span className="font-semibold text-gray-900">#{val}</span>
    },
    {
      key: "name",
      label: "Name",
      render: (val, row) => (
        <div>
          <span className="font-semibold text-gray-900 block">{val}</span>
          <span className="text-xs text-gray-500">{row.mobileNo}</span>
        </div>
      )
    },
    { key: "course", label: "Course" },
    {
      key: "status",
      label: "Status",
      render: (val) => <StatusBadge status={val} />
    },
    { key: "opinion", label: "Opinion" },
    { key: "callCount", label: "Calls", render: (val) => <span className="text-gray-600">{val}</span> },
    {
      key: "location",
      label: "Location",
      render: (_, row) => (
        <div className="text-sm">
          <span className="block">{row.district || "-"}</span>
          <span className="text-xs text-gray-500">{row.state || "-"}</span>
        </div>
      )
    },
    { key: "source", label: "Source" }
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100">
          Failed to load leads. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FB] -m-4 sm:-m-6 p-4 sm:p-6 pb-12 flex flex-col h-[calc(100vh-72px)] overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Leads</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">
            {isLoading ? "Loading leads..." : `Showing ${allLeads.length} of ${totalItems} assigned leads`}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative w-full sm:w-auto min-w-[280px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search leads by name, phone..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#6F1D28]/20 focus:border-[#6F1D28] transition-all placeholder:text-gray-400 shadow-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        {isLoading ? (
          <div className="mt-2">
            <TableSkeleton rows={8} columns={8} />
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={allLeads}
            rowKey="enquiryNo"
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            selectable={true}
            onRowClick={(row) => router.push(`/telecaller/leads/${row.enquiryNo}`)}
            pagination={{
              currentPage: page,
              pageSize: size,
              totalPages,
              totalItems,
              onPageChange: setPage,
              onPageSizeChange: (newSize) => {
                setSize(newSize);
                setPage(0);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
