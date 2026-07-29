import { useMutation, useQueryClient } from "@tanstack/react-query";
import { telecallerCallService } from "../services/telecallerCallService";

export const useUpdateCall = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ callId, data }) => {
      return await telecallerCallService.updateCall(callId, data);
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries based on requirements
      queryClient.invalidateQueries({ queryKey: ["telecaller", "calls"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "timeline"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "lead"] });
      queryClient.invalidateQueries({ queryKey: ["telecaller", "call", variables.callId] });
    },
  });
};
