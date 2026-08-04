"use client";

import React, { useState } from "react";
import CreateLeadDialog from "@/features/leads/components/CreateLeadDialog";
import ImportLeadsDialog from "@/features/leads/components/ImportLeadsDialog";
import { useExportLeads } from "@/features/leads/hooks/useExportLeads";
import { useConfirm } from "@/hooks/useConfirm";

export default function LeadsHeader() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const { mutate: exportLeads, isPending: isExporting } = useExportLeads();
  const confirm = useConfirm();

  const handleExport = async () => {
    const isConfirmed = await confirm({
      title: "Export Leads?",
      description: "Are you sure you want to export all matching leads to a CSV?",
      confirmText: "Export",
      variant: "primary",
    });
    if (isConfirmed) {
      exportLeads({});
    }
  };

  return (
    <>
      {/* Page header row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 leading-tight">Leads Management</h1>
          <p className="mt-1 text-base text-gray-500">View and manage all system leads</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsImportOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px] text-gray-500">upload</span>
            Import CSV
          </button>

          <button
            onClick={() => setIsCreateOpen(true)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#8B0D16] text-white text-sm font-medium rounded-xl shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            Add Lead
          </button>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="material-symbols-outlined text-[18px] text-gray-500">download</span>
            {isExporting ? "Exporting…" : "Export"}
          </button>
        </div>
      </div>

      {/* Dialogs — rendered outside layout containers so they portal correctly */}
      <CreateLeadDialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <ImportLeadsDialog open={isImportOpen} onClose={() => setIsImportOpen(false)} />
    </>
  );
}
