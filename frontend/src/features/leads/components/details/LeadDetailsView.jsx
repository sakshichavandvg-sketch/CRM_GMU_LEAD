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
  onEdit,
  canEdit = true,
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
        onEdit={canEdit ? (onEdit || (() => setIsEditModalOpen(true))) : undefined}
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
      <nav className="flex border-b border-outline-variant overflow-x-auto hide-scrollbar">
        {resolvedTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const getIcon = (id) => {
            if (id === "info" || id === "overview") return "overview";
            if (id === "notes") return "notes";
            if (id === "timeline" || id === "activity") return "history";
            return "folder";
          };

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-4 flex items-center gap-2 font-label-lg whitespace-nowrap transition-colors ${
                isActive
                  ? "border-b-[3px] border-primary text-primary active-tab font-semibold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {getIcon(tab.id)}
              </span>
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* ── Active Tab Content ─────────────────────────────────────────────────── */}
      <ActiveTabComponent data={viewModel} rawData={rawData} leadId={leadId} />

    </div>
  );
}
