"use client";

import { useState } from "react";

import ManagementHeader from "@/components/management/ManagementHeader";
import ManagementTabs from "@/components/management/ManagementTabs";

import UsersTable from "@/features/users/UsersTable";
import LeadsOverviewTable from "@/features/leads/components/LeadsOverviewTable";

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

      {activeTab === "leads" && <LeadsOverviewTable />}

      {activeTab === "reports" && (
        <p className="text-gray-500">
          Reports module coming later...
        </p>
      )}
    </div>
  );
}