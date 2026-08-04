import React from "react";
import { formatDisplayDate } from "@/utils/dateUtils";

export default function LeadHeaderCard({ viewModel, rawData, actions, onDelete, onEdit }) {
  if (!viewModel) return null;

  const leadName = viewModel.header?.name || "Unknown";
  const enquiryNo = rawData?.lead?.enquiryNo || rawData?.enquiryNo || "N/A";
  const qualificationStatus = viewModel.status?.currentStatus?.toUpperCase() || "NEW";
  const course = viewModel.header?.course || "N/A";
  const email = viewModel.contact?.email || "N/A";
  const phone = viewModel.contact?.mobile || "N/A";
  const locationStr = viewModel.contact?.locationStr || "N/A";
  const source = viewModel.lead?.source || "N/A";
  const createdAt = formatDisplayDate(rawData?.createdAt || rawData?.lead?.createdAt);
  const lastContactAt = formatDisplayDate(rawData?.lastContactAt || rawData?.lead?.lastContactAt) || "N/A";
  const assignedTo = viewModel.assignment?.telecaller || "Unassigned";

  // Initials
  const initials = leadName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

  return (
    <section className="premium-card rounded-[22px] p-[28px]" style={{ transform: 'translateY(0px)', transition: '0.3s' }}>
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto md:mx-0">
          <div className="w-full h-full rounded-[16px] bg-primary-container flex items-center justify-center text-on-primary text-display-lg font-bold border-4 border-surface-container-lowest shadow-md">
            {initials}
          </div>
          <div className="absolute -bottom-1 -right-1 bg-yellow-400 p-1 rounded-full border-2 border-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
          </div>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-headline-lg text-headline-lg">{leadName}</h2>
            <div className="flex items-center justify-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-error-container text-primary border border-outline-variant">LEAD ID: {enquiryNo}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-100 text-green-700 uppercase">{qualificationStatus}</span>
            </div>
          </div>
          <p className="text-on-surface-variant font-body-md">{course}</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 text-on-surface-variant text-label-md">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">mail</span>
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{phone}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[18px]">location_on</span>
              <span>{locationStr}</span>
            </div>
          </div>
        </div>

        {(actions || onDelete || onEdit) && (
          <div className="flex flex-row flex-wrap gap-2 w-full md:w-auto">
            {actions}
            {onDelete && (
              <button onClick={onDelete} className="flex-1 bg-white text-error border border-error font-label-lg px-4 py-3 rounded-[12px] flex items-center justify-center gap-2 hover:bg-error-container active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[20px]">delete</span>
                <span className="whitespace-nowrap">Delete</span>
              </button>
            )}
            {onEdit && (
              <button onClick={onEdit} className="flex-1 bg-white text-primary border border-primary font-label-lg px-4 py-3 rounded-[12px] flex items-center justify-center gap-2 hover:bg-surface-container-low active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                <span className="whitespace-nowrap">More Actions</span>
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8 pt-8 border-t border-outline-variant">
        <div className="space-y-1">
          <p className="text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">Source</p>
          <div className="flex items-center gap-2 font-body-md font-medium">
            <span className="material-symbols-outlined text-primary">language</span>
            {source}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">Created on</p>
          <div className="flex items-center gap-2 font-body-md font-medium">
            <span className="material-symbols-outlined text-primary">calendar_today</span>
            {createdAt}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">Last Contact</p>
          <div className="flex items-center gap-2 font-body-md font-medium">
            <span className="material-symbols-outlined text-primary">history</span>
            {lastContactAt}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-on-surface-variant text-[11px] uppercase tracking-wider font-bold">Assigned to</p>
          <div className="flex items-center gap-2 font-body-md font-medium">
            <span className="material-symbols-outlined text-primary">person</span>
            {assignedTo}
          </div>
        </div>
      </div>
    </section>
  );
}
