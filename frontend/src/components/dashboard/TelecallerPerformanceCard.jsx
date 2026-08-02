"use client";

import { useCallReportsSummary } from "@/features/callReports/hooks/useCallReports";
import { Users } from "lucide-react";
import { EmptyState } from "../dashboard-ui/EmptyState";

// Avatar color rotation per Stitch design
const AVATAR_STYLES = [
  "bg-[#741B1B] text-white",        // Maroon (primary)
  "bg-yellow-500 text-white",        // Gold
  "bg-blue-100 text-blue-600",       // Light blue
  "bg-emerald-500 text-white",       // Green
  "bg-purple-500 text-white",        // Purple
];

export default function TelecallerPerformanceCard() {
  // Reuse existing hook — fetch top 3 telecallers for the dashboard widget
  const { data, isLoading, isError } = useCallReportsSummary({}, 0, 3);

  // Normalize rows from the API response (same logic as TelecallerPerformanceTable)
  const rows = Array.isArray(data?.content)
    ? data.content
    : Array.isArray(data?.users)
    ? data.users
    : Array.isArray(data)
    ? data
    : [];

  // Get first initial for avatar
  const getInitial = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Telecaller Performance</h2>
        <a
          className="text-[#741B1B] flex items-center gap-1 text-sm font-semibold hover:opacity-80 transition-opacity"
          href="/dashboard/management/call-reports"
        >
          View Ranking
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex-1 flex items-center justify-center min-h-[160px]">
          <div className="animate-pulse space-y-4 w-full">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-gray-100" />
                <div className="flex-1 h-4 bg-gray-100 rounded" />
                <div className="w-12 h-4 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        </div>
      ) : isError || rows.length === 0 ? (
        <div className="flex-1 min-h-[160px]">
          <EmptyState
            title="No performance data"
            description="Telecaller performance data is not available yet."
            icon={Users}
          />
        </div>
      ) : (
        /* Performance Table — Stitch design */
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-left">
            <thead>
              <tr className="text-[10px] tracking-widest text-gray-400 font-bold uppercase border-b border-gray-50">
                <th className="pb-3 w-12"># NAME</th>
                <th className="pb-3 px-4"></th>
                <th className="pb-3 text-right">Calls</th>
                <th className="pb-3 text-right">Follow-ups</th>
                <th className="pb-3 text-right">Admissions</th>
                <th className="pb-3 text-right">Conv.%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {rows.map((row, idx) => {
                const avatarStyle = AVATAR_STYLES[idx % AVATAR_STYLES.length];

                return (
                  <tr key={row.userId || row.slNo || idx} className="group">
                    {/* Rank */}
                    <td className="py-3 text-gray-500 text-sm">{idx + 1}</td>

                    {/* Name + Avatar */}
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${avatarStyle}`}>
                          {getInitial(row.name)}
                        </div>
                        <span className="font-semibold text-gray-800">{row.name || "—"}</span>
                      </div>
                    </td>

                    {/* Calls — real backend data */}
                    <td className="py-3 text-right text-gray-700 font-medium">
                      {row.totalCalls ?? "—"}
                    </td>

                    {/* Follow-ups — not available in this API, show placeholder */}
                    <td className="py-3 text-right text-gray-400 font-medium">
                      --
                    </td>

                    {/* Admissions — not available in this API, show placeholder */}
                    <td className="py-3 text-right text-gray-400 font-medium">
                      --
                    </td>

                    {/* Conversion % — not available, show placeholder */}
                    <td className="py-3 text-right text-gray-400 font-medium">
                      --
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
