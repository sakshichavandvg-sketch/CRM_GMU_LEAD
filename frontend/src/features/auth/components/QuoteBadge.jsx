import React from "react";

export default function QuoteBadge() {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-3
        px-6
        py-3
        rounded-2xl
        border
        border-[var(--gmu-gold)]
        bg-black/30
        backdrop-blur-sm
        w-fit
      "
    >
      <span className="text-[var(--gmu-gold)] text-lg">☆</span>
      <span className="text-white text-sm font-medium tracking-wide">
        Innovating Minds, Inspiring Tomorrow™
      </span>
    </div>
  );
}
