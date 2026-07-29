import { useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerFollowupService } from "../services/telecallerFollowupService";
import { toast } from "sonner";

export const useCreateFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      return await telecallerFollowupService.createFollowup(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller", "followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead"] });
      toast.success("Followup scheduled successfully");
    },
  });
};

export const useUpdateFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return await telecallerFollowupService.updateFollowup(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller", "followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      toast.success("Followup updated successfully");
    },
  });
};

export const useDeleteFollowup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      return await telecallerFollowupService.deleteFollowup(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["telecaller", "followups"] });
      queryClient.invalidateQueries({ queryKey: ["telecallerDashboard"] });
      toast.success("Followup removed");
    },
  });
};
