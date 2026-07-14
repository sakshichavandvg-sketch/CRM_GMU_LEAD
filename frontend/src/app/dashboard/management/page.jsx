"use client";

import { useState } from "react";

import ManagementHeader from "@/components/management/ManagementHeader";
import ManagementTabs from "@/components/management/ManagementTabs";
import DataTable from "@/components/table/DataTable";

import {
  leadColumns,
  leadData,
} from "@/config/leadTable";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">

      <ManagementHeader
        title="Management"
        description="Unified lead operations, team directory and reporting."
        search={search}
        setSearch={setSearch}
        activeTab={activeTab}
      />

      <ManagementTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <DataTable
        columns={leadColumns}
        data={leadData}
      />

    </div>
  );
}