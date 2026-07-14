"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { IMAGES } from "@/constants/images";
import navigation from "@/config/navigation";
import useAuthStore from "@/store/authStore";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const user =
    useAuthStore((state) => state.user) || {
      username: "Administrator",
      role: "ADMIN",
    };

  return (
    <aside
      className="
        w-[280px]
        h-screen
        bg-white
        border-r
        border-gray-200
        flex
        flex-col
        shrink-0
      "
    >
      {/* ================= Logo ================= */}

      <div className="border-b border-gray-100 px-6 py-6">

        <div className="flex items-center gap-3">

          <Image
            src={IMAGES.LOGO}
            alt="GM University"
            width={46}
            height={46}
            className="rounded-full"
          />

          <div>

            <h2 className="font-outfit text-[18px] font-semibold">
              GMU Leads
            </h2>

            <p className="text-sm text-gray-500">
              Admission CRM
            </p>

          </div>

        </div>

      </div>

      {/* ================= Menu ================= */}

      <nav className="flex-1 overflow-y-auto px-4 py-6">

        {navigation.map((group) => (

          <div
            key={group.section}
            className="mb-8"
          >

            <p
              className="
                mb-3
                px-3
                text-xs
                font-semibold
                uppercase
                tracking-[0.18em]
                text-gray-400
              "
            >
              {group.section}
            </p>

            <div className="space-y-1">

              {group.items
                .filter((item) => {
                  if (item.disabled) return true;

                  return item.roles?.includes(user.role);
                })
                .map((item) => {
                  const Icon = item.icon;

                  const active =
                    pathname === item.href;

                  if (item.disabled) {
                    return (
                      <div
                        key={item.label}
                        className="
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          px-4
                          py-3
                          text-gray-400
                          cursor-not-allowed
                          opacity-60
                        "
                      >
                        <Icon size={18} />

                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-4
                        py-3
                        text-sm
                        font-medium
                        transition-all

                        ${
                          active
                            ? "bg-[#6F1D28] text-white shadow-sm"
                            : "text-gray-600 hover:bg-gray-100"
                        }
                      `}
                    >
                      <Icon size={18} />

                      <span>
                        {item.label}
                      </span>
                    </Link>
                  );
                })}

            </div>

          </div>

        ))}

      </nav>

      {/* ================= Footer ================= */}

      <div className="border-t border-gray-100 p-5">

        <div className="flex items-center justify-between">

          <div>

            <p className="font-medium">
              {user.username}
            </p>

            <p className="text-sm text-gray-500">
              {user.role}
            </p>

          </div>

        </div>

        <button
          className="
            mt-5
            w-full
            rounded-xl
            border
            border-red-200
            py-3
            text-sm
            font-medium
            text-red-600
            transition
            hover:bg-red-50
          "
        >
          Logout
        </button>

      </div>

    </aside>
  );
}