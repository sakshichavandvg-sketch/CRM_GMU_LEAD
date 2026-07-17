"use client";

import { useState } from "react";

import ManagementHeader from "@/components/management/ManagementHeader";
import ManagementTabs from "@/components/management/ManagementTabs";

import UsersTable from "@/features/users/UsersTable";

export default function ManagementPage() {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="space-y-8">
      <ManagementHeader activeTab={activeTab} />

      <ManagementTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "users" && <UsersTable />}

      {activeTab === "leads" && (
        <p className="text-gray-500">
          Leads module coming next...
        </p>
      )}

      {activeTab === "reports" && (
        <p className="text-gray-500">
          Reports module coming later...
        </p>
      )}
    </div>
  );
}