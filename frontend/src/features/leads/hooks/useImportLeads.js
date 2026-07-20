import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useImportLeads = (onSuccessCallback) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, onUploadProgress }) => 
      leadService.importLeads(payload, onUploadProgress),
    onSuccess: (data) => {
      toast.success(data?.message || "Leads imported successfully");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to import leads. Please check your CSV format.");
    },
  });
};
