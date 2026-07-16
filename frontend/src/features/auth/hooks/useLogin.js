"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import authService from "../services/authService";
import userService from "../services/userService";

import useAuthStore from "@/store/authStore";

export default function useLogin() {
  const router = useRouter();

  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async () => {
      try {
        // Fetch authenticated user's profile
        const response = await userService.getCurrentUser();

        // Save user globally
        setUser(response.data);

        toast.success("Welcome back!");

        // Navigate to dashboard
        router.replace("/dashboard");
      } catch (error) {
        console.error("Failed to load authenticated user:", error);

        toast.error(
          "Login succeeded, but failed to load your profile."
        );
      }
    },

    onError: (error) => {
      toast.error(
        error?.response?.data?.message ||
          "Invalid username or password."
      );
    },
  });
}