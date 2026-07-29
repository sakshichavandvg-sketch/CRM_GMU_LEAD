"use client";

import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import authService from "../services/authService";
import userService from "../services/userService";

import { ROLE_HOME_ROUTES } from "@/constants/roles";

import useAuthStore from "@/store/authStore";

export default function useLogin() {
  const router = useRouter();

  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: authService.login,

    onSuccess: async () => {
      try {
        // Delay slightly to prevent race condition where /auth/me fires before Set-Cookie is fully processed
        await new Promise((resolve) => setTimeout(resolve, 150));
        
        const response = await userService.getCurrentUser();

        const user = response.data;

        setUser(user);

        toast.success("Welcome back!");

        router.replace(ROLE_HOME_ROUTES[user.userGroup] ?? "/");

      } catch (error) {
        toast.error("Unable to load user profile.");
        console.error(error);
      }
    },

    onError: (error) => {
      if (!error.response) {
        toast.error(
          "Unable to connect to the server. Please check your internet connection or try again later."
        );
        return;
      }

      const status = error.response.status;

      if (status === 401) {
        toast.error("Invalid username or password.");
      } else if (status === 403) {
        toast.error("Access denied.");
      } else if (status === 404) {
        toast.error("Authentication service unavailable.");
      } else if (status === 408) {
        toast.error("Request timed out.");
      } else if (status >= 500) {
        toast.error("Server error.");
      } else {
        toast.error(
          error.response?.data?.message ||
            "An unexpected error occurred."
        );
      }
    },
  });
}