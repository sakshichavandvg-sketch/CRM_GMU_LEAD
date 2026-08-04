"use client";

import React from "react";

export default function CallReportsPagination({
  currentPage,
  pageSize,
  totalPages,
  totalItems,
  onPageChange,
  onPageSizeChange,
}) {
  const startResult = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const endResult = Math.min((currentPage + 1) * pageSize, totalItems);

  // Generate page numbers
  const generatePageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(0, 1, 2, "...", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pages.push(0, "...", totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages - 1);
      }
    }
    return pages;
  };

  return (
    <div className="px-6 py-6 border-t border-outline-variant flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px]">list_alt</span>
          <p className="font-description m-0">
            Showing {startResult} to {endResult} of {totalItems} results
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 mr-4">
          <span className="font-description text-secondary">Rows per page:</span>
          <div className="relative">
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="appearance-none bg-background border-none rounded-lg font-label-md py-1.5 pl-3 pr-8 focus:ring-1 focus:ring-primary-container outline-none"
            >
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>
            <span className="material-symbols-outlined absolute right-2 top-1/2 -translate-y-1/2 text-secondary pointer-events-none text-[16px]">
              expand_more
            </span>
          </div>
        </div>
        <nav className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          
          {generatePageNumbers().map((pageNum, idx) => {
            if (pageNum === "...") {
              return (
                <span key={`ellipsis-${idx}`} className="px-1 text-secondary">
                  ...
                </span>
              );
            }
            const isActive = pageNum === currentPage;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-label-md transition-colors ${
                  isActive
                    ? "bg-primary-container text-white"
                    : "text-on-surface hover:bg-surface"
                }`}
              >
                {pageNum + 1}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage >= totalPages - 1}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-secondary hover:bg-surface transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </nav>
      </div>
    </div>
  );
}
