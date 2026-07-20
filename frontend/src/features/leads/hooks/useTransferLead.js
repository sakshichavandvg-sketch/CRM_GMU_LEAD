import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useTransferLead = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: leadService.transferLead,
    onSuccess: () => {
      toast.success("Lead transferred successfully");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to transfer lead.");
    },
  });
};
