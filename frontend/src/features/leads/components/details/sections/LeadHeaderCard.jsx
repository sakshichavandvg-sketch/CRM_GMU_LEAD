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
    <section className="premium-card rounded-lg p-6 flex flex-col gap-6">
      <div className="flex justify-between items-start">
        <div className="flex gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center text-on-primary text-display-lg font-bold border-4 border-surface-container shadow-md">
              {initials}
            </div>
            <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#FFD700] border-2 border-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-4">
              <h2 className="font-headline-lg text-headline-lg text-on-surface">{leadName}</h2>
              <span className="px-4 py-1 bg-primary-fixed text-on-primary-fixed rounded-full text-label-sm font-bold">LEAD ID: {enquiryNo}</span>
              <span className="px-4 py-1 bg-[#E6F4EA] text-[#137333] rounded-full text-label-sm font-bold">{qualificationStatus}</span>
            </div>
            <p className="font-body-lg text-body-lg text-on-surface-variant">{course}</p>
            <div className="flex gap-6 mt-2 text-body-sm text-on-surface-variant">
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">mail</span> {email}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">call</span> {phone}</span>
              <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">location_on</span> {locationStr}</span>
            </div>
          </div>
        </div>
        {(actions || onDelete || onEdit) && (
        <div className="flex flex-wrap gap-2">
          {actions}
          {onDelete && (
            <button onClick={onDelete} className="border-2 border-error text-error px-8 py-4 rounded-full font-label-md hover:bg-error-container/20 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete
            </button>
          )}
          {onEdit && (
            <button onClick={onEdit} className="border border-outline px-8 py-4 rounded-full font-label-md hover:bg-surface-container-high transition-all flex items-center gap-2">
              More Actions
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
          )}
        </div>
      )}
      </div>
      <div className="grid grid-cols-4 gap-8 pt-6 border-t border-outline-variant">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>public</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Source</p>
            <p className="font-label-md text-on-surface">{source}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Created on</p>
            <p className="font-label-md text-on-surface">{createdAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>history</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Last Contact</p>
            <p className="font-label-md text-on-surface">{lastContactAt}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>account_circle</span>
          </div>
          <div>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-wider">Assigned to</p>
            <p className="font-label-md text-on-surface">{assignedTo}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
