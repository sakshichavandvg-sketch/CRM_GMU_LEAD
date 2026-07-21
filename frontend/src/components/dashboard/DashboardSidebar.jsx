"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

import { IMAGES } from "@/constants/images";
import { ROLES, ROLE_LABELS } from "@/constants/roles";
import useAuthStore from "@/store/authStore";

export default function DashboardSidebar({
  navigation,
  isOpen = false,
  onClose,
}) {
  const pathname = usePathname();

  const user =
    useAuthStore((state) => state.user) || {
      username: ROLE_LABELS[ROLES.ADMIN],
      userGroup: ROLES.ADMIN,
    };

 const menu = navigation.filter((item) =>
  item.roles.includes(user.userGroup)
);

  // Close on Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    },
    [onClose]
  );

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  // Track expanded state for menus with subItems
  const [expandedMenu, setExpandedMenu] = useState(pathname);

  // Close drawer on navigation (mobile UX)
  const handleNavClick = (path) => {
    if (path === pathname) return;
    onClose?.();
  };

  const toggleSubMenu = (e, path) => {
    e.preventDefault();
    setExpandedMenu(expandedMenu === path ? null : path);
  };

  // Sidebar content — shared between desktop and mobile
  const sidebarContent = (
    <>
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
            <h2 className="font-semibold text-lg text-gray-900">GMU Leads</h2>
            <p className="text-sm text-gray-500">Admission CRM</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1.5">
          {menu.map((item) => {
            const Icon = item.icon;
            
            // For items with subItems, check if the current path matches any subItem
            const hasActiveSub = item.subItems?.some(sub => sub.path === pathname);
            const active = pathname === item.path || hasActiveSub;
            
            const isExpanded = expandedMenu === item.path || hasActiveSub;

            if (item.disabled) {
              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-gray-400 opacity-60 cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-medium">{item.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                    Soon
                  </span>
                </div>
              );
            }

            return (
              <div key={item.path}>
                <Link
                  href={item.subItems ? "#" : item.path}
                  onClick={(e) => {
                    if (item.subItems) {
                      toggleSubMenu(e, item.path);
                    } else {
                      handleNavClick(item.path);
                    }
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition font-medium
                    ${active
                      ? "bg-[#6F1D28]/10 text-[#6F1D28]" // Subtle Maroon active state
                      : "text-gray-600 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span>{item.title}</span>
                  </div>
                  {item.subItems && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* SubItems rendering */}
                {item.subItems && isExpanded && (
                  <div className="mt-1 ml-4 border-l border-gray-100 pl-4 space-y-1">
                    {item.subItems.map((subItem) => {
                      // Note: We use pathname match here if subitems have unique paths
                      const subActive = pathname === subItem.path;
                      
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.path}
                          onClick={() => handleNavClick(subItem.path)}
                          className={`block rounded-lg px-3 py-2 text-sm transition
                            ${subActive
                              ? "text-[#6F1D28] font-semibold bg-[#6F1D28]/5"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                            }
                          `}
                        >
                          {subItem.title}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      <div className="border-t border-gray-100 p-5">

        <p className="font-medium">
          {user.username}
        </p>

        <p className="text-sm text-gray-500">
          {user.userGroup}
        </p>

      </div>
    </>
  );

  return (
    <>
      {/* ===== Desktop Sidebar (≥lg) ===== */}
      <aside className="hidden lg:flex w-[280px] h-screen border-r border-gray-200 bg-white flex-col">
        {sidebarContent}
      </aside>

      {/* ===== Mobile Drawer (<lg) ===== */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 lg:hidden
          ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="mobile-sidebar"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`
          fixed inset-y-0 left-0 z-50 w-[280px] bg-white flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute right-3 top-3 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-black transition"
        >
          <X size={20} />
        </button>

        {sidebarContent}
      </aside>
    </>
  );
}