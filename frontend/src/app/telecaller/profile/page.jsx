"use client";

import useAuthStore from "@/store/authStore";

export default function TelecallerProfile() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">
          Your account information.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-500">
              Name
            </label>
            <p className="mt-1">{user?.name}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Employee ID
            </label>
            <p className="mt-1">{user?.empId}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Username
            </label>
            <p className="mt-1">{user?.username}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Role
            </label>
            <p className="mt-1">{user?.userGroup}</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-500">
              Status
            </label>
            <p className="mt-1">{user?.status}</p>
          </div>
        </div>
      </div>
    </div>
  );
}