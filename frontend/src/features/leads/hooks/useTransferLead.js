import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useTransferLead = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: leadService.transferLead,
    onSuccess: () => {
      toast.success("Lead Reassigned", "The lead was successfully reassigned.");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to transfer lead.");
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
    },
  });
};
