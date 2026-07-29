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
import { useTelecallers } from "../hooks/useTelecallers";
import { useAssignLeads } from "../hooks/useAssignLeads";
import { FILTER_CONFIG } from "../constants/filterConfig";


import LeadFilterDrawer from "./LeadFilterDrawer";

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

  const [draftFilters, setDraftFilters] = useState({});
  const refineButtonRef = useRef(null);

  // Clear selection on page change
  React.useEffect(() => {
    setSelectedRows([]);
  }, [filters.page]);

  const { data: filterOptions } = useLeadFilterOptions();
  const { data: telecallers = [] } = useTelecallers();

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
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-[#6F1D28]">
                  {selectedRows.length} {selectedRows.length === 1 ? 'Lead' : 'Leads'} Selected
                </span>
                <button
                  onClick={() => setIsAssignModalOpen(true)}
                  className="px-4 py-1.5 text-sm bg-white border border-[#6F1D28] text-[#6F1D28] font-medium rounded-lg shadow-sm hover:bg-[#6F1D28] hover:text-white transition-colors"
                >
                  Assign Leads
                </button>
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

      <LeadFilterDrawer
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
        draftFilters={draftFilters}
        setDraftFilters={setDraftFilters}
        onApply={handleApplyFilters}
        onReset={handleResetFilters}
        options={filterOptions}
      />

      <AssignLeadsModal
        open={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        telecallers={telecallers.map(t => ({ id: t.empId, name: t.name, activeLeads: t.activeLeads }))}
        onAssign={handleAssign}
        isAssigning={isAssigningLeads}
        selectedCount={selectedRows.length}
      />
    </>
  );
}
