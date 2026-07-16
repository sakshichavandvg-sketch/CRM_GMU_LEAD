"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import navigation from "@/config/navigation";
import { IMAGES } from "@/constants/images";
import useAuthStore from "@/store/authStore";

export default function DashboardSidebar() {
  const pathname = usePathname();

  const user =
    useAuthStore((state) => state.user) || {
      username: "Administrator",
      role: "ADMIN",
    };

  const menu = navigation.filter((item) =>
    item.roles.includes(user.role)
  );
  console.log("User:", user);
console.log("Role:", user.role);
console.log("Navigation:", navigation);
console.log("Menu:", menu);

  return (
    <aside className="w-[280px] h-screen border-r border-gray-200 bg-white flex flex-col">

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
            <h2 className="font-semibold text-lg">
              GMU Leads
            </h2>

            <p className="text-sm text-gray-500">
              Admission CRM
            </p>
          </div>

        </div>

      </div>

      <nav className="flex-1 px-4 py-6">

        <div className="space-y-1">

          {menu.map((item) => {

            const Icon = item.icon;

            const active =
              pathname === item.path;

            return (

              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 transition

                  ${
                    active
                      ? "bg-[#6F1D28] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }

                `}
              >

                <Icon size={18} />

                <span>
                  {item.title}
                </span>

              </Link>

            );
          })}

        </div>

      </nav>

      <div className="border-t border-gray-100 p-5">

        <p className="font-medium">
          {user.username}
        </p>

        <p className="text-sm text-gray-500">
          {user.role}
        </p>

      </div>

    </aside>
  );
}