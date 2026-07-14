"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashboardHeader() {
  const pathname = usePathname();

  const page =
    pathname.includes("/management")
      ? "Management"
      : pathname.includes("/admissions")
      ? "Admissions"
      : pathname.includes("/reports")
      ? "Reports"
      : pathname.includes("/settings")
      ? "Settings"
      : "Overview";

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">

      <span>Dashboard</span>

      <ChevronRight size={15} />

      <span className="font-medium text-slate-900">
        {page}
      </span>

    </div>
  );
}