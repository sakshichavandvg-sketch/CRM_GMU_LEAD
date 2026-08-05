"use client";

import React from "react";

/**
 * TableCard — the standard card wrapper for all enterprise tables.
 *
 * Owns: border, radius, shadow, background, overflow clipping.
 * Does NOT own: table rows, pagination, data.
 *
 * @param {React.ReactNode} children  - DataTable + TablePagination + optional toolbar
 * @param {string}          className - Additional wrapper classes
 */
export default function TableCard({ children, className = "" }) {
  return (
    <div
      className={`
        flex flex-col
        bg-white
        rounded-[22px]
        border border-gray-200
        shadow-sm
        overflow-hidden
        ${className}
      `}
    >
      {children}
    </div>
  );
}
