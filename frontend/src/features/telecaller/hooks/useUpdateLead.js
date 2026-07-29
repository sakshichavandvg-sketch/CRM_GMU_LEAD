import { useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerLeadService } from "../services/telecallerLeadService";
import { toast } from "sonner";

export const useUpdateLead = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ enquiryNo, data }) => {
      return await telecallerLeadService.updateLead(enquiryNo, data);
    },
    onSuccess: (_, variables) => {
      const { enquiryNo } = variables;
      // Invalidate specific lead
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead", enquiryNo] });
      // Invalidate lead list
      queryClient.invalidateQueries({ queryKey: ["telecaller", "leads"] });
      // Invalidate dashboard metrics
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      
      toast.success("Lead updated successfully");
    },
  });
};
