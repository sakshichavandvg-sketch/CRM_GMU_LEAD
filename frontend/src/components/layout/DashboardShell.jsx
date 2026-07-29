"use client";

import DashboardSidebar from "../dashboard/DashboardSidebar";
import DashboardNavbar from "./DashboardNavbar";

import navigation from "@/config/navigation";
import telecallerNavigation from "@/config/telecallerNavigation";
import { breadcrumbs } from "@/config/breadcrumbs";
import { telecallerBreadcrumbs } from "@/config/telecallerBreadcrumbs";

import useAuthStore from "@/store/authStore";
import { ROLES } from "@/constants/roles";

import { useState, useCallback, useRef } from "react";

export default function DashboardShell({ children }) {
  const user = useAuthStore((state) => state.user);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuButtonRef = useRef(null);

  const currentNavigation =
    user?.userGroup === ROLES.ADMIN
      ? navigation
      : telecallerNavigation;

  const currentBreadcrumbs =
    user?.userGroup === ROLES.ADMIN
      ? breadcrumbs
      : telecallerBreadcrumbs;

  const handleOpenSidebar = useCallback(() => {
    setSidebarOpen(true);
  }, []);

  const handleCloseSidebar = useCallback(() => {
    setSidebarOpen(false);
    // Return focus to hamburger button
    menuButtonRef.current?.focus();
  }, []);

  return (
    <div className="flex h-screen bg-white">
      <DashboardSidebar
        navigation={currentNavigation}
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
      />

      <div className="flex flex-1 flex-col overflow-hidden">
        <DashboardNavbar
          breadcrumbs={currentBreadcrumbs}
          onMenuClick={handleOpenSidebar}
          menuButtonRef={menuButtonRef}
          isSidebarOpen={sidebarOpen}
        />

        <main
          className="flex-1 overflow-y-auto p-4 sm:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}