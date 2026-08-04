"use client";

import React from "react";

export default function CallReportsHeader() {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-vertical_gap mb-vertical_gap">
      <div className="flex items-center gap-6">
        <div className="w-12 h-12 bg-primary-container rounded-xl flex items-center justify-center">
          <span
            className="material-symbols-outlined text-white text-2xl"
            style={{ fontVariationSettings: '"FILL" 1' }}
          >
            school
          </span>
        </div>
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-background m-0 p-0">Call Reports</h1>
          <p className="font-body-lg text-secondary mt-1 m-0 p-0">
            Monitor telecaller activity and call performance across the university
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4"></div>
    </header>
  );
}
