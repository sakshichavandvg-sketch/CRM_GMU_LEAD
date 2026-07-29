"use client";

import React from "react";
import DetailSectionCard from "@/features/leads/components/details/DetailSectionCard";
import ContactSection from "@/features/leads/components/details/sections/ContactSection";
import LeadInformationSection from "@/features/leads/components/details/sections/LeadInformationSection";
import AssignmentSection from "@/features/leads/components/details/sections/AssignmentSection";
import AdminActionsCard from "@/features/leads/components/details/sections/AdminActionsCard";
import { User, GraduationCap, ShieldAlert, History, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

/**
 * Telecaller Overview Tab — 95% identical to Admin LeadInfoTab.
 * Differences:
 *   - Assignment card has "View History" action button
 *   - Administrative card has "Upload Document" action button
 *   - No other changes (same 4 cards, same spacing, same sections)
 */
export default function TelecallerOverviewTab({ data, leadId }) {
  const router = useRouter();
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

      {/* Column 1: Contact Info — identical to Admin */}
      <DetailSectionCard
        title="Contact Information"
        icon={<User className="w-4 h-4 text-[#8B1C31]" />}
      >
        <ContactSection data={data} />
      </DetailSectionCard>

      {/* Column 2: Academic Info — identical to Admin */}
      <DetailSectionCard
        title="Academic Information"
        icon={<GraduationCap className="w-4 h-4 text-[#C18F42]" />}
      >
        <LeadInformationSection data={data} />
      </DetailSectionCard>

      {/* Column 3: Assignment + Administrative */}
      <div className="flex flex-col gap-6">
        {/* Assignment — identical to Admin but with View History button */}
        <DetailSectionCard
          title="Assignment Details"
          icon={<User className="w-4 h-4 text-purple-600" />}
          action={
            <button
              onClick={() => router.push(`/telecaller/calls?enquiryNo=${leadId}`)}
              className="flex items-center gap-1.5 px-3 py-1 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <History className="w-3 h-3" />
              View History
            </button>
          }
        >
          <AssignmentSection data={data} />
        </DetailSectionCard>

        {/* Administrative — identical to Admin but with Upload Document button */}
        <DetailSectionCard
          title="Administrative Information"
          icon={<ShieldAlert className="w-4 h-4 text-red-500" />}
          action={
            <button
              className="flex items-center gap-1.5 px-3 py-1 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
            >
              <Upload className="w-3 h-3" />
              Upload Document
            </button>
          }
        >
          <AdminActionsCard data={data} />
        </DetailSectionCard>
      </div>

    </div>
  );
}
