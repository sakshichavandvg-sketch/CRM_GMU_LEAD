"use client";

import { useEffect, useCallback, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { X, LogOut, User, Settings } from "lucide-react";

import { IMAGES } from "@/constants/images";
import { ROLES, ROLE_LABELS } from "@/constants/roles";
import useAuthStore from "@/store/authStore";
import authService from "@/features/auth/services/authService";

export default function DashboardSidebar({
  navigation,
  isOpen = false,
  onClose,
}) {
  const pathname = usePathname();
  const router = useRouter();

  const user =
    useAuthStore((state) => state.user) || {
      username: ROLE_LABELS[ROLES.ADMIN],
      userGroup: ROLES.ADMIN,
    };
  
  const logoutState = useAuthStore((state) => state.logout);

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

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      logoutState();
      
      // Clear all accessible client-side cookies just in case
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      
      router.push("/");
    }
  };

  // Sidebar content — shared between desktop and mobile
  const sidebarContent = (
    <>
      <div className="border-b border-[#E5E7EB] px-4 py-6 flex items-center gap-3">
        <Image
          src={IMAGES.LOGO}
          alt="GM University"
          width={46}
          height={46}
          className="rounded-full shadow-sm"
        />
        <div>
          <h2 className="font-semibold text-lg text-[#111827] tracking-tight whitespace-nowrap">GMU Leads</h2>
          <p className="text-[10px] uppercase font-bold tracking-wider text-[#6B7280]">ADMISSION CRM</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-6 custom-scrollbar">
        <div className="space-y-1">
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
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[#6B7280] opacity-50 cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} />
                    <span className="font-semibold text-sm tracking-wide">{item.title}</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-[#F8FAFC] text-[#6B7280] px-2 py-0.5 rounded-full border border-[#E5E7EB]">
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
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300 font-medium group
                    ${active
                      ? "bg-[#8B1538]/10 text-[#8B1538]"
                      : "text-[#6B7280] hover:bg-[#F8FAFC] hover:text-[#111827]"
                    }
                  `}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={20} className={`transition-colors duration-300 ${active ? "text-[#8B1538]" : "text-[#6B7280] group-hover:text-[#111827]"}`} />
                    <span className="font-semibold text-sm tracking-wide">{item.title}</span>
                  </div>
                  {item.subItems && (
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? "rotate-180" : "text-[#6B7280] group-hover:text-[#111827]"}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {/* SubItems rendering */}
                {item.subItems && isExpanded && (
                  <div className="mt-1 ml-[22px] border-l-2 border-[#E5E7EB] pl-4 space-y-1 py-1">
                    {item.subItems.map((subItem) => {
                      // Note: We use pathname match here if subitems have unique paths
                      const subActive = pathname === subItem.path;
                      
                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.path}
                          onClick={() => handleNavClick(subItem.path)}
                          className={`block rounded-lg px-3 py-2 text-sm transition-all duration-300 font-medium
                            ${subActive
                              ? "text-[#8B1538] font-semibold bg-[#8B1538]/5"
                              : "text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC]"
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

      <div className="p-3 border-t border-[#E5E7EB] mt-auto shrink-0 bg-[#FFFFFF]">
        <div className="flex items-center gap-2.5 p-2 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] transition-all hover:shadow-sm">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white border border-[#E5E7EB] shadow-sm overflow-hidden text-[#6B7280]">
            <User size={16} />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate font-semibold text-[13px] leading-tight text-[#111827]">
              {user.username}
            </p>
            <p className="truncate text-[9px] text-[#6B7280] uppercase tracking-wider font-bold mt-0.5">
              {user.userGroup.replace('_', '-')}
            </p>
          </div>
          <button className="text-[#6B7280] hover:text-[#111827] pr-1 transition-colors hover:rotate-90 duration-300">
            <Settings size={16} />
          </button>
        </div>
        
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 mt-2 px-4 py-2 text-[#6B7280] hover:text-[#8B1538] w-full font-semibold text-[13px] transition-colors rounded-lg hover:bg-[#8B1538]/5"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* ===== Desktop Sidebar (≥lg) ===== */}
      <aside className="hidden lg:flex w-[260px] h-screen border-r border-[#E5E7EB] bg-[#FFFFFF] flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]">
        {sidebarContent}
      </aside>

      {/* ===== Mobile Drawer (<lg) ===== */}
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden
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
          fixed inset-y-0 left-0 z-50 w-[260px] bg-[#FFFFFF] flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out lg:hidden
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="absolute right-4 top-4 rounded-full p-2 text-[#6B7280] bg-[#F8FAFC] hover:bg-[#E5E7EB] hover:text-[#111827] transition-all duration-300"
        >
          <X size={18} />
        </button>

        {sidebarContent}
      </aside>
    </>
  );
}