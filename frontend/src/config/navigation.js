import {
  LayoutDashboard,
  BriefcaseBusiness,
  LineChart,
  Settings,
} from "lucide-react";

import { ROLES } from "@/constants/roles";

const navigation = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: [ROLES.ADMIN, ROLES.TELE_CALLER],
  },
  {
    title: "Management",
    path: "/dashboard/management",
    icon: BriefcaseBusiness,
    roles: [ROLES.ADMIN],
    subItems: [
      { title: "Leads", path: "/dashboard/management/leads" },
      { title: "User Directory", path: "/dashboard/management/user-directory" },
      { title: "Call Reports", path: "/dashboard/management/call-reports" },
    ]
  },
  {
    title: "Analytics",
    path: "/dashboard/analytics",
    icon: LineChart,
    roles: [ROLES.ADMIN],
    disabled: true,
  },
  {
    title: "Admin Tools",
    path: "/dashboard/tools",
    icon: Settings,
    roles: [ROLES.ADMIN],
    disabled: true,
  },
];

export default navigation;