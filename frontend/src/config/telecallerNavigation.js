import {
  LayoutDashboard,
  User,
} from "lucide-react";

import { ROLES } from "@/constants/roles";

const telecallerNavigation = [
  {
    title: "Dashboard",
    path: "/telecaller",
    icon: LayoutDashboard,
    roles: [ROLES.TELE_CALLER],
  },
  {
    title: "Profile",
    path: "/telecaller/profile",
    icon: User,
    roles: [ROLES.TELE_CALLER],
  },
];

export default telecallerNavigation;