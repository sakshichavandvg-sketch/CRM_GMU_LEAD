"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/table/DataTable";
import StatusBadge from "@/components/table/StatusBadge";
import PriorityBadge from "@/components/table/PriorityBadge";

const columns = [
  { key: "enquiryNo", label: "Enquiry No" },
  { key: "studentName", label: "Student Name" },
  { key: "mobile", label: "Mobile" },
  { key: "source", label: "Source" },
  {
    key: "status",
    label: "Status",
    render: (value) => <StatusBadge status={value} />,
  },
  {
    key: "temperature",
    label: "Temperature",
    render: (value) => <PriorityBadge priority={value} />,
  },
  { key: "stage", label: "Stage" },
  { key: "assignedDate", label: "Assigned Date" },
];

import useTelecallerAssignedLeads from "@/features/users/hooks/useTelecallerAssignedLeads";
import { useState } from "react";

export default function AssignedLeadsSection({ leads, userId }) {
  const router = useRouter();
  const [filters, setFilters] = useState({ page: 0, size: 10 });

  const { data, isLoading, isError } = useTelecallerAssignedLeads(userId, filters);

  const displayLeads = data?.data?.length > 0 ? data.data : leads;

  if (isError && !displayLeads) {
    return (
      <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm flex flex-col h-[500px] items-center justify-center">
        <p className="text-red-500 font-medium">Failed to load assigned leads.</p>
      </div>
    );
  }

  if (!displayLeads) return null;

  return (
    <div className="bg-white p-6 rounded-[22px] border border-gray-200 shadow-sm flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-900">Assigned Leads</h3>
      </div>
      <div className="flex-1 overflow-hidden">
        <DataTable
          density="compact"
          columns={columns}
          data={displayLeads}
          rowKey="enquiryNo"
          selectable={false}
          onRowClick={(lead) => router.push(`/dashboard/management/leads/${lead.enquiryNo}?from=telecaller&userId=${userId}`)}
        />
      </div>
    </div>
  );
}
