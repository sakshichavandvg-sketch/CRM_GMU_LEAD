import React from "react";
import { TableSkeleton } from "@/components/ui/Skeletons";

// Formatters copied from page logic
const toTitleCase = (str) => {
  if (!str) return "-";
  return str
    .toLowerCase()
    .split(/[\s_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return parts[0].substring(0, 2).toUpperCase();
};

const getStatusBadge = (status) => {
  const normalized = (status || "").toUpperCase().replace(/_/g, " ");
  let bgClass = "bg-surface-variant/50";
  let textClass = "text-on-surface-variant";

  if (normalized.includes("NEW") || normalized.includes("ENQUIRY")) {
    bgClass = "bg-secondary/10";
    textClass = "text-secondary";
  } else if (normalized.includes("NOT INTERESTED") || normalized.includes("COLD")) {
    bgClass = "bg-surface-variant";
    textClass = "text-on-surface-variant";
  } else if (normalized.includes("INTERESTED") || normalized.includes("WARM")) {
    bgClass = "bg-tertiary/10";
    textClass = "text-tertiary";
  } else if (normalized.includes("ADMISSION") || normalized.includes("ENROLLED")) {
    bgClass = "bg-primary/10";
    textClass = "text-primary";
  } else if (normalized.includes("FOLLOW UP") || normalized.includes("PROGRESS")) {
    bgClass = "bg-orange-500/10";
    textClass = "text-orange-600";
  }

  return (
    <span className={`px-3 py-1 ${bgClass} ${textClass} rounded-full font-status-pill text-status-pill uppercase`}>
      {normalized}
    </span>
  );
};

const getOpinionBadge = (opinion) => {
  const normalized = (opinion || "").toUpperCase();
  if (!normalized) return <span className="text-outline-variant">-</span>;

  let bgClass = "bg-surface-variant/50";
  let textClass = "text-on-surface-variant";
  let dotClass = "bg-on-surface-variant";

  if (normalized.includes("INTERESTED") && !normalized.includes("NOT")) {
    bgClass = "bg-tertiary/10";
    textClass = "text-tertiary";
    dotClass = "bg-tertiary";
  } else if (normalized.includes("NOT INTERESTED")) {
    bgClass = "bg-surface-variant";
    textClass = "text-on-surface-variant";
    dotClass = "bg-on-surface-variant";
  } else if (normalized.includes("PENDING") || normalized.includes("TIME")) {
    bgClass = "bg-yellow-100";
    textClass = "text-yellow-700";
    dotClass = "bg-yellow-600";
  } else if (normalized.includes("CALLBACK") || normalized.includes("CALL BACK") || normalized.includes("WARM") || normalized.includes("HOT")) {
    bgClass = "bg-orange-500/10";
    textClass = "text-orange-600";
    dotClass = "bg-orange-600";
  }

  return (
    <span className={`flex items-center gap-1.5 px-3 py-1 ${bgClass} ${textClass} rounded-full font-status-pill text-status-pill uppercase w-fit`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>
      {toTitleCase(opinion).toUpperCase()}
    </span>
  );
};

// Simple pseudo-random color for avatar based on string
const getAvatarColors = (str) => {
  const colors = [
    { bg: 'bg-red-100', text: 'text-red-700' },
    { bg: 'bg-pink-100', text: 'text-pink-700' },
    { bg: 'bg-purple-100', text: 'text-purple-700' },
    { bg: 'bg-blue-100', text: 'text-blue-700' },
    { bg: 'bg-green-100', text: 'text-green-700' },
    { bg: 'bg-yellow-100', text: 'text-yellow-700' },
    { bg: 'bg-orange-100', text: 'text-orange-700' },
  ];
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
};

export default function MyLeadsTable({ data = [], onRowClick, isLoading }) {
  if (isLoading) {
    return (
      <div className="bg-surface-container-lowest premium-shadow rounded-xl overflow-hidden p-6">
        <TableSkeleton rows={8} columns={10} />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="bg-surface-container-lowest premium-shadow rounded-xl overflow-hidden p-12 text-center text-on-surface-variant">
        No leads found.
      </div>
    );
  }

  return (
    <div className="bg-surface-container-lowest premium-shadow rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant">
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Enquiry No</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;Lead</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Mobile No</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Course</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Opinion</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Calls</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">District</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Source</th>
              <th className="px-6 py-4 font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/30">
            {data.map((row) => {
              const nameTitleCase = toTitleCase(row.name);
              const initials = getInitials(nameTitleCase);
              const avatarColors = getAvatarColors(row.name || "");
              const callCount = row.callCount || 0;
              const courseText = row.course ? (['MCA', 'BCA', 'MBA', 'BTECH', 'MTECH', 'BBA'].includes(row.course.toUpperCase()) ? row.course.toUpperCase() : toTitleCase(row.course)) : "-";
              
              const districtMain = row.city || row.district || "Unknown";
              const districtSub = row.state || "";

              return (
                <tr 
                  key={row.enquiryNo} 
                  className="hover:bg-surface-container-low/50 transition-colors group h-row-height cursor-pointer"
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  <td className="px-6 py-4 text-body-md font-semibold text-on-surface">#{row.enquiryNo}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${avatarColors.bg} flex items-center justify-center ${avatarColors.text} font-bold`}>
                        {initials}
                      </div>
                      <div>
                        <p className="text-title-sm font-title-sm text-on-surface">{nameTitleCase}</p>
                        <p className="text-body-sm text-on-surface-variant">{row.email || (row.name ? row.name.toLowerCase().replace(/\s/g,'.') + '@gmail.com' : '')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-secondary font-medium text-body-md">
                      {row.mobileNo || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface">{courseText}</td>
                  <td className="px-6 py-4">{getStatusBadge(row.status)}</td>
                  <td className="px-6 py-4">{getOpinionBadge(row.opinion)}</td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-2 ${callCount > 0 ? "text-on-surface-variant" : "text-outline-variant"}`}>
                      {callCount > 0 && <span className="material-symbols-outlined text-secondary text-[20px]">phone_forwarded</span>}
                      {callCount === 0 && <span className="material-symbols-outlined text-[20px]">phone_disabled</span>}
                      <span className="font-bold">{callCount}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-body-md font-semibold text-on-surface">{toTitleCase(districtMain)}</p>
                    {districtSub && <p className="text-body-sm text-on-surface-variant">{toTitleCase(districtSub)}</p>}
                  </td>
                  <td className="px-6 py-4 text-body-md text-on-surface">{toTitleCase(row.source)}</td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onRowClick && onRowClick(row); }}
                      className="flex items-center gap-2 px-4 py-1.5 border border-primary text-primary font-semibold rounded hover:bg-primary hover:text-white transition-all text-sm"
                    >
                      <span className="material-symbols-outlined text-[18px]">visibility</span>
                      View
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
