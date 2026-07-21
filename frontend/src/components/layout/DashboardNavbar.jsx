"use client";

import {
  Bell,
  Search,
  Moon,
  ChevronRight,
  Menu,
} from "lucide-react";
import { usePathname } from "next/navigation";

import useAuthStore from "@/store/authStore";
import useGlobalSearchStore from "@/store/globalSearchStore";
import { ROLES, ROLE_LABELS } from "@/constants/roles";

export default function DashboardNavbar({
  breadcrumbs,
  onMenuClick,
  menuButtonRef,
  isSidebarOpen = false,
}) {
  const pathname = usePathname();

  const user = useAuthStore((state) => state.user);
  const { searchQuery, setSearchQuery } = useGlobalSearchStore();

  const currentPage =
    breadcrumbs[pathname] || "Dashboard";

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
        border-b
        border-gray-200
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

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <span className="hidden sm:inline">Dashboard</span>

          <ChevronRight size={15} className="hidden sm:block" />

          <span className="font-medium text-gray-900">
            {currentPage}
          </span>

        </div>

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
            rounded-xl
            border
            border-gray-200
            px-4
            py-2
            w-[300px]
          "
        >
          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="
              w-full
              bg-transparent
              text-sm
              outline-none
            "
          />

        </div>

        {/* Notification */}

        <button
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
          "
        >
          <Bell size={18} />
        </button>

        {/* Theme */}

        <button
          className="
            hidden
            sm:flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-100
          "
        >
          <Moon size={18} />
        </button>

        {/* User — collapsed on small screens, full on sm+ */}

        <div className="flex flex-col">

          <span className="text-sm font-semibold hidden sm:block">
            {user?.username || ROLE_LABELS[ROLES.ADMIN]}
          </span>

          <span className="text-xs text-gray-500">
            {user?.userGroup || ROLES.ADMIN}
          </span>

        </div>

      </div>

    </header>
  );
}