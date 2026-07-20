"use client";

import useAuthStore from "@/store/authStore";

export default function TelecallerDashboard() {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.name || "Telecaller"}
        </h1>

        <p className="text-muted-foreground">
          Telecaller Dashboard
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Employee ID</p>
          <h3 className="mt-2 text-xl font-semibold">
            {user?.empId}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Username</p>
          <h3 className="mt-2 text-xl font-semibold">
            {user?.username}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Role</p>
          <h3 className="mt-2 text-xl font-semibold">
            {user?.userGroup}
          </h3>
        </div>

        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Status</p>
          <h3 className="mt-2 text-xl font-semibold">
            {user?.status}
          </h3>
        </div>
      </div>
    </div>
  );
}