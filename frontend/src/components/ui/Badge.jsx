"use client";

import React from "react";

/**
 * Generic Badge component — the single visual primitive for all status/label badges.
 *
 * @param {string}  variant   - "success" | "warning" | "danger" | "info" | "neutral" | "purple"
 * @param {boolean} dot       - Show a leading dot indicator
 * @param {string}  className - Additional classes
 * @param {React.ReactNode} children
 */

const VARIANT_STYLES = {
  success: {
    badge: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    dot: "bg-emerald-500",
  },
  warning: {
    badge: "bg-amber-50 text-amber-700 border border-amber-200",
    dot: "bg-amber-500",
  },
  danger: {
    badge: "bg-red-50 text-red-700 border border-red-200",
    dot: "bg-red-500",
  },
  info: {
    badge: "bg-sky-50 text-sky-700 border border-sky-200",
    dot: "bg-sky-500",
  },
  neutral: {
    badge: "bg-gray-100 text-gray-600 border border-gray-200",
    dot: "bg-gray-400",
  },
  purple: {
    badge: "bg-purple-50 text-purple-700 border border-purple-200",
    dot: "bg-purple-500",
  },
  blue: {
    badge: "bg-blue-50 text-blue-700 border border-blue-200",
    dot: "bg-blue-500",
  },
  orange: {
    badge: "bg-orange-50 text-orange-700 border border-orange-200",
    dot: "bg-orange-500",
  },
  rose: {
    badge: "bg-rose-50 text-rose-700 border border-rose-200",
    dot: "bg-rose-500",
  },
};

const DEFAULT_STYLE = VARIANT_STYLES.neutral;

export default function Badge({
  variant = "neutral",
  dot = false,
  className = "",
  children,
}) {
  const styles = VARIANT_STYLES[variant] || DEFAULT_STYLE;

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1
        rounded-full
        text-[11px] font-semibold
        leading-none
        whitespace-nowrap
        ${styles.badge}
        ${className}
      `}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 ${styles.dot}`}
        />
      )}
      {children}
    </span>
  );
}
