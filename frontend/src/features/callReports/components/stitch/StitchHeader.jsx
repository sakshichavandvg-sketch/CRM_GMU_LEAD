import React from "react";

export default function StitchHeader({ title, subtitle, onBack }) {
  return (
    <div className="flex flex-col gap-4">
      {onBack && (
        <div className="flex items-center gap-2 cursor-pointer text-on-surface-variant hover:text-primary transition-standard" onClick={onBack}>
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          <span className="text-sm font-semibold">Back to Reports</span>
        </div>
      )}
      <header className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className="font-headline-xl text-headline-xl text-on-surface">{title}</h1>
          <p className="text-on-surface-variant font-subtitle text-subtitle">{subtitle}</p>
        </div>
      </header>
    </div>
  );
}
