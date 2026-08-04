"use client";

import React from "react";

export default function LeadsDataTable({
  data = [],
  selectedRows = [],
  setSelectedRows,
  onRowClick,
  pagination,
}) {
  const allSelected = data.length > 0 && data.every(row => selectedRows.includes(row.enquiryNo || row.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map(row => row.enquiryNo || row.id));
    }
  };

  const toggleRow = (id, e) => {
    e.stopPropagation();
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(item => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-purple-500", "bg-blue-500", "bg-green-500", "bg-orange-500",
      "bg-pink-500", "bg-teal-500", "bg-red-500", "bg-indigo-500"
    ];
    if (!name) return colors[0];
    const idx = name.charCodeAt(0) % colors.length;
    return colors[idx];
  };

  const formatDate = (dateString) => {
    if (!dateString) return { date: "-", time: "-" };
    try {
      const d = new Date(dateString);
      if (isNaN(d.getTime())) return { date: "-", time: "-" };
      const date = d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
      const time = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
      return { date, time };
    } catch {
      return { date: "-", time: "-" };
    }
  };

  const getStatusChip = (status) => {
    const s = (status || "").toLowerCase().replace(/_/g, " ");
    if (s.includes("hot")) return "bg-orange-50 text-orange-700 border border-orange-200";
    if (s.includes("cold")) return "bg-blue-50 text-blue-700 border border-blue-200";
    if (s.includes("converted") || s.includes("alloted") || s.includes("allotted")) return "bg-green-50 text-green-700 border border-green-200";
    if (s.includes("not interest")) return "bg-red-50 text-red-700 border border-red-200";
    if (s.includes("not consulted")) return "bg-rose-50 text-rose-700 border border-rose-200";
    if (s.includes("completed")) return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    if (s.includes("enquiry") || s.includes("new")) return "bg-sky-50 text-sky-700 border border-sky-200";
    return "bg-gray-50 text-gray-600 border border-gray-200";
  };

  const getSourceIcon = (source) => {
    const s = (source || "").toLowerCase();
    if (s.includes("referral")) return { icon: "group", color: "text-purple-500" };
    if (s.includes("instagram") || s.includes("social")) return { icon: "camera_enhance", color: "text-pink-500" };
    if (s.includes("walk")) return { icon: "directions_walk", color: "text-green-500" };
    if (s.includes("web") || s.includes("online")) return { icon: "language", color: "text-blue-500" };
    if (s.includes("phone") || s.includes("call")) return { icon: "call", color: "text-indigo-500" };
    return { icon: "public", color: "text-gray-400" };
  };

  const { currentPage = 0, pageSize = 10, totalPages = 1, totalItems = 0, onPageChange, onPageSizeChange } = pagination || {};
  const startItem = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  // Build page numbers to show (show up to 5 pages around current)
  const getPageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(0, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);
    for (let i = left; i <= right; i++) pages.push(i);
    return pages;
  };

  return (
    <>
      <div className="overflow-x-auto w-full">
        <table className="w-full min-w-[900px] text-left border-collapse">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="w-4 h-4 rounded border-gray-300 text-[#8B0D16] focus:ring-[#8B0D16] cursor-pointer"
                />
              </th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Enquiry No</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Course</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Source</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned To</th>
              <th className="py-3 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">Created On</th>
              <th className="py-3 px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.length === 0 ? (
              <tr>
                <td colSpan="10" className="py-16 text-center text-sm text-gray-400">
                  <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl text-gray-300">folder_open</span>
                    <span>No leads found</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.map((lead) => {
                const id = lead.enquiryNo || lead.id;
                const isSelected = selectedRows.includes(id);
                const { date: createdDate, time: createdTime } = formatDate(lead.createdAt || lead.createdDate || lead.created_at);
                const sourceData = getSourceIcon(lead.source);
                const assignedName = lead.assignedUser?.name || lead.assignedUserName || lead.assignedTo || "Unassigned";
                const assignedRole = lead.assignedUser?.role || lead.role || "Staff";

                return (
                  <tr
                    key={id}
                    onClick={() => onRowClick && onRowClick(lead)}
                    className={`hover:bg-gray-50/80 transition-colors cursor-pointer ${isSelected ? "bg-[#8B0D16]/[0.03]" : "bg-white"}`}
                  >
                    {/* Checkbox */}
                    <td className="py-4 px-4" onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={e => toggleRow(id, e)}
                        className="w-4 h-4 rounded border-gray-300 text-[#8B0D16] focus:ring-[#8B0D16] cursor-pointer"
                      />
                    </td>

                    {/* Enquiry No */}
                    <td className="py-4 px-3">
                      <span className="text-sm font-bold text-[#8B0D16]">#{id}</span>
                    </td>

                    {/* Student */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-3 min-w-[140px]">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(lead.name)}`}>
                          {getInitials(lead.name)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-semibold text-gray-900 truncate">{lead.name || "-"}</span>
                          <span className="text-xs text-gray-400 truncate">{lead.email || "-"}</span>
                        </div>
                      </div>
                    </td>

                    {/* Mobile */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-1.5 text-gray-600">
                        <span className="material-symbols-outlined text-[16px] text-gray-400">call</span>
                        <span className="text-sm">{lead.mobileNo || lead.mobile || "-"}</span>
                      </div>
                    </td>

                    {/* Course */}
                    <td className="py-4 px-3">
                      <div className="flex flex-col min-w-[80px]">
                        <span className="text-sm font-medium text-gray-800">{lead.course || "-"}</span>
                        <span className="text-xs text-gray-400">Session {new Date().getFullYear()}</span>
                      </div>
                    </td>

                    {/* Source */}
                    <td className="py-4 px-3">
                      <div className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg">
                        <span className={`material-symbols-outlined text-[15px] ${sourceData.color}`}>{sourceData.icon}</span>
                        <span className="text-xs font-medium text-gray-600">{lead.source || "Unknown"}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-3">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${getStatusChip(lead.status)}`}>
                        {lead.status || "NEW"}
                      </span>
                    </td>

                    {/* Assigned To */}
                    <td className="py-4 px-3">
                      <div className="flex items-center gap-2 min-w-[110px]">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0 ${getAvatarColor(assignedName)}`}>
                          {getInitials(assignedName)}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-semibold text-gray-800 truncate">{assignedName}</span>
                          <span className="text-[11px] text-gray-400 truncate">{assignedRole}</span>
                        </div>
                      </div>
                    </td>

                    {/* Created On */}
                    <td className="py-4 px-3 whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="text-sm text-gray-700">{createdDate}</span>
                        <span className="text-xs text-gray-400">{createdTime}</span>
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={e => { e.stopPropagation(); }}
                        className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <span className="material-symbols-outlined text-[20px]">more_vert</span>
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {totalPages > 0 && (
        <div className="px-6 py-4 flex justify-between items-center border-t border-gray-100 bg-white flex-wrap gap-3">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rows per page:</span>
              <select
                value={pageSize}
                onChange={e => onPageSizeChange && onPageSizeChange(Number(e.target.value))}
                className="text-sm text-gray-700 bg-white border border-gray-200 rounded-lg px-2 py-1 focus:ring-1 focus:ring-[#8B0D16] focus:border-[#8B0D16] outline-none cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <span className="text-sm text-gray-500">
              {startItem}–{endItem} of {totalItems}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* First */}
            <button
              disabled={currentPage === 0}
              onClick={() => onPageChange && onPageChange(0)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">first_page</span>
            </button>
            {/* Prev */}
            <button
              disabled={currentPage === 0}
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_left</span>
            </button>

            {getPageNumbers().map(pageNum => (
              <button
                key={pageNum}
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                  currentPage === pageNum
                    ? "bg-[#8B0D16] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {pageNum + 1}
              </button>
            ))}

            {/* Next */}
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chevron_right</span>
            </button>
            {/* Last */}
            <button
              disabled={currentPage >= totalPages - 1}
              onClick={() => onPageChange && onPageChange(totalPages - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">last_page</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
