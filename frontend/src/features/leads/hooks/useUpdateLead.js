import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useUpdateLead = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: leadService.updateLead,
    onSuccess: () => {
      toast.success("Lead Updated", "Changes have been saved successfully.");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.counts() });
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.details() }); // Update the detail view
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to update lead.");
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
    },
  });
};
