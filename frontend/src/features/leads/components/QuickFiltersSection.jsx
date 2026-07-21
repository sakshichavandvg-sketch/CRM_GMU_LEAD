import React from "react";
import QuickFilterBar from "./QuickFilterBar";
import { LEAD_BUCKETS } from "../constants/leadConstants";

export default function QuickFiltersSection({ activeFilter, onSelect, counts }) {
  return (
    <QuickFilterBar 
      filters={LEAD_BUCKETS} 
      activeFilter={activeFilter} 
      onSelect={onSelect} 
      counts={counts}
    />
  );
}
