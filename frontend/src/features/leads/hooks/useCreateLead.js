import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useCreateLead = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: leadService.createLead,
    onSuccess: () => {
      toast.success("Lead Created", "The lead has been created successfully.");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.counts() });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to create lead.");
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
    },
  });
};
