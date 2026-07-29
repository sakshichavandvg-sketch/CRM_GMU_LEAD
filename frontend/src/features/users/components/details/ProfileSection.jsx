"use client";

import { DashboardSection } from "@/components/dashboard-ui/DashboardSection";

export default function ProfileSection({ profile, kpi }) {
  if (!profile) return null;

  const groups = [
    {
      title: "Personal",
      items: [
        { label: "Employee ID", value: profile.empId },
        { label: "Email", value: profile.email },
        { label: "Phone", value: profile.phone },
      ]
    },
    {
      title: "Organization",
      items: [
        { label: "Role", value: profile.role },
        { label: "Department", value: profile.department },
        { label: "Reporting Manager", value: profile.reportingManager },
        { label: "Joining Date", value: profile.joiningDate },
      ]
    },
    {
      title: "Status",
      items: [
        {
          label: "Status",
          value: profile.status === "ACTIVE" ? "Active" : "Inactive",
          isBadge: true,
          badgeColor: profile.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700",
        },
        { label: "Conversion Rate", value: kpi ? `${kpi.conversionRate}%` : "N/A" },
        { label: "Assigned Leads", value: kpi ? kpi.assignedLeads : "N/A" },
      ]
    }
  ];

  return (
    <DashboardSection title="Profile Information" className="h-full">
      <div className="bg-white p-6 rounded-[20px] border border-[#ECECEC] shadow-[0_4px_20px_rgba(0,0,0,0.05)] h-full">
        <div className="flex flex-col gap-6">
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="flex flex-col gap-3">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{group.title}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                {group.items.map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-1">
                    <span className="text-[13px] text-gray-500 font-medium">{item.label}</span>
                    {item.isBadge ? (
                      <div className="flex items-center mt-0.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-[600] tracking-wide ${item.badgeColor}`}>
                          {item.value}
                        </span>
                      </div>
                    ) : (
                      <span className="text-[15px] font-[600] text-gray-900">{item.value || "-"}</span>
                    )}
                  </div>
                ))}
              </div>
              {groupIdx < groups.length - 1 && <hr className="border-[#ECECEC] mt-2" />}
            </div>
          ))}
        </div>
      </div>
    </DashboardSection>
  );
}
