"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import telecallerService from "@/features/users/services/telecallerService";
import { USER_QUERY_KEYS } from "@/features/users/constants/queryKeys";

export default function useUpdateTelecallerStatus(empId, options = {}) {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: (status) => telecallerService.updateTelecallerStatus(empId, status),

    onMutate: async (newStatus) => {
      // Cancel any outgoing refetches to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: USER_QUERY_KEYS.telecallerDashboard(empId) });

      // Snapshot previous data
      const previousData = queryClient.getQueryData(USER_QUERY_KEYS.telecallerDashboard(empId));

      // Optimistically update
      if (previousData) {
        queryClient.setQueryData(USER_QUERY_KEYS.telecallerDashboard(empId), {
          ...previousData,
          profile: {
            ...previousData.profile,
            status: newStatus
          }
        });
      }

      return { previousData };
    },

    onSuccess: (data, variables, context) => {
      toast.success("Status Updated", `Telecaller status changed to ${variables}.`);
      
      // Update the user directory cache if it exists to keep everything synced
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });
      
      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      // Rollback
      if (context?.previousData) {
        queryClient.setQueryData(USER_QUERY_KEYS.telecallerDashboard(empId), context.previousData);
      }
      
      const msg = error?.response?.data?.message || "Failed to update status. Please try again.";
      toast.error("Status Update Failed", msg);
      
      options.onError?.(error, variables, context);
    },
  });
}
