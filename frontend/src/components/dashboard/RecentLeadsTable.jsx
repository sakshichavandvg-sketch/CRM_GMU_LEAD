import { Users } from "lucide-react";
import { EmptyState } from "../dashboard-ui/EmptyState";

// Status badge colors matching Stitch design
const STATUS_STYLES = {
  Contacted: "bg-[#f8e7e7] text-[#711a1a]",
  Interested: "bg-[#fef3c7] text-[#92400e]",
  New: "bg-blue-50 text-blue-700",
  Converted: "bg-green-50 text-green-700",
  Closed: "bg-gray-100 text-gray-600",
};

export default function RecentLeadsTable({ recentLeads }) {
  if (recentLeads?.error) {
    return (
      <div className="h-full min-h-[300px]">
        <EmptyState title="Failed to load leads" description="An error occurred while fetching recent leads." />
      </div>
    );
  }

  const data = recentLeads?.data || [];

  // Helper: get initials from name
  const getInitials = (name) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-200 shadow-sm p-6 h-full flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-6 px-1">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Recent Leads</h2>
        <a
          className="flex items-center gap-1 text-[#711a1a] text-sm font-semibold hover:underline"
          href="#"
        >
          View All Leads
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </header>

      {/* Lead List */}
      <div className="space-y-4 flex-1">
        {data.length === 0 ? (
          <div className="py-8">
            <EmptyState title="No recent leads" description="There are no recent leads in your pipeline." icon={Users} />
          </div>
        ) : (
          data.map((lead, index) => (
            <article
              key={lead.id || index}
              className={`flex items-center justify-between p-3 rounded-[16px] transition-colors ${
                index % 2 === 0
                  ? "border border-gray-100 bg-white"
                  : "bg-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-11 h-11 flex items-center justify-center rounded-[10px] bg-[#f5e4e4] text-[#711a1a] font-bold text-base shrink-0">
                  {getInitials(lead.student)}
                </div>
                {/* Name + Subtitle */}
                <div className="flex flex-col">
                  <span className="font-bold text-lg leading-tight text-[#3e1212]">
                    {lead.student || "Unknown"}
                  </span>
                  <span className="text-[#6b7280] text-sm font-medium mt-0.5">
                    {lead.course || "N/A"}{lead.source ? ` • ${lead.source} Source` : ""}
                  </span>
                </div>
              </div>

              {/* Status Badge + Time */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-semibold ${
                    STATUS_STYLES[lead.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {lead.status || "Unknown"}
                </span>
                {lead.time && (
                  <time className="text-xs text-gray-500 font-medium">{lead.time}</time>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}