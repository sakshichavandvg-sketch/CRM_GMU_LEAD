"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import ErrorState from "@/components/ui/ErrorState";
import { FormSkeleton } from "@/components/ui/Skeletons";

import { useLeadDetails } from "../hooks/useLeadDetails";
import { useDeleteLead } from "../hooks/useDeleteLead";
import { mapLeadToViewModel } from "../utils/leadViewModelMapper";
import { TABS_CONFIG } from "../constants/detailsConfig";

import LeadHeader from "./details/LeadHeader";
import LeadStatusBar from "./details/LeadStatusBar";
import LeadTabs from "./details/LeadTabs";
import Button from "@/components/ui/Button";
import { useConfirm } from "@/hooks/useConfirm";

export default function LeadDetailsDialog({ open, onClose, enquiryNo }) {
  const [activeTab, setActiveTab] = useState(TABS_CONFIG[0].id);
  const confirm = useConfirm();

  const { data: rawData, isLoading, isError, error } = useLeadDetails(
    open ? enquiryNo : null
  );

  const { mutate: deleteLead, isPending: isDeleting } = useDeleteLead(() => {
    onClose();
  });

  // Map raw backend data to our normalized view model
  const viewModel = mapLeadToViewModel(rawData);

  // Find the active tab configuration
  const activeTabConfig = TABS_CONFIG.find((tab) => tab.id === activeTab) || TABS_CONFIG[0];
  const ActiveTabComponent = activeTabConfig.component;

  // Determine what data to pass to the active tab component
  const getTabProps = () => {
    if (activeTab === "info") return viewModel;
    if (activeTab === "timeline") return viewModel?.timeline;
    if (activeTab === "notes") return viewModel?.notes;
    return null;
  };

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title={viewModel ? <LeadHeader header={viewModel.header} /> : "Lead Details"} 
      size="xl"
      footer={
        viewModel && (
          <div className="flex justify-between w-full">
            <Button
              variant="danger"
              fullWidth={false}
              loading={isDeleting}
              loadingText="Deleting..."
              onClick={async () => {
                const confirmed = await confirm({
                  title: "Delete Lead?",
                  description: "This action cannot be undone.",
                  variant: "danger",
                  confirmText: "Delete",
                });
                if (confirmed) {
                  deleteLead(enquiryNo);
                }
              }}
            >
              Delete Lead
            </Button>
            <Button variant="secondary" fullWidth={false} onClick={onClose} disabled={isDeleting}>
              Close
            </Button>
          </div>
        )
      }
    >
      {isLoading && <FormSkeleton />}
      
      {isError && (
        <ErrorState
          title="Error Loading Lead Details"
          message={error?.response?.data?.message || "Failed to load lead details."}
          onRetry={() => {}} 
        />
      )}
      
      {viewModel && !isLoading && !isError && (
        <div className="flex flex-col gap-6">
          <LeadStatusBar status={viewModel.status} />
          
          <div className="flex flex-col gap-5">
            <LeadTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="min-h-[400px]">
              <ActiveTabComponent data={getTabProps()} />
            </div>
          </div>
        </div>
      )}

    </Modal>
  );
}
