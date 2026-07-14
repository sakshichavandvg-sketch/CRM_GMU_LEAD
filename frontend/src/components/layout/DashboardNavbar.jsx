"use client";

import { Bell, Search, Moon, ChevronRight } from "lucide-react";
import useAuthStore from "@/store/authStore";

export default function DashboardNavbar() {
  const user = useAuthStore((state) => state.user);

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
        px-8
      "
    >
      {/* Left */}

      <div>

        <div className="flex items-center gap-2 text-sm text-gray-500">

          <span>Dashboard</span>

          <ChevronRight size={15} />

          <span className="font-medium text-gray-900">
            Overview
          </span>

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-4">

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
            h-10
            w-10
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-100
            flex
            items-center
            justify-center
          "
        >
          <Bell size={18}/>
        </button>

        {/* Theme */}

        <button
          className="
            h-10
            w-10
            rounded-xl
            border
            border-gray-200
            hover:bg-gray-100
            flex
            items-center
            justify-center
          "
        >
          <Moon size={18}/>
        </button>

        {/* User */}

        <div className="flex flex-col">

          <span className="text-sm font-semibold">

            {user?.username || "Administrator"}

          </span>

          <span className="text-xs text-gray-500">

            {user?.role || "ADMIN"}

          </span>

        </div>

      </div>

    </header>
  );
}