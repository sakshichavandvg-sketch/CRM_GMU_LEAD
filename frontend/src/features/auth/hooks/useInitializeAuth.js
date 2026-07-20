"use client";

import { useEffect } from "react";

import userService from "../services/userService";

import useAuthStore from "@/store/authStore";

export default function useInitializeAuth() {
  const {
    user,
    setUser,
    logout,
    setLoading,
  } = useAuthStore();

  useEffect(() => {
    if (user) return;

    async function initialize() {
      try {
        setLoading(true);

        const backendUser =
          await userService.getCurrentUser();

        setUser(backendUser.data);

      } catch (error) {

        const status = error.response?.status;

        // Only logout when authentication has genuinely failed.
        // A 401 here means the axios interceptor already attempted
        // a token refresh and it failed — the user is truly unauthenticated.
        if (status === 401) {
          logout();
        }

        // 403, 500, network errors, timeouts — do NOT logout.
        // Preserve whatever auth state currently exists.
        // The user is still authenticated; the request just failed.
        console.log("Auth initialization error:", status, error.message);

      } finally {

        setLoading(false);

      }
    }

    initialize();

  }, [user, setUser, logout, setLoading]);
}