"use client";

import { useState } from "react";
import ErrorState from "@/components/ui/ErrorState";

import { TABS_CONFIG } from "../../constants/detailsConfig";
import LeadHeaderCard from "./sections/LeadHeaderCard";
import LeadStatisticsSection from "./sections/LeadStatisticsSection";
import ProfileSkeleton from "./ProfileSkeleton";
import EditLeadDialog from "../EditLeadDialog";

export default function LeadDetailsView({
  leadId,
  viewModel,
  rawData,
  isLoading,
  isError,
  error,
  isDeleting,
  onDelete,
  actions,
  tabsConfig,
  showStats = true,
}) {
  const [activeTab, setActiveTab] = useState((tabsConfig || TABS_CONFIG)[0].id);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const resolvedTabs = tabsConfig || TABS_CONFIG;
  const activeTabConfig = resolvedTabs.find((t) => t.id === activeTab) || resolvedTabs[0];
  const ActiveTabComponent = activeTabConfig.component;

  if (isLoading) return <ProfileSkeleton />;

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

  return (
    <div className="p-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
      
      {/* ── Lead Header & Metadata ─────────────────────────────────────────────── */}
      <LeadHeaderCard
        viewModel={viewModel}
        rawData={rawData}
        actions={actions}
        onDelete={onDelete}
        onEdit={() => setIsEditModalOpen(true)}
      />

      {isEditModalOpen && (
        <EditLeadDialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lead={rawData}
        />
      )}

      {/* ── Statistics Section ─────────────────────────────────────────────────── */}
      {showStats && <LeadStatisticsSection viewModel={viewModel} rawData={rawData} />}

      {/* ── Tabs Navigation ─────────────────────────────────────────────────────── */}
      <div className="flex border-b border-outline-variant mt-4">
        {resolvedTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 flex items-center gap-2 transition-colors ${
              activeTab === tab.id
                ? "border-b-4 border-primary text-primary font-bold"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: activeTab === tab.id ? "'FILL' 1" : "'FILL' 0" }}>
              {tab.id === 'info' ? 'visibility' : tab.id === 'timeline' ? 'history' : tab.id === 'notes' ? 'edit_note' : 'folder'}
            </span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── Active Tab Content ─────────────────────────────────────────────────── */}
      <ActiveTabComponent data={viewModel} rawData={rawData} leadId={leadId} />

    </div>
  );
}
