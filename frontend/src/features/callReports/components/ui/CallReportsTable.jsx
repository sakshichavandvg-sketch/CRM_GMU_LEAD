"use client";

import React from "react";
import CallReportsPagination from "./CallReportsPagination";

export default function CallReportsTable({
  data,
  onRowClick,
  paginationProps,
}) {
  const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const getStatusBadge = (status) => {
    // Basic mapping, can be extended
    const s = (status || "Offline").toLowerCase();
    if (s === "online") {
      return (
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-green-50 text-green-700 font-label-md text-[13px]">
          <span className="w-2 h-2 rounded-full bg-green-600"></span> Online
        </span>
      );
    } else if (s === "in call") {
      return (
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-blue-50 text-blue-700 font-label-md text-[13px]">
          <span className="w-2 h-2 rounded-full bg-blue-600"></span> In Call
        </span>
      );
    } else if (s === "idle") {
      return (
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-orange-50 text-orange-700 font-label-md text-[13px]">
          <span className="w-2 h-2 rounded-full bg-orange-600"></span> Idle
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center gap-1.5 py-1 px-3 rounded-full bg-slate-100 text-slate-700 font-label-md text-[13px]">
          <span className="w-2 h-2 rounded-full bg-slate-600"></span> Offline
        </span>
      );
    }
  };

  const formatDuration = (seconds) => {
    if (seconds == null) return "—";
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hrs > 0) {
      return `${hrs}h ${mins}m`;
    }
    return `${mins < 10 ? '0' : ''}${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "—";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "—";
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="bg-surface-container-lowest rounded-[24px] glass-card overflow-hidden">
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[1200px]">
          <thead className="bg-[#FFF6F5] sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">TELECALLER</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">STATUS</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">TOTAL CALLS</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">CONNECTED</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">MISSED / BUSY</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">TOTAL TALK TIME</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">AVG DURATION</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">CONVERSIONS</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">RECORDINGS</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap">LAST ACTIVE</th>
              <th className="px-6 py-4 font-label-md text-[12px] uppercase tracking-wider text-primary-container whitespace-nowrap text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {data.map((row, idx) => {
              const totalCalls = row.totalCalls || 0;
              const connectedCalls = row.connectedCalls || 0;
              const connectedRate = totalCalls > 0 ? Math.round((connectedCalls / totalCalls) * 100) : 0;
              
              const missedCalls = row.missedBusy || (totalCalls - connectedCalls);
              const conversions = row.conversions || 0;
              const conversionRate = totalCalls > 0 ? Math.round((conversions / totalCalls) * 100) : 0;

              return (
                <tr
                  key={row.userId || row.empId || row.id || idx}
                  className="hover:bg-surface transition-colors group cursor-pointer"
                  onClick={() => onRowClick(row)}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center font-bold text-red-700">
                        {getInitials(row.name)}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface font-bold m-0">{row.name || "—"}</p>
                        <p className="font-description text-secondary m-0">{row.email || "—"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    {getStatusBadge(row.status)}
                  </td>
                  <td className="px-6 py-5 font-label-md text-on-surface font-bold">{totalCalls}</td>
                  <td className="px-6 py-5">
                    <p className="font-label-md text-on-surface font-bold m-0">{connectedCalls}</p>
                    <p className="font-description text-green-600 m-0">{connectedRate}% rate</p>
                  </td>
                  <td className="px-6 py-5 font-label-md text-on-surface font-bold">
                    {missedCalls}
                  </td>
                  <td className="px-6 py-5 font-label-md text-on-surface">
                    {formatDuration(row.totalTalkTime)}
                  </td>
                  <td className="px-6 py-5 font-label-md text-on-surface">
                    {formatDuration(row.avgDuration)}
                  </td>
                  <td className="px-6 py-5">
                    <p className="font-label-md text-on-surface font-bold m-0">{conversions}</p>
                    <p className="font-description text-green-600 m-0">{conversionRate}% rate</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                        <span className="material-symbols-outlined text-[18px]">mic</span>
                      </div>
                      <span className="font-label-md font-bold">{row.recordingsCount || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 font-label-md text-on-surface">
                    {formatDate(row.lastActive)}
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onRowClick(row);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-primary-container text-primary-container rounded-lg font-label-md hover:bg-primary-container hover:text-white transition-all group/btn"
                    >
                      <span className="material-symbols-outlined text-[20px]">visibility</span>
                      View Logs
                      <span className="material-symbols-outlined text-[16px] group-hover/btn:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      <CallReportsPagination {...paginationProps} />
    </section>
  );
}
