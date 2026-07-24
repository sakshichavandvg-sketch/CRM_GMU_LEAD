"use client";

import useInitializeAuth from "@/features/auth/hooks/useInitializeAuth";

export default function AuthBootstrap() {
  useInitializeAuth();
  return null;
}
