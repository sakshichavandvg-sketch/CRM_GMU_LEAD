import {
  LayoutDashboard,
  BriefcaseBusiness,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["ADMIN", "TELECALLER"],
  },
  {
    title: "Management",
    path: "/dashboard/management",
    icon: BriefcaseBusiness,
    roles: ["ADMIN"],
  },
];

export default navigation;