"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import usersService from "../usersService";

export default function useToggleUser(options = {}) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersService.toggleUserStatus,

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: ["users"],
      });

      options.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options.onError?.(error, variables, context);
    },
  });
}