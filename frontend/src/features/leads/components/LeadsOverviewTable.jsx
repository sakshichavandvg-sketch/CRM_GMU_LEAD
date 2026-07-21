"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import StatusBadge from "@/components/table/StatusBadge";
import { Users, TrendingUp, Target } from "lucide-react";

import { useLeadOverviewFilters } from "../hooks/useLeadOverviewFilters";
import { useInfiniteLeadOverview } from "../hooks/useInfiniteLeadOverview";
import { useLeadFilterOptions } from "../hooks/useLeadFilterOptions";
import { useDashboardStats } from "../hooks/useDashboardStats";
import { useTelecallers } from "../hooks/useTelecallers";
import { useAssignLeads } from "../hooks/useAssignLeads";
import { FILTER_CONFIG } from "../constants/filterConfig";
import { useInfiniteScrollObserver } from "@/hooks/useInfiniteScrollObserver";

import LeadDetailsDialog from "./LeadDetailsDialog";
import LeadFilterDrawer from "./LeadFilterDrawer";

// CRM Modular Sections
import LeadsFilterToolbar from "./LeadsFilterToolbar";
import LeadTableSection from "./LeadTableSection";
import AssignLeadsModal from "./AssignLeadsModal";

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
  const { filters, actions } = useLeadOverviewFilters("hot");
  
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedLeadId, setSelectedLeadId] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  
  const [draftFilters, setDraftFilters] = useState({});
  const refineButtonRef = useRef(null);

  const { data: filterOptions } = useLeadFilterOptions();
  const { data: statsData } = useDashboardStats();
  const { data: telecallers = [] } = useTelecallers();
  
  const { mutate: assignLeads, isPending: isAssigningLeads } = useAssignLeads(() => {
    setSelectedRows([]);
    setIsAssignModalOpen(false);
  });
  
  const infiniteQuery = useInfiniteLeadOverview(filters);
  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = infiniteQuery;

  const loadMoreRef = useInfiniteScrollObserver({
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  });

  const extractLeads = useCallback((pageData) => {
    if (!pageData) return [];
    if (Array.isArray(pageData.leads)) return pageData.leads;
    if (Array.isArray(pageData.content)) return pageData.content;
    return [];
  }, []);

  const leadsData = useMemo(() => {
    return data?.pages?.flatMap(extractLeads) ?? [];
  }, [data, extractLeads]);

  const totalResults = data?.pages?.[0]?.totalItems ?? data?.pages?.[0]?.page?.totalElements ?? 0;

  const bucketCounts = useMemo(() => {
    if (!statsData?.overall) return {};
    return {
      hot: statsData.overall.hot || 0,
      cold: statsData.overall.cold || 0,
      alloted: statsData.overall.alloted || 0,
      "not-alloted": statsData.overall.notAlloted || 0,
      "not-consulted": statsData.overall.notConsulted || 0,
      "opinion-reassign": statsData.overall.opinionReassign || 0,
    };
  }, [statsData]);

  // Drawer Handlers
  const handleOpenDrawer = useCallback(() => {
    setDraftFilters({ ...filters }); // Clone global filters to draft
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
      if (FILTER_CONFIG.some(c => c.key === key)) {
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
    FILTER_CONFIG.forEach(config => {
      const actionName = `set${config.key.charAt(0).toUpperCase()}${config.key.slice(1)}`;
      if (actions[actionName]) {
        actions[actionName]("");
      }
    });
  }, [actions]);

  // Table Handlers
  const handleRowClick = useCallback((lead) => {
    setSelectedLeadId(lead.enquiryNo);
  }, []);

  const handleAssign = useCallback((telecallerId) => {
    assignLeads({
      userId: telecallerId,
      enquiryIds: selectedRows,
    });
  }, [assignLeads, selectedRows]);

  return (
    <>
      <div className="flex flex-col gap-2">
        
        <LeadsFilterToolbar 
          activeFilter={filters.type} 
          onSelect={actions.setType} 
          counts={bucketCounts}
          filters={filters}
          onRemove={handleRemoveActiveFilter}
          onClearAll={handleClearAllActiveFilters}
          onOpenDrawer={handleOpenDrawer}
          refineButtonRef={refineButtonRef}
        />

        <div className="flex flex-col gap-2">
          
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
               <span className="text-sm font-medium text-gray-500">
                 {totalResults} {totalResults === 1 ? 'Lead' : 'Leads'}
               </span>
            )}
          </div>

          <div className="flex-1">
            <LeadTableSection
              columns={columns}
              data={leadsData}
              selectedRows={selectedRows}
              setSelectedRows={setSelectedRows}
              onRowClick={handleRowClick}
              isLoading={isLoading}
              isError={isError}
              error={error}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              loadMoreRef={loadMoreRef}
              totalResults={totalResults}
            />
          </div>
        </div>
      </div>

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

      <LeadDetailsDialog
        open={!!selectedLeadId}
        onClose={() => setSelectedLeadId(null)}
        enquiryNo={selectedLeadId}
      />
    </>
  );
}
