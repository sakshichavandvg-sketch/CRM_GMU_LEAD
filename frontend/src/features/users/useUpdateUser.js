"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppToast } from "@/hooks/useAppToast";

import usersService from "./usersService";

export default function useUpdateUser(options = {}) {
  const queryClient = useQueryClient();
  const toast = useAppToast();

  return useMutation({
    mutationFn: usersService.updateUser,

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });
      toast.success("Telecaller Updated", "Changes saved successfully.");

      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      const msg = error?.response?.data?.message || "Something went wrong. Please try again.";
      toast.error("Failed", msg);
      options.onError?.(error, variables, context);
    },
  });
}