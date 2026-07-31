"use client";

import useAuthStore from "@/store/authStore";

export default function DashboardHeader() {
  const user = useAuthStore((state) => state.user);
  
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const firstName = user?.name?.split(' ')[0] || user?.username || "Sakshi";

  return (
    <div className="flex flex-col pb-2">
      <h1 className="text-3xl font-bold text-gray-900 tracking-tight leading-tight">
        Good Morning, {firstName} 👋
      </h1>
      <p className="text-sm text-gray-500 font-medium mt-1">
        Let's make today count! • {today}
      </p>
    </div>
  );
}
