import React from "react";
import Link from "next/link";
import { Users, UserPlus, PhoneCall, FileText } from "lucide-react";
import { DashboardSection } from "../dashboard-ui/DashboardSection";

export default function AdminQuickActions() {
  const actions = [
    {
      title: "Manage Leads",
      description: "Assign, filter, and track all leads",
      icon: UserPlus,
      href: "/dashboard/management/leads",
      color: "text-blue-600",
      bg: "bg-blue-50 hover:bg-blue-100",
    },
    {
      title: "User Directory",
      description: "Manage telecallers and admin users",
      icon: Users,
      href: "/dashboard/management/user-directory",
      color: "text-purple-600",
      bg: "bg-purple-50 hover:bg-purple-100",
    },
    {
      title: "Call Reports",
      description: "View daily telecaller performance",
      icon: PhoneCall,
      href: "/dashboard/management/call-reports",
      color: "text-emerald-600",
      bg: "bg-emerald-50 hover:bg-emerald-100",
    },
    {
      title: "Analytics",
      description: "View detailed system analytics",
      icon: FileText,
      href: "/dashboard/reports",
      color: "text-orange-600",
      bg: "bg-orange-50 hover:bg-orange-100",
    },
  ];

  return (
    <div className="bg-white border border-[#ECECEC] rounded-[20px] p-6 shadow-sm h-full flex flex-col hover:shadow-md transition-shadow">
      <DashboardSection title="Quick Actions" className="mb-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {actions.map((action, index) => {
            const Icon = action.icon;
            return (
              <Link
                key={index}
                href={action.href}
                className={`group flex items-start gap-4 p-4 rounded-[16px] border border-transparent transition-all duration-300 hover:shadow-sm ${action.bg}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm transition-transform group-hover:scale-105 ${action.color}`}>
                  <Icon size={20} strokeWidth={2.5} />
                </div>
                <div className="flex flex-col">
                  <h3 className="font-[600] text-gray-900 leading-none mb-1">{action.title}</h3>
                  <p className="text-xs font-[500] text-gray-500 leading-tight">{action.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </DashboardSection>
    </div>
  );
}
