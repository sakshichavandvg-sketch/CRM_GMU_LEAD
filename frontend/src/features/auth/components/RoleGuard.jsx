"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import useAuthStore from "@/store/authStore";
import { ROLE_HOME_ROUTES } from "@/constants/roles";

export default function RoleGuard({
  allowedRoles,
  children,
}) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user) return;

    if (!allowedRoles.includes(user.userGroup)) {
      const redirectPath = ROLE_HOME_ROUTES[user.userGroup] || "/";
      router.replace(redirectPath);
    }
  }, [user, allowedRoles, router]);

  if (!user) return null;

  if (!allowedRoles.includes(user.userGroup)) {
    return null;
  }

  return children;
}