"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, Phone, Eye, MoreVertical, X } from "lucide-react";
import TelecallerLeadsTable from "@/features/telecaller/components/leads/TelecallerLeadsTable";
import { useTelecallerLeads } from "@/features/telecaller/hooks/useMyLeads";
import { TableSkeleton } from "@/components/ui/Skeletons";

// Formatters
const toTitleCase = (str) => {
  if (!str) return "-";
  return str
    .toLowerCase()
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

const getStatusBadge = (status) => {
  const normalized = (status || "").toUpperCase().replace(/_/g, " ");
  let bgColor = "bg-gray-100";
  let textColor = "text-gray-700";

  if (normalized.includes("NEW") || normalized.includes("ENQUIRY")) {
    bgColor = "bg-blue-100";
    textColor = "text-blue-700";
  } else if (normalized.includes("NOT INTERESTED") || normalized.includes("COLD")) {
    bgColor = "bg-gray-100";
    textColor = "text-gray-600";
  } else if (normalized.includes("INTERESTED") || normalized.includes("WARM")) {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
  } else if (normalized.includes("ADMISSION") || normalized.includes("ENROLLED")) {
    bgColor = "bg-[#8B1538]/10";
    textColor = "text-[#8B1538]";
  } else if (normalized.includes("FOLLOW UP") || normalized.includes("PROGRESS")) {
    bgColor = "bg-orange-100";
    textColor = "text-orange-700";
  }

  return (
    <span className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${bgColor} ${textColor}`}>
      {normalized}
    </span>
  );
};

const getOpinionBadge = (opinion) => {
  const normalized = (opinion || "").toUpperCase();
  if (!normalized) return <span className="text-gray-400">-</span>;

  let bgColor = "bg-gray-100";
  let textColor = "text-gray-600";

  if (normalized.includes("INTERESTED") && !normalized.includes("NOT")) {
    bgColor = "bg-green-100";
    textColor = "text-green-700";
  } else if (normalized.includes("NOT INTERESTED")) {
    bgColor = "bg-gray-100";
    textColor = "text-gray-600";
  } else if (normalized.includes("PENDING") || normalized.includes("TIME")) {
    bgColor = "bg-yellow-100";
    textColor = "text-yellow-700";
  } else if (normalized.includes("CALLBACK") || normalized.includes("CALL BACK")) {
    bgColor = "bg-orange-100";
    textColor = "text-orange-700";
  }

  return (
    <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-md ${bgColor} ${textColor}`}>
      {toTitleCase(opinion)}
    </span>
  );
};

export default function TelecallerLeadsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [filters, setFilters] = useState({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const {
    data,
    isLoading,
    error,
  } = useTelecallerLeads({ search: searchTerm }, page, size);

  const uniqueOptions = {
    status: [...new Set((data?.leads || []).map(l => l.status).filter(Boolean))],
    course: [...new Set((data?.leads || []).map(l => l.course).filter(Boolean))],
    source: [...new Set((data?.leads || []).map(l => l.source).filter(Boolean))],
    opinion: [...new Set((data?.leads || []).map(l => l.opinion).filter(Boolean))],
    location: [...new Set((data?.leads || []).map(l => l.city || l.district).filter(Boolean))],
    calls: [...new Set((data?.leads || []).map(l => (l.callCount || 0).toString()))],
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const removeFilter = (key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
    setPage(0);
  };

  const clearAllFilters = () => {
    setFilters({});
    setPage(0);
  };

  const activeFilterKeys = Object.keys(filters).filter(k => filters[k]);
  const hasActiveFilters = activeFilterKeys.length > 0;

  let allLeads = data?.leads || [];
  
  // Apply Search
  if (searchTerm && allLeads.length > 0) {
    const lowerSearch = searchTerm.toLowerCase();
    allLeads = allLeads.filter(l => 
      l.name?.toLowerCase().includes(lowerSearch) || 
      l.mobileNo?.includes(lowerSearch) ||
      l.enquiryNo?.toString().includes(lowerSearch)
    );
  }

  // Apply Local Filters
  if (hasActiveFilters && allLeads.length > 0) {
    activeFilterKeys.forEach(key => {
      const val = filters[key];
      if (!val) return;
      allLeads = allLeads.filter(l => {
        if (key === 'status') return l.status === val;
        if (key === 'course') return l.course === val;
        if (key === 'source') return l.source === val;
        if (key === 'opinion') return l.opinion === val;
        if (key === 'location') return (l.city === val || l.district === val);
        if (key === 'calls') return (l.callCount || 0).toString() === val;
        return true;
      });
    });
  }

  const totalItems = data?.totalItems || allLeads.length;
  const totalPages = data?.totalPages || Math.ceil(allLeads.length / size);

  const handleRowClick = (row) => {
    router.push(`/telecaller/leads/${row.enquiryNo}`);
  };

  const columns = [
    {
      key: "enquiryNo",
      label: "Enquiry No",
      render: (val) => <span className="font-semibold text-gray-900">#{val}</span>
    },
    {
      key: "name",
      label: "Lead",
      render: (val, row) => {
        const titleCaseName = toTitleCase(val);
        const initials = getInitials(titleCaseName);
        return (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#8B1538]/10 text-[#8B1538] flex items-center justify-center font-bold text-sm shrink-0">
              {initials}
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 text-[15px]">{titleCaseName}</span>
              <span className="text-[13px] text-gray-500 font-medium">{row.mobileNo || "-"}</span>
            </div>
          </div>
        );
      }
    },
    { 
      key: "course", 
      label: "Course",
      render: (val) => {
        if (!val) return <span className="text-gray-400">-</span>;
        // Specifically upper case common acronyms like MCA, BCA, MBA
        const acr = ["MCA", "BCA", "MBA", "BTECH", "MTECH", "BBA"];
        const upper = val.toUpperCase();
        if (acr.includes(upper)) return <span className="font-medium text-gray-700">{upper}</span>;
        return <span className="font-medium text-gray-700">{toTitleCase(val)}</span>;
      }
    },
    {
      key: "status",
      label: "Status",
      render: (val) => getStatusBadge(val)
    },
    { 
      key: "opinion", 
      label: "Opinion",
      render: (val) => getOpinionBadge(val)
    },
    { 
      key: "callCount", 
      label: "Calls", 
      render: (val) => {
        const count = val || 0;
        return (
          <div className={`flex items-center gap-1.5 ${count > 0 ? "text-gray-700" : "text-gray-400"}`}>
            <Phone size={14} className={count > 0 ? "text-blue-500" : ""} />
            <span className="font-medium text-sm">{count}</span>
          </div>
        );
      }
    },
    {
      key: "location",
      label: "Location",
      render: (_, row) => {
        if (!row.city && !row.district && !row.state) return <span className="text-gray-400">-</span>;
        const main = row.city || row.district || "Unknown";
        const sub = row.state || "";
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-800">{toTitleCase(main)}</span>
            {sub && <span className="text-[12px] text-gray-500">{toTitleCase(sub)}</span>}
          </div>
        );
      }
    },
    { 
      key: "source", 
      label: "Source",
      render: (val) => <span className="text-gray-600 text-sm">{toTitleCase(val)}</span>
    }
  ];

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-50 text-red-700 rounded-2xl border border-red-100 font-medium">
          Failed to load leads. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F9FB] -m-4 sm:-m-6 p-4 sm:p-6 pb-12 flex flex-col h-[calc(100vh-72px)] overflow-hidden" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>
      
      {/* TOOLBAR */}
      <div className="flex flex-col gap-4 mb-4 shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">My Leads</h1>
            <p className="text-sm font-medium text-gray-500 mt-0.5">
              {isLoading ? "Loading leads..." : `Showing ${allLeads.length} of ${totalItems} assigned leads`}
            </p>
          </div>
          <button 
            onClick={() => setIsFilterOpen(true)}
            className="relative flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm font-semibold text-sm"
          >
            <Filter size={16} />
            Filters {hasActiveFilters ? `(${activeFilterKeys.length})` : ""}
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#8B1538] rounded-full border-2 border-[#F8F9FB]"></span>
            )}
          </button>
        </div>

        {/* ACTIVE FILTERS CHIPS */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {activeFilterKeys.map((k) => (
              <div key={k} className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-200 rounded-lg shadow-sm text-sm">
                <span className="text-gray-500 font-medium capitalize">{k}:</span>
                <span className="font-semibold text-gray-800">{toTitleCase(filters[k])}</span>
                <button onClick={() => removeFilter(k)} className="text-gray-400 hover:text-red-500 ml-1">
                  <X size={14} />
                </button>
              </div>
            ))}
            <button 
              onClick={clearAllFilters}
              className="text-sm font-semibold text-[#8B1538] hover:text-[#6F102D] px-2 py-1 ml-1 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* TABLE AREA */}
      <div className="flex-1 flex flex-col min-h-0">
        {isLoading ? (
          <div className="mt-2 bg-white rounded-2xl border border-gray-200 p-4 shadow-sm h-full">
            <TableSkeleton rows={8} columns={8} />
          </div>
        ) : (
          <TelecallerLeadsTable
            columns={columns}
            data={allLeads}
            rowKey="enquiryNo"
            onRowClick={handleRowClick}
            hasActiveFilters={hasActiveFilters}
            onClearFilters={clearAllFilters}
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

      {/* FILTER DRAWER OVERLAY */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20" onClick={() => setIsFilterOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-bold text-gray-900">Refine Filters</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {Object.entries(uniqueOptions).map(([key, options]) => (
                <div key={key} className="space-y-2">
                  <label className="text-sm font-bold text-gray-700 capitalize">{key}</label>
                  <select 
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white outline-none focus:border-[#8B1538] focus:ring-1 focus:ring-[#8B1538] text-gray-800"
                    value={filters[key] || ""}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                  >
                    <option value="">All {toTitleCase(key)}s</option>
                    {options.map(opt => (
                      <option key={opt} value={opt}>{toTitleCase(opt)}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50 flex gap-3">
              <button 
                onClick={() => {
                  clearAllFilters();
                  setIsFilterOpen(false);
                }}
                className="flex-1 px-4 py-2.5 border border-gray-200 bg-white text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Clear
              </button>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="flex-1 px-4 py-2.5 bg-[#8B1538] text-white font-semibold rounded-xl hover:bg-[#6F102D] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
