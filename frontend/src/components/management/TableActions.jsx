"use client";

import { useState } from "react";
import { Upload, Download, Plus } from "lucide-react";

import CreateLeadDialog from "@/features/leads/components/CreateLeadDialog";
import ImportLeadsDialog from "@/features/leads/components/ImportLeadsDialog";
import { useExportLeads } from "@/features/leads/hooks/useExportLeads";
import { useConfirm } from "@/hooks/useConfirm";

export default function TableActions({ activeTab }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);

  const { mutate: exportLeads, isPending: isExporting } = useExportLeads();
  const confirm = useConfirm();

  return (
    <>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {activeTab === "leads" && (
          <>
            <button 
              onClick={() => setIsImportOpen(true)}
              className="h-11 rounded-xl border border-gray-200 px-5 flex items-center gap-2 hover:bg-gray-50 transition"
            >
              <Upload size={18} />
              Import CSV
            </button>

            <button 
              onClick={async () => {
                const isConfirmed = await confirm({
                  title: "Export Leads?",
                  description: "Are you sure you want to export all matching leads to a CSV?",
                  confirmText: "Export",
                  variant: "primary"
                });
                
                if (isConfirmed) {
                  exportLeads({}); // Can pass filters here if available from context
                }
              }}
              disabled={isExporting}
              className="h-11 rounded-xl border border-gray-200 px-5 flex items-center gap-2 hover:bg-gray-50 transition disabled:opacity-50"
            >
              <Download size={18} />
              {isExporting ? "Exporting..." : "Export"}
            </button>
          </>
        )}

        <button 
          onClick={() => {
            if (activeTab === "leads") {
              setIsCreateOpen(true);
            } else {
              // Handle Add User (already implemented elsewhere or ignored for now)
            }
          }}
          className="h-11 rounded-xl bg-[var(--primary)] px-6 text-white flex items-center gap-2 hover:opacity-95 transition"
        >
          <Plus size={18} />
          {activeTab === "users" ? "Add User" : "Create Lead"}
        </button>
      </div>

      <CreateLeadDialog open={isCreateOpen} onClose={() => setIsCreateOpen(false)} />
      <ImportLeadsDialog open={isImportOpen} onClose={() => setIsImportOpen(false)} />
    </>
  );
}