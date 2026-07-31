"use client";
import React from "react";

import {
  Bell,
  Search,
  Moon,
  ChevronRight,
  Menu,
  Calendar,
} from "lucide-react";
import { usePathname } from "next/navigation";

import useAuthStore from "@/store/authStore";
import useGlobalSearchStore from "@/store/globalSearchStore";
import { ROLES, ROLE_LABELS } from "@/constants/roles";

import Link from "next/link";

export default function DashboardNavbar({
  breadcrumbs,
  onMenuClick,
  menuButtonRef,
  isSidebarOpen = false,
}) {
  const pathname = usePathname();
  const { searchQuery, setSearchQuery } = useGlobalSearchStore();

  const getBreadcrumbArray = () => {
    if (!breadcrumbs) return [{ label: "Dashboard" }];
    
    if (pathname.includes('/leads/')) return breadcrumbs.leadDetails || breadcrumbs.leadsDetail;
    if (pathname.endsWith('/leads')) return breadcrumbs.leads;
    if (pathname.includes('/user-directory/')) return breadcrumbs.telecallerDetails;
    if (pathname.endsWith('/user-directory')) return breadcrumbs.userDirectory;
    if (pathname.includes('/call-reports/')) return breadcrumbs.callReportsTelecaller;
    if (pathname.endsWith('/call-reports')) return breadcrumbs.callReports;
    if (pathname.endsWith('/admissions')) return breadcrumbs.admissions;
    if (pathname.endsWith('/follow-ups')) return breadcrumbs.followups || [
      { label: "Dashboard", href: pathname.startsWith("/telecaller") ? "/telecaller" : "/dashboard" },
      { label: "Follow-ups" }
    ];
    if (pathname.endsWith('/calls')) return breadcrumbs.calls || [
      { label: "Dashboard", href: pathname.startsWith("/telecaller") ? "/telecaller" : "/dashboard" },
      { label: "Calls" }
    ];
    if (pathname.endsWith('/recordings')) return breadcrumbs.recordings || [
      { label: "Dashboard", href: "/telecaller" },
      { label: "Recordings" }
    ];
    if (pathname.endsWith('/profile')) return breadcrumbs.profile;
    if (pathname.endsWith('/reports')) return breadcrumbs.reports;
    if (pathname.endsWith('/settings')) return breadcrumbs.settings;
    if (pathname.endsWith('/management')) return breadcrumbs.management;
    
    return breadcrumbs.dashboard || [{ label: "Dashboard" }];
  };

  const currentBreadcrumbs = getBreadcrumbArray() || [{ label: "Dashboard" }];

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[72px]
        items-center
        justify-between
        bg-white
        px-4
        sm:px-6
        lg:px-8
      "
    >
      {/* ================= Left: Hamburger + Breadcrumb ================= */}

      <div className="flex items-center gap-3">

        {/* Hamburger — visible only on <lg */}
        <button
          ref={menuButtonRef}
          onClick={onMenuClick}
          aria-label="Open navigation menu"
          aria-expanded={isSidebarOpen}
          aria-controls="mobile-sidebar"
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-100
            transition
            lg:hidden
          "
        >
          <Menu size={20} />
        </button>

        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
          {currentBreadcrumbs.map((item, index) => {
            const isLast = index === currentBreadcrumbs.length - 1;
            return (
              <React.Fragment key={index}>
                {isLast ? (
                  <span className="font-semibold text-gray-900" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href || '#'}
                      className="transition-colors hover:text-[#6F1D28] hover:underline hidden sm:inline-block"
                    >
                      {item.label}
                    </Link>
                    <ChevronRight size={15} className="text-gray-400 hidden sm:block" />
                  </>
                )}
              </React.Fragment>
            );
          })}
        </nav>

      </div>

      {/* ================= Right ================= */}

      <div className="flex items-center gap-2 sm:gap-4">

        {/* Search */}
        <div
          className="
            hidden
            lg:flex
            items-center
            gap-2
            rounded-full
            bg-gray-100
            hover:bg-gray-200/60
            transition-colors
            px-4
            py-2.5
            w-[480px]
          "
        >
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search leads, names, numbers... (Press Enter)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchQuery.trim()) {
                const basePath = pathname.includes('/dashboard') ? '/dashboard/management/leads' : '/telecaller/leads';
                window.location.href = `${basePath}?search=${encodeURIComponent(searchQuery.trim())}`;
              }
            }}
            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
          />
        </div>

        {/* Icons & Date */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 relative text-gray-700 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
          </button>
          
          <button className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 text-gray-700 transition-colors">
            <Moon size={20} />
          </button>

          <div className="hidden sm:block w-px h-6 bg-gray-200 mx-2"></div>

          <div className="hidden sm:flex items-center gap-2 px-2 text-sm font-semibold text-gray-800">
            20 July 2025
            <Calendar size={18} className="text-gray-500" />
          </div>
        </div>
      </div>

    </header>
  );
}