import React from "react";
import DetailSectionCard from "../DetailSectionCard";
import ContactSection from "../sections/ContactSection";
import LeadInformationSection from "../sections/LeadInformationSection";
import AssignmentSection from "../sections/AssignmentSection";
import AdminActionsCard from "../sections/AdminActionsCard";
import { User, GraduationCap, ShieldAlert } from "lucide-react";

export default function LeadInfoTab({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">

      {/* Column 1: Contact Info */}
      <DetailSectionCard title="Contact Information" icon={<User className="w-4 h-4 text-[#8B1C31]" />}>
        <ContactSection data={data} />
      </DetailSectionCard>

      {/* Column 2: Academic Info */}
      <DetailSectionCard title="Academic Information" icon={<GraduationCap className="w-4 h-4 text-[#C18F42]" />}>
        <LeadInformationSection data={data} />
      </DetailSectionCard>

      {/* Column 3: Assignment & Admin */}
      <div className="flex flex-col gap-6">
        <DetailSectionCard
          title="Assignment Details"
          icon={<User className="w-4 h-4 text-purple-600" />}
          action={
            <button className="px-3 py-1 border border-gray-200 rounded-md text-[11px] font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
              View History
            </button>
          }
        >
          <AssignmentSection data={data} />
        </DetailSectionCard>

        <DetailSectionCard title="Administrative Information" icon={<ShieldAlert className="w-4 h-4 text-red-500" />}>
          <AdminActionsCard data={data} />
        </DetailSectionCard>
      </div>

    </div>
  );
}
