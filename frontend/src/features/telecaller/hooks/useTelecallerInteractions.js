import { useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerInteractionService } from "../services/telecallerInteractionService";
import { toast } from "sonner";

export const useLogInteraction = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: telecallerInteractionService.logCall,
    onSuccess: (_, variables) => {
      // Invalidate relevant queries for automatic UI refresh
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "leads"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead", variables.enquiryNo] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "timeline", variables.enquiryNo] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "calls"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "followups"] });
      
      toast.success("Call logged successfully");
    }
  });
};
