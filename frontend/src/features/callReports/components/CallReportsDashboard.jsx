"use client";

import React from "react";
import TelecallerPerformanceTable from "./TelecallerPerformanceTable";

export default function CallReportsDashboard() {
  return (
    <div className="flex flex-col gap-6 flex-1 min-h-0">
      <TelecallerPerformanceTable />
    </div>
  );
}
