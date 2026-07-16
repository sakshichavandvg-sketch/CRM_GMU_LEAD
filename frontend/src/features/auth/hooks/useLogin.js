"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import authService from "../services/authService";
import userService from "../services/userService";

import useAuthStore from "@/store/authStore";

export default function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async () => {
      try {
        const response = await userService.getCurrentUser();

        const backendUser = response.data;

        // Normalize backend response
        const user = {
          ...backendUser,
          role: backendUser.userGroup,
        };

        setUser(user);

        toast.success("Welcome back!");

        router.replace("/dashboard");
      } catch (error) {
        toast.error("Unable to load user profile.");

        console.error(error);
      }
    },

    onError: (error) => {
      toast.error(
        error.response?.data?.message ??
        "Invalid username or password."
      );
    },
  });
}