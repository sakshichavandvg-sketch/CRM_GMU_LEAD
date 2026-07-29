"use client";

import { Edit, Phone, Mail, Trash2, MapPin, FileText, StickyNote, Hash } from "lucide-react";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";

/**
 * ProfileHero — ONE unified component shared by Admin and Telecaller.
 *
 * Layout:
 *   [Avatar] [Name · Badge · LeadID · Phone · Email · Location] [actions | Edit | Delete]
 *
 * Props:
 *   data          — viewModel ({ header, status, contact })
 *   actions       — role-specific JSX buttons rendered before Edit Lead
 *   onEdit        — opens the edit dialog (injected by LeadDetailsView)
 *   onDelete      — admin only; when provided, Delete Lead button appears
 *   isDeleting    — loading state for delete button
 *   docCount      — optional document count (number)
 *   noteCount     — optional notes count (number)
 */
export default function ProfileHero({
  data,
  actions,
  onEdit,
  onDelete,
  isDeleting,
  docCount,
  noteCount,
}) {
  if (!data) return null;
  const { header, status, contact } = data;

  const initials = header?.name
    ? header.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  // Determine temperature badge color
  const opinion = (header?.opinion || header?.priority || status?.stage || "WARM").toUpperCase();
  const opinionColors = {
    HOT:  "bg-red-50 text-red-600 border-red-200",
    WARM: "bg-orange-50 text-orange-600 border-orange-200",
    COLD: "bg-blue-50 text-blue-600 border-blue-200",
  };
  const opinionClass = opinionColors[opinion] || opinionColors.WARM;

  // Current status
  const currentStatus = (status?.currentStatus || "ENQUIRY").toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-white border border-[#ECECEC] rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] p-6 mb-6 w-full"
    >
      {/* ── Main row: Avatar + Info + Actions ───────────────────────────────── */}
      <div className="flex items-start justify-between gap-6">

        {/* LEFT: Avatar + Info */}
        <div className="flex items-start gap-5 min-w-0 flex-1">

          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-[72px] h-[72px] rounded-full bg-[#6F1D28] flex items-center justify-center text-2xl font-bold text-white shadow-md select-none">
              {initials}
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow" />
          </div>

          {/* Info column */}
          <div className="flex flex-col gap-2 min-w-0 py-0.5">

            {/* Name + opinion badge + status dot */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-[22px] font-bold text-gray-900 tracking-tight leading-none">
                {header?.name || "—"}
              </h1>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${opinionClass}`}>
                {opinion}
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                {currentStatus}
              </span>
            </div>

            {/* Lead ID */}
            {header?.enquiryNo && (
              <span className="flex items-center gap-1 text-[12px] text-gray-400 font-medium">
                <Hash className="w-3 h-3" />
                {header.enquiryNo}
              </span>
            )}

            {/* Contact row: Phone · Email · Location */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-[13px] text-gray-500 font-medium">
              {contact?.mobile && (
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {contact.mobile}
                </span>
              )}
              {contact?.email && (
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  <span className="truncate max-w-[220px]">{contact.email}</span>
                </span>
              )}
              {(contact?.locationStr || contact?.city) && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                  {contact?.locationStr || contact?.city}
                </span>
              )}
            </div>

            {/* Count badges */}
            {(docCount != null || noteCount != null) && (
              <div className="flex items-center gap-2 mt-0.5">
                {docCount != null && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 text-[12px] font-semibold text-gray-600 bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
                    <FileText className="w-3.5 h-3.5 text-gray-400" />
                    {docCount} {docCount === 1 ? "Document" : "Documents"}
                  </span>
                )}
                {noteCount != null && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-gray-200 text-[12px] font-semibold text-gray-600 bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition-colors">
                    <StickyNote className="w-3.5 h-3.5 text-gray-400" />
                    {noteCount} {noteCount === 1 ? "Note" : "Notes"}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Action buttons — flex row, right-aligned */}
        <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
          {/* Role-specific actions */}
          {actions}

          {/* Edit Lead — always present */}
          {onEdit && (
            <Button
              variant="outline"
              className="justify-center whitespace-nowrap bg-white border-slate-300 text-gray-800 hover:bg-slate-50 font-semibold rounded-lg shadow-sm px-4 py-2 text-sm"
              icon={<Edit size={14} />}
              onClick={onEdit}
            >
              Edit Lead
            </Button>
          )}

          {/* Delete Lead — admin only */}
          {onDelete && (
            <Button
              variant="outline"
              className="justify-center whitespace-nowrap bg-white border-red-300 text-red-600 hover:bg-red-50 font-semibold rounded-lg shadow-sm px-4 py-2 text-sm"
              loading={isDeleting}
              onClick={onDelete}
              icon={<Trash2 size={14} />}
            >
              Delete Lead
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}



