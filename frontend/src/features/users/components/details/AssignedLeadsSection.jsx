"use client";

import { useRouter } from "next/navigation";
import DataTable from "@/components/table/DataTable";
import StatusBadge from "@/components/table/StatusBadge";
import PriorityBadge from "@/components/table/PriorityBadge";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import useTelecallerAssignedLeads from "@/features/users/hooks/useTelecallerAssignedLeads";
import { useState } from "react";

const columns = [
  { key: "enquiryNo", label: "Enquiry No" },
  { 
    key: "studentName", 
    label: "Student Name",
    render: (value) => (
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#7A1F2B]/10 font-[600] text-[#7A1F2B] ring-2 ring-white shadow-sm">
          {value ? value.charAt(0).toUpperCase() : "?"}
        </div>
        <span className="font-[600] text-gray-900">{value || "Unknown"}</span>
      </div>
    )
  },
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

export default function AssignedLeadsSection({ leads, userId }) {
  const router = useRouter();
  const [filters] = useState({ page: 0, size: 10 });

  const { data, isError } = useTelecallerAssignedLeads(userId, filters);

  const displayLeads = data?.data?.length > 0 ? data.data : leads;

  if (isError && !displayLeads) {
    return (
      <DashboardSection className="h-full">
        <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-sm flex flex-col h-[500px] items-center justify-center">
          <p className="text-red-500 font-medium">Failed to load assigned leads.</p>
        </div>
      </DashboardSection>
    );
  }

  if (!displayLeads) return null;

  return (
    <DashboardSection title="Assigned Leads" className="h-full w-full overflow-hidden">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col h-[500px]">
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
    </DashboardSection>
  );
}
