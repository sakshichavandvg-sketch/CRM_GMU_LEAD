import {
  LayoutDashboard,
  Users,
  CalendarClock,
  PhoneCall,
  LineChart,
  FileText,
  User,
  LifeBuoy,
  Mic,
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
    title: "My Leads",
    path: "/telecaller/leads",
    icon: Users,
    roles: [ROLES.TELE_CALLER],
  },
  {
    title: "Follow-ups",
    path: "/telecaller/follow-ups",
    icon: CalendarClock,
    roles: [ROLES.TELE_CALLER],
  },
  {
    title: "Calls",
    path: "/telecaller/calls",
    icon: PhoneCall,
    roles: [ROLES.TELE_CALLER],
  },
  {
    title: "Recordings",
    path: "/telecaller/recordings",
    icon: Mic,
    roles: [ROLES.TELE_CALLER],
  },
];

export default telecallerNavigation;