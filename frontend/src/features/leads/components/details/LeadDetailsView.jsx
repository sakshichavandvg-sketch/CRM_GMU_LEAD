"use client";

import { useState } from "react";
import ErrorState from "@/components/ui/ErrorState";
import { FormSkeleton } from "@/components/ui/Skeletons";
import Button from "@/components/ui/Button";

import { TABS_CONFIG } from "../../constants/detailsConfig";
import LeadHeader from "./LeadHeader";
import LeadStatusBar from "./LeadStatusBar";
import LeadTabs from "./LeadTabs";

export default function LeadDetailsView({
  leadId,
  viewModel,
  isLoading,
  isError,
  error,
  isDeleting,
  onDelete,
}) {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].id);

  // Find the active tab configuration
  const activeTabConfig = TABS_CONFIG.find((tab) => tab.id === activeTab) || TABS_CONFIG[0];
  const ActiveTabComponent = activeTabConfig.component;

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm mt-6">
        <FormSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6">
        <ErrorState
          title="Error Loading Lead Details"
          message={error?.response?.data?.message || error?.message || "Failed to load lead details."}
          onRetry={() => window.location.reload()} 
        />
      </div>
    );
  }

  if (!viewModel) return null;

  console.log("🖥️ [VIEW] Rendering with viewModel:", viewModel);

  return (
    <div className="flex flex-col gap-6 mt-6">
      {/* Header Card */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <LeadHeader header={viewModel.header} />
        
        <div className="flex items-center">
          <Button
            variant="danger"
            fullWidth={false}
            loading={isDeleting}
            loadingText="Deleting..."
            onClick={onDelete}
          >
            Delete Lead
          </Button>
        </div>
      </div>

      {/* Status Bar */}
      <LeadStatusBar status={viewModel.status} />
      
      {/* Details Tabs */}
      <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <LeadTabs activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="min-h-[400px]">
          <ActiveTabComponent data={viewModel} leadId={leadId} />
        </div>
      </div>
    </div>
  );
}
