"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTableScroll } from "@/providers/TableScrollProvider";
import StatusBadge from "@/components/table/StatusBadge";
import { Users, TrendingUp, Target } from "lucide-react";

import { useLeadOverviewFilters } from "../hooks/useLeadOverviewFilters";
import { useLeadOverview } from "../hooks/useLeadOverview";
import { useLeadFilterOptions } from "../hooks/useLeadFilterOptions";
import { useLeadCounts } from "../hooks/useLeadCounts";
import useUsers from "../../users/useUsers";
import { useAssignLeads } from "../hooks/useAssignLeads";
import { FILTER_CONFIG } from "../constants/filterConfig";


import ReusableFilterDrawer from "@/components/layout/ReusableFilterDrawer";
import LeadFilters from "./LeadFilters";

// CRM Modular Sections
import LeadsFilterToolbar from "./LeadsFilterToolbar";
import LeadTableSection from "./LeadTableSection";
import AssignLeadsModal from "./AssignLeadsModal";

const SPECIAL_FILTER_KEYS = [
  "state",
  "district",
  "taluk"
];

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

export default function LeadsOverviewTable({ filters, actions, search }) {
  const { isScrolled } = useTableScroll();

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignMode, setAssignMode] = useState("assign");

  const [draftFilters, setDraftFilters] = useState({});
  const refineButtonRef = useRef(null);

  // Clear selection on page change
  React.useEffect(() => {
    setSelectedRows([]);
  }, [filters.page]);

  const { data: filterOptions } = useLeadFilterOptions();
  const { data: usersData } = useUsers({ size: 1000 });
  const telecallers = usersData?.users || [];

  const { mutate: assignLeads, isPending: isAssigningLeads } = useAssignLeads(() => {
    setSelectedRows([]);
    setIsAssignModalOpen(false);
  });

  const query = useLeadOverview(filters);
  const { data, isLoading, isError, error, isFetching } = query;

  const leadsData = data?.leads || [];
  const totalResults = data?.totalItems || 0;
  const currentPage = data?.currentPage || 0;
  const totalPages = data?.totalPages || 1;
  const pageSize = data?.pageSize || 10;

  const { data: bucketCounts = {}, isLoading: isCountsLoading, isError: isCountsError } = useLeadCounts();

  // Drawer Handlers
  const handleOpenDrawer = useCallback(() => {
    setDraftFilters({ ...filters });
    setIsDrawerOpen(true);
  }, [filters]);

  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => {
      refineButtonRef.current?.focus();
    }, 100);
  }, []);

  const handleApplyFilters = useCallback(() => {
    Object.entries(draftFilters).forEach(([key, val]) => {
      const isConfigured = FILTER_CONFIG.some(c => c.key === key);
      const isSpecial = SPECIAL_FILTER_KEYS.includes(key);

      if (isConfigured || isSpecial) {
        const actionName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        if (actions[actionName]) {
          actions[actionName](val);
        }
      }
    });
    handleCloseDrawer();
  }, [draftFilters, actions, handleCloseDrawer]);

  const handleResetFilters = useCallback(() => {
    setDraftFilters({});
  }, []);

  const handleRemoveActiveFilter = useCallback((key) => {
    const actionName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
    if (actions[actionName]) {
      actions[actionName]("");
    }
  }, [actions]);

  const handleClearAllActiveFilters = useCallback(() => {
    // Clear generic filters
    FILTER_CONFIG.forEach(config => {
      const actionName = `set${config.key.charAt(0).toUpperCase()}${config.key.slice(1)}`;
      if (actions[actionName]) {
        actions[actionName]("");
      }
    });
    // Clear special filters
    SPECIAL_FILTER_KEYS.forEach(key => {
      const actionName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
      if (actions[actionName]) {
        actions[actionName]("");
      }
    });
  }, [actions]);

  // Table Handlers
  const router = useRouter();

  const handleRowClick = useCallback((lead) => {
    router.push(`/dashboard/management/leads/${lead.enquiryNo}`);
  }, [router]);

  const handleAssign = useCallback((telecallerId) => {
    assignLeads({
      userId: telecallerId,
      enquiryIds: selectedRows,
    });
  }, [assignLeads, selectedRows]);

  return (
    <>
      <div className="flex flex-col flex-1 min-h-0 overflow-hidden gap-4">
        <div className="shrink-0">
          <LeadsFilterToolbar
            activeFilter={filters.type}
            onSelect={actions.setType}
            counts={bucketCounts}
            isCountsLoading={isCountsLoading}
            isCountsError={isCountsError}
            filters={filters}
            onRemove={handleRemoveActiveFilter}
            onClearAll={handleClearAllActiveFilters}
            onOpenDrawer={handleOpenDrawer}
            refineButtonRef={refineButtonRef}
          />
        </div>

        <div className={`flex flex-col flex-1 min-h-0 transition-all duration-300 ease-in-out ${isScrolled ? "gap-2 mt-2" : "gap-4 mt-3"}`}>

          <div className="flex items-center justify-between px-1">
            {selectedRows.length > 0 ? (
              <div className="flex items-center gap-4 bg-[#7A1F2B]/5 border border-[#7A1F2B]/20 text-[#7A1F2B] px-4 py-2 rounded-xl shadow-sm w-full">
                <span className="text-sm font-semibold">
                  {selectedRows.length} {selectedRows.length === 1 ? 'Lead' : 'Leads'} Selected
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => { setAssignMode("assign"); setIsAssignModalOpen(true); }}
                    className="px-4 py-1.5 text-sm bg-white border border-[#7A1F2B]/30 text-[#7A1F2B] font-medium rounded-lg shadow-sm hover:bg-[#7A1F2B]/10 transition-colors"
                  >
                    Assign
                  </button>
                  <button
                    onClick={() => { setAssignMode("reassign"); setIsAssignModalOpen(true); }}
                    className="px-4 py-1.5 text-sm bg-[#9E5A02] text-white font-medium rounded-lg shadow-sm hover:bg-[#824901] transition-colors"
                  >
                    Reassign
                  </button>
                  <button
                    onClick={() => setSelectedRows([])}
                    className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors ml-2"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            ) : (
              <span className="text-sm font-semibold text-gray-700">
                {totalResults} {totalResults === 1 ? 'Lead' : 'Leads'} Found
              </span>
            )}
          </div>

          <div className="flex-1 min-h-0 flex flex-col relative">
            <LeadTableSection
              columns={columns}
              data={leadsData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              isError={isError}
              error={error}
              isFetching={isFetching}
              pagination={{
                currentPage,
                pageSize,
                totalPages,
                totalItems: totalResults,
                onPageChange: actions.setPage,
                onPageSizeChange: actions.setSize,
              }}
              onRetry={() => query.refetch()}
            />
          </div>
        </div>
      </div >

      {/* Filter Drawer */}
      <ReusableFilterDrawer 
        isOpen={isDrawerOpen} 
        onClose={handleCloseDrawer}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
      >
        <LeadFilters 
          values={draftFilters} 
          options={filterOptions} 
          onChange={(key, value) => setDraftFilters(prev => ({ ...prev, [key]: value }))} 
        />
        <div className="mt-10 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Saved Views</h3>
          <div className="p-4 border border-dashed border-gray-200 rounded-xl bg-gray-50 text-center">
            <span className="text-sm text-gray-500 font-medium">Coming Soon</span>
            <p className="text-xs text-gray-400 mt-1">Save your favorite filter combinations.</p>
          </div>
        </div>
      </ReusableFilterDrawer>

      <AssignLeadsModal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        telecallers={telecallers}
        onAssign={handleAssign}
        isAssigning={isAssigningLeads}
        selectedCount={selectedRows.length}
        mode={assignMode}
      />
    </>
  );
}
