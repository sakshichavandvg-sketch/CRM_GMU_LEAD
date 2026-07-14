import {
  LayoutDashboard,
  BriefcaseBusiness,
  GraduationCap,
  CalendarCheck,
  BarChart3,
  Settings,
  Sparkles,
  Bot,
  TrendingUp,
} from "lucide-react";

const navigation = [
  {
    section: "Workspace",

    items: [
      {
        label: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["ADMIN", "TELECALLER"],
      },

      {
        label: "Management",
        href: "/dashboard/management",
        icon: BriefcaseBusiness,
        roles: ["ADMIN"],
      },

      {
        label: "Admissions",
        href: "/dashboard/admissions",
        icon: GraduationCap,
        roles: ["ADMIN"],
      },

      {
        label: "Follow Ups",
        href: "/dashboard/followups",
        icon: CalendarCheck,
        roles: ["ADMIN", "TELECALLER"],
      },

      {
        label: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
        roles: ["ADMIN"],
      },

      {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
        roles: ["ADMIN", "TELECALLER"],
      },
    ],
  },

  {
    section: "Coming Soon",

    items: [
      {
        label: "AI Lead Scoring",
        href: "#",
        icon: Sparkles,
        disabled: true,
      },

      {
        label: "WhatsApp Bot",
        href: "#",
        icon: Bot,
        disabled: true,
      },

      {
        label: "Forecasting",
        href: "#",
        icon: TrendingUp,
        disabled: true,
      },
    ],
  },
];

export default navigation;