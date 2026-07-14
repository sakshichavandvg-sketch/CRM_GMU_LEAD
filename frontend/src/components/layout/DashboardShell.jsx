"use client";

import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

export default function DashboardShell({ children }) {
  return (
    <div className="flex h-screen bg-[#F8FAFC]">

      <DashboardSidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <DashboardNavbar />

        <main
          className="
            flex-1
            overflow-y-auto
            p-6
          "
        >
          {children}
        </main>

      </div>

    </div>
  );
}