"use client";

import useAuthStore from "@/store/authStore";

export default function RoleGuard({
  allowedRoles,
  children,
}) {
  const { user } = useAuthStore();

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="flex h-full items-center justify-center py-24">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Access Denied
          </h2>

          <p className="mt-3 text-gray-500">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return children;
}