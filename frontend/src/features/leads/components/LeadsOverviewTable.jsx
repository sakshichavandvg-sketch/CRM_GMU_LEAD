"use client";

import React, { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useLeadOverview } from "../hooks/useLeadOverview";
import { useLeadFilterOptions } from "../hooks/useLeadFilterOptions";
import { useLeadCounts } from "../hooks/useLeadCounts";
import useUsers from "../../users/useUsers";
import { useAssignLeads } from "../hooks/useAssignLeads";
import { FILTER_CONFIG } from "../constants/filterConfig";

import ReusableFilterDrawer from "@/components/layout/ReusableFilterDrawer";
import LeadFilters from "./LeadFilters";
import AssignLeadsModal from "./AssignLeadsModal";

// Modular Sections
import LeadsKPICards from "./LeadsKPICards";
import LeadsFilterPills from "./LeadsFilterPills";
import LeadTableSection from "./LeadTableSection";

const SPECIAL_FILTER_KEYS = ["state", "district", "taluk"];

export default function LeadsOverviewTable({ filters, actions, search }) {
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignMode, setAssignMode] = useState("assign");

  const [draftFilters, setDraftFilters] = useState({});
  const refineButtonRef = useRef(null);

  // Destructure filters so they go to the hook correctly
  const { page = 0, size = 10, sort = "", type = "", source = "", status = "", callerName = "", course = "", opinion = "", state = "", district = "", taluk = "" } = filters;

  // Build sub-filters object (everything except page/size/sort)
  const subFilters = {
    ...(search ? { search } : {}),
    ...(type ? { type } : {}),
    ...(source ? { source } : {}),
    ...(status ? { status } : {}),
    ...(callerName ? { callerName } : {}),
    ...(course ? { course } : {}),
    ...(opinion ? { opinion } : {}),
    ...(state ? { state } : {}),
    ...(district ? { district } : {}),
    ...(taluk ? { taluk } : {}),
  };

  // Clear selection on page change
  React.useEffect(() => {
    setSelectedRows([]);
  }, [page]);

  const { data: filterOptions } = useLeadFilterOptions();
  const { data: usersData } = useUsers({ size: 1000 });
  const telecallers = usersData?.users || [];

  const { mutate: assignLeads, isPending: isAssigningLeads } = useAssignLeads(() => {
    setSelectedRows([]);
    setIsAssignModalOpen(false);
  });

  // Call hook with the correct signature: ({ filters, page, size, sort })
  const query = useLeadOverview({ filters: subFilters, page, size, sort });
  const { data, isLoading, isError, error, isFetching } = query;

  const leadsData = data?.leads || [];
  const totalResults = data?.totalItems || 0;
  const currentPage = data?.currentPage ?? page;
  const totalPages = data?.totalPages || 1;
  const pageSize = data?.pageSize || size;

  const { data: bucketCounts = {} } = useLeadCounts();

  // Drawer Handlers
  const handleCloseDrawer = useCallback(() => {
    setIsDrawerOpen(false);
    setTimeout(() => refineButtonRef.current?.focus(), 100);
  }, []);

  const handleApplyFilters = useCallback(() => {
    Object.entries(draftFilters).forEach(([key, val]) => {
      const isConfigured = FILTER_CONFIG.some(c => c.key === key);
      const isSpecial = SPECIAL_FILTER_KEYS.includes(key);

      if (isConfigured || isSpecial) {
        const actionName = `set${key.charAt(0).toUpperCase()}${key.slice(1)}`;
        if (actions[actionName]) actions[actionName](val);
      }
    });
    handleCloseDrawer();
  }, [draftFilters, actions, handleCloseDrawer]);

  const handleResetFilters = useCallback(() => {
    setDraftFilters({});
  }, []);

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
      <LeadsKPICards counts={bucketCounts} />
      
      <div className="flex flex-col gap-3">
        <LeadsFilterPills 
          activeFilter={type} 
          onSelect={actions.setType} 
          counts={bucketCounts} 
        />
        
        {/* Bulk Action Bar: shown when rows are selected */}
        {selectedRows.length > 0 && (
          <div className="flex items-center gap-4 bg-[#8B0D16]/5 border border-[#8B0D16]/20 text-[#8B0D16] px-4 py-2.5 rounded-xl shadow-sm w-full transition-all">
            <span className="text-sm font-semibold">
              {selectedRows.length} {selectedRows.length === 1 ? 'Lead' : 'Leads'} Selected
            </span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => { setAssignMode("assign"); setIsAssignModalOpen(true); }}
                className="px-4 py-1.5 text-sm bg-white border border-[#8B0D16]/30 text-[#8B0D16] font-medium rounded-lg shadow-sm hover:bg-[#8B0D16]/10 transition-colors cursor-pointer"
              >
                Assign
              </button>
              <button
                onClick={() => { setAssignMode("reassign"); setIsAssignModalOpen(true); }}
                className="px-4 py-1.5 text-sm bg-[#9E5A02] text-white font-medium rounded-lg shadow-sm hover:bg-[#824901] transition-colors cursor-pointer"
              >
                Reassign
              </button>
              <button
                onClick={() => setSelectedRows([])}
                className="px-4 py-1.5 text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors ml-2 cursor-pointer"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}
      </div>

      <LeadTableSection
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
