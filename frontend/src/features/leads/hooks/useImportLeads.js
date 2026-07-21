import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";
import { handleLeadError } from "../utils/errorHandler";

export const useImportLeads = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: ({ payload, onUploadProgress }) => 
      leadService.importLeads(payload, onUploadProgress),
    onSuccess: (data) => {
      toast.success("Import Successful", "CSV imported successfully.");
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.overviewLists() });
      if (onSuccessCallback) onSuccessCallback();
    },
    onError: (error) => {
      handleLeadError(error, "Failed to import leads. Please check your CSV format.");
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
    },
  });
};
