"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";
import telecallerService from "@/features/users/services/telecallerService";
import { USER_QUERY_KEYS } from "@/features/users/constants/queryKeys";

export default function useUploadTelecallerAvatar(empId, options = {}) {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: (file) => telecallerService.uploadTelecallerAvatar(empId, file),

    onSuccess: (data, variables, context) => {
      // Determine the URL from the response
      const newAvatarUrl = typeof data === 'string' ? data : (data?.avatar || data?.avatarUrl || data?.url);
      
      if (newAvatarUrl) {
        const cacheBustedUrl = newAvatarUrl.includes('?') 
          ? `${newAvatarUrl}&cb=${Date.now()}` 
          : `${newAvatarUrl}?cb=${Date.now()}`;
          
        queryClient.setQueryData(USER_QUERY_KEYS.telecallerDashboard(empId), (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            profile: {
              ...oldData.profile,
              avatar: cacheBustedUrl
            }
          };
        });
      }

      // Invalidate the cache to fetch the new avatar URL and keep synchronized
      queryClient.invalidateQueries({ queryKey: USER_QUERY_KEYS.all });

      toast.success("Avatar Uploaded", "Profile picture updated successfully.");

      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      const msg = error?.response?.data?.message || "Failed to upload avatar. Please try again.";
      toast.error("Upload Failed", msg);
      options.onError?.(error, variables, context);
    },
  });
}
