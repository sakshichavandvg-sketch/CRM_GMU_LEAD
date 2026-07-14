"use client";

import SearchBar from "./SearchBar";
import TableActions from "./TableActions";

export default function ManagementHeader({
  title,
  description,
  search,
  setSearch,
  activeTab,
}) {
  return (
    <div className="space-y-6">

      <div className="flex items-start justify-between">

        <div>

          <h1 className="text-4xl font-bold font-outfit text-slate-900">
            {title}
          </h1>

          <p className="mt-2 text-gray-500">
            {description}
          </p>

        </div>

        <TableActions activeTab={activeTab} />

      </div>

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

    </div>
  );
}