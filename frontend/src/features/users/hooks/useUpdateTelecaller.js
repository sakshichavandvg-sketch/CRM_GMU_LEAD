"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import telecallerService from "@/features/users/services/telecallerService";
import { USER_QUERY_KEYS } from "@/features/users/constants/queryKeys";

export default function useUpdateTelecaller(empId, options = {}) {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: (data) => telecallerService.updateTelecaller(empId, data),

    onSuccess: (updatedProfile, variables, context) => {
      // Rely solely on invalidating the query to fetch the correct normalized data
      // This prevents the raw backend response from corrupting the normalized ViewModel

      // Update the user directory cache if it exists to keep everything synced
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });

      toast.success("Telecaller Updated", "Changes saved successfully.");

      options.onSuccess?.(updatedProfile, variables, context);
    },

    onError: (error, variables, context) => {
      const msg = error?.response?.data?.message || "Failed to update telecaller. Please try again.";
      toast.error("Update Failed", msg);
      options.onError?.(error, variables, context);
    },
  });
}
