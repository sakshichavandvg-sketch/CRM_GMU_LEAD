import Link from "next/link";
import { Users, PhoneCall, Target } from "lucide-react";

export default function ManagementLandingPage() {
  const modules = [
    {
      title: "Leads",
      description: "Manage, assign, and track all incoming leads across different sources.",
      icon: Target,
      href: "/dashboard/management/leads",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "User Directory",
      description: "Manage system users, define roles, and control access permissions.",
      icon: Users,
      href: "/dashboard/management/user-directory",
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
    {
      title: "Call Reports",
      description: "Analyze telecaller performance and review comprehensive call logs.",
      icon: PhoneCall,
      href: "/dashboard/management/call-reports",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <>
      <div>
        <h1 className="text-4xl font-bold font-outfit text-slate-900">
          Management
        </h1>
        <p className="mt-2 text-gray-500">
          Choose a module to manage its settings and data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {modules.map((module) => {
          const Icon = module.icon;
          return (
            <Link 
              key={module.title}
              href={module.href}
              className="group flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:border-[#6F1D28] hover:shadow-md"
            >
              <div>
                <div className={`mb-4 inline-flex rounded-xl p-3 ${module.bg}`}>
                  <Icon size={24} className={module.color} />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900 group-hover:text-[#6F1D28] transition-colors">
                  {module.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {module.description}
                </p>
              </div>
              <div className="mt-6 flex items-center text-sm font-medium text-[#6F1D28]">
                Open Module
                <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}