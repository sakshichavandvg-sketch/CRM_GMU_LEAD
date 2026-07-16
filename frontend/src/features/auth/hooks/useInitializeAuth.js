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

        const response =
          await userService.getCurrentUser();

        const backendUser = response.data;

        setUser({
          ...backendUser,
          role: backendUser.userGroup,
        });

      } catch (error) {

        logout();

      } finally {

        setLoading(false);

      }
    }

    initialize();

  }, [user, setUser, logout, setLoading]);
}