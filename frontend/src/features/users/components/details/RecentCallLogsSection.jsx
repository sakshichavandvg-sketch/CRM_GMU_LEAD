"use client";

import { useRouter } from "next/navigation";
import { Phone, MoreVertical, PhoneCall, PhoneOff, PhoneForwarded, PhoneMissed } from "lucide-react";
import DataTable from "@/components/table/DataTable";
import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";
import { useTelecallerCallLogs } from "@/features/callReports/hooks/useCallReports";
import { useState } from "react";

const getOutcomeStyle = (outcome) => {
  const text = outcome?.toLowerCase() || "";
  if (text.includes("interested") && !text.includes("not")) return { icon: PhoneCall, color: "text-emerald-600" };
  if (text.includes("not interested")) return { icon: PhoneOff, color: "text-red-500" };
  if (text.includes("follow-up")) return { icon: PhoneForwarded, color: "text-blue-500" };
  if (text.includes("no response") || text.includes("missed")) return { icon: PhoneMissed, color: "text-gray-400" };
  if (text.includes("connected")) return { icon: PhoneCall, color: "text-emerald-500" };
  
  return { icon: Phone, color: "text-gray-500" };
};

const columns = [
  { 
    key: "studentName", 
    label: "LEAD NAME",
    render: (value) => <span className="font-[700] text-gray-900">{value || "--"}</span>
  },
  { 
    key: "mobile", 
    label: "MOBILE NUMBER",
    render: (value) => <span className="font-[600] text-gray-900">{value || "--"}</span>
  },
  { 
    key: "callTime", 
    label: "CALL TIME",
    render: (value) => <span className="font-[600] text-gray-600">{value || "--"}</span>
  },
  { 
    key: "duration", 
    label: "DURATION",
    render: (value) => <span className="font-[700] text-gray-900">{value || "--"}</span>
  },
  {
    key: "outcome",
    label: "CALL OUTCOME",
    render: (value) => {
      const { icon: Icon, color } = getOutcomeStyle(value);
      return (
        <div className="flex items-center gap-2">
          <Icon className={`w-4 h-4 ${color}`} />
          <span className={`font-[600] ${color}`}>{value || "--"}</span>
        </div>
      );
    }
  },
  { 
    key: "nextFollowUp", 
    label: "NEXT FOLLOW-UP",
    render: (value) => <span className="font-[600] text-gray-600">{value || "--"}</span>
  },
  {
    key: "actions",
    label: "ACTIONS",
    render: () => (
      <button className="p-1 hover:bg-gray-100 rounded-md text-gray-500 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    )
  }
];

export default function RecentCallLogsSection({ userId }) {
  const router = useRouter();
  const [filters] = useState({ page: 0, size: 5 });

  const { data, isError, isLoading } = useTelecallerCallLogs(userId, filters);

  const displayLogs = data?.data?.length > 0 ? data.data : data?.content?.length > 0 ? data.content : Array.isArray(data) ? data : [];

  return (
    <DashboardSection 
      title={
        <div className="flex items-center gap-2">
          <Phone className="w-5 h-5 text-[#991b1b]" />
          <span>Recent Call Logs</span>
        </div>
      }
      action={
        <button className="px-4 py-1.5 border border-gray-200 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
          View All
        </button>
      }
      className="h-full w-full overflow-hidden"
    >
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] flex flex-col min-h-[400px]">
        {isError ? (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-red-500 font-medium">Failed to load recent call logs.</p>
          </div>
        ) : isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse space-y-4 w-full">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-12 bg-gray-100 rounded w-full" />
              ))}
            </div>
          </div>
        ) : displayLogs.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
             <p className="text-gray-500 font-medium">No recent call logs available.</p>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <DataTable
              density="comfortable"
              columns={columns}
              data={displayLogs}
              rowKey={(row, i) => row.id || i}
              selectable={false}
              onRowClick={() => {}}
            />
          </div>
        )}
      </div>
    </DashboardSection>
  );
}
