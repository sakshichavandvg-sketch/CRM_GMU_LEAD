"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useLeadDetails } from "@/features/leads/hooks/useLeadDetails";
import { useDeleteLead } from "@/features/leads/hooks/useDeleteLead";
import { mapLeadToViewModel } from "@/features/leads/utils/leadViewModelMapper";
import LeadDetailsView from "@/features/leads/components/details/LeadDetailsView";
import AssignLeadAction from "@/features/leads/components/details/sections/AssignLeadAction";
import { useConfirm } from "@/hooks/useConfirm";

export default function LeadDetailsClient({ leadId }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const telecallerId = searchParams.get("userId");
  const confirm = useConfirm();

  const handleBack = () => {
    if (from === "telecaller" && telecallerId) {
      router.push(`/dashboard/management/user-directory/${telecallerId}`);
    } else {
      router.push("/dashboard/management/leads");
    }
  };

  const { data: rawData, isLoading, isError, error } = useLeadDetails(leadId);
  const { mutate: deleteLead, isPending: isDeleting } = useDeleteLead(handleBack);
  const viewModel = mapLeadToViewModel(rawData);

  const handleDelete = async () => {
    const confirmed = await confirm({
      title: "Delete Lead?",
      description: "This action cannot be undone.",
      variant: "danger",
      confirmText: "Delete",
    });
    if (confirmed) deleteLead(leadId);
  };

  // Admin-specific hero actions (Assign Lead only — Edit & Delete are always in ProfileHero)
  const actions = <AssignLeadAction leadId={leadId} />;

  return (
    <div className="flex flex-col mt-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <ArrowLeft size={16} />
          Back
        </button>
      </div>

      <LeadDetailsView
        leadId={leadId}
        rawData={rawData}
        viewModel={viewModel}
        isLoading={isLoading}
        isError={isError}
        error={error}
        isDeleting={isDeleting}
        onDelete={handleDelete}
        actions={actions}
        showStats={true}
      />
    </div>
  );
}
