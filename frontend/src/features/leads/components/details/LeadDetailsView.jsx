"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ErrorState from "@/components/ui/ErrorState";

import { TABS_CONFIG } from "../../constants/detailsConfig";
import ProfileHero from "./ProfileHero";
import QuickStatsRow from "./sections/QuickStatsRow";
import LeadTabs from "./LeadTabs";
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
  /** Role-specific action buttons rendered in the hero's right column */
  actions,
  /** Override tabs — Telecaller passes TELECALLER_TABS_CONFIG (no Documents/Activity) */
  tabsConfig,
  /** Hide the QuickStatsRow below the hero (Telecaller uses false) */
  showStats = true,
  /** Optional document count to display in hero badge */
  docCount,
  /** Optional notes count to display in hero badge */
  noteCount,
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
    <div className="flex flex-col mt-4" style={{ fontFamily: "var(--font-outfit), sans-serif" }}>

      {/* ── Unified Profile Hero ─────────────────────────────────────────────── */}
      <ProfileHero
        data={viewModel}
        actions={actions}
        onDelete={onDelete}
        isDeleting={isDeleting}
        onEdit={() => setIsEditModalOpen(true)}
        docCount={docCount}
        noteCount={noteCount}
      />

      {/* Edit Lead dialog (admin has rawData, telecaller passes undefined) */}
      {isEditModalOpen && (
        <EditLeadDialog
          open={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          lead={rawData}
        />
      )}

      {/* Stats row — shown for Admin, hidden for Telecaller */}
      {showStats && <QuickStatsRow data={viewModel} />}

      {/* ── Tab section ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-5 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <LeadTabs activeTab={activeTab} onTabChange={setActiveTab} tabsConfig={resolvedTabs} />

        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <ActiveTabComponent data={viewModel} leadId={leadId} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
