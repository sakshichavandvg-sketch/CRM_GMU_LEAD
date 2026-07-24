"use client";

import SearchBar from "./SearchBar";
import TableActions from "./TableActions";
import DashboardHeader from "../dashboard/DashboardHeader";
import { useTableScroll } from "@/providers/TableScrollProvider";

export default function ManagementHeader({
  title,
  description,
  breadcrumbs,
  search,
  setSearch,
  activeTab,
  actions,
}) {
  const { isScrolled } = useTableScroll();

  return (
    <div className={`transition-all duration-300 ease-in-out ${isScrolled ? "space-y-3" : "space-y-6"}`}>
      {breadcrumbs && <DashboardHeader breadcrumbs={breadcrumbs} />}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div>

          <h1 className="text-4xl font-bold font-outfit text-slate-900">
            {title}
          </h1>

          <p className={`text-gray-500 transition-all duration-300 ease-in-out ${isScrolled ? "mt-1" : "mt-2"}`}>
            {description}
          </p>

        </div>

        {actions ? actions : <TableActions activeTab={activeTab} />}

      </div>

      {setSearch && (
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={
            activeTab === "users"
              ? "Search users..."
              : activeTab === "calls"
              ? "Search reports..."
              : "Search leads..."
          }
        />
      )}

    </div>
  );
}