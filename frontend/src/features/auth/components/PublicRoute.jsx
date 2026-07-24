"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function PublicRoute({ children }) {
  const router = useRouter();
  const { loading, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return null; // Return null instead of a spinner to prevent flicker
  }

  if (isAuthenticated) {
    return null; // Don't render the login form while redirecting
  }

  return children;
}
