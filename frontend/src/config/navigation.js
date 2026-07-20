import {
  LayoutDashboard,
  BriefcaseBusiness,
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
  },
];

export default navigation;