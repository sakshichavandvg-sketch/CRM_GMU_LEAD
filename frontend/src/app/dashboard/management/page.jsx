"use client";

import { useMemo, useState } from "react";

import ManagementHeader from "@/components/management/ManagementHeader";
import ManagementTabs from "@/components/management/ManagementTabs";
import SearchBar from "@/components/management/SearchBar";
import Pagination from "@/components/table/Pagination";

import DataTable from "@/components/table/DataTable";
import BulkActionBar from "@/components/table/BulkActionBar"; //  Import

import {
  leadColumns,
  leadData,
  userColumns,
  userData,
  reportColumns,
  reportData,
} from "@/config/managementData";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]); //  New state

  const pageSize = 10;

  const current = useMemo(() => {
    switch (activeTab) {
      case "users":
        return {
          columns: userColumns,
          data: userData,
        };
      case "reports":
        return {
          columns: reportColumns,
          data: reportData,
        };
      default:
        return {
          columns: leadColumns,
          data: leadData,
        };
    }
  }, [activeTab]);

  //  Apply search filter
  const filteredData = current.data.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  //  Paginate after filtering
  const paginatedData = filteredData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  return (
    <div className="space-y-8">
      <ManagementHeader activeTab={activeTab} />

      <ManagementTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder={`Search ${activeTab}...`}
      />

      {/*  Bulk Action Bar */}
      <BulkActionBar
        selectedCount={selectedRows.length}
        onClear={() => setSelectedRows([])}
      />

      <DataTable
        columns={current.columns}
        data={paginatedData}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
      />

      <Pagination
        currentPage={page}
        totalPages={Math.ceil(filteredData.length / pageSize)}
        totalItems={filteredData.length}
        pageSize={pageSize}
        onPageChange={setPage}
      />
    </div>
  );
}
