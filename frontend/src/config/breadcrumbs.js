export const breadcrumbs = {
  dashboard: [
    { label: "Dashboard" } // Current page, no href
  ],
  management: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management" }
  ],
  leads: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management", href: "/dashboard/management" },
    { label: "Leads" }
  ],
  leadsDetail: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management", href: "/dashboard/management" },
    { label: "Leads", href: "/dashboard/management/leads" },
    { label: "Lead Details" }
  ],
  userDirectory: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management", href: "/dashboard/management" },
    { label: "User Directory" }
  ],
  callReports: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management", href: "/dashboard/management" },
    { label: "Call Reports" }
  ],
  admissions: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Admissions" }
  ],
  followups: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Follow Ups" }
  ],
  reports: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Reports" }
  ],
  settings: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Settings" }
  ],
  telecallerDetails: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Management", href: "/dashboard/management" },
    { label: "User Directory", href: "/dashboard/management/user-directory" },
    { label: "Telecaller Details" }
  ],
};