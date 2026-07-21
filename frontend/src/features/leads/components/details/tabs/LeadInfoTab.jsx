import React from 'react';
import DetailSectionCard from "../DetailSectionCard";
import { INFO_SECTIONS } from "../../../constants/detailsConfig";

export default function LeadInfoTab({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-1">
      {INFO_SECTIONS.map((section) => {
        const SectionComponent = section.component;
        
        // AdminActionsCard manages its own card wrapper for distinct styling
        if (section.id === "admin") {
          return <SectionComponent key={section.id} data={data} />;
        }
        
        return (
          <DetailSectionCard key={section.id} title={section.title}>
            <SectionComponent data={data} />
          </DetailSectionCard>
        );
      })}
    </div>
  );
}
