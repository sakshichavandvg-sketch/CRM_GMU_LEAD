import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useAssignLeads = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: leadService.assignLeads,
    onSuccess: () => {
      toast.success("Leads Assigned", "Selected leads were assigned successfully.");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.counts() });
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.details() }); // Also update the detail view
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to assign leads.");
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
    },
  });
};
