import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import leadService from "../services/leadService";
import { LEAD_KEYS } from "../constants/queryKeys";

export const useDeleteLead = (onSuccessCallback) => {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: leadService.deleteLead,
    onSuccess: (data) => {
      // Invalidate the leads queries so the table refreshes
      queryClient.invalidateQueries({ queryKey: LEAD_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] });
      
      toast.success("Lead Deleted", "The lead has been deleted successfully.");
      
      if (onSuccessCallback) {
        onSuccessCallback();
      }
    },
    onError: (error) => {
      const message = error.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", message);
    },
  });
};
