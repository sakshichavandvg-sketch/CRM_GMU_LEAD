"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * TablePagination — standalone pagination bar for enterprise tables.
 *
 * Supports two modes:
 *   - "page"     → standard page-based (currentPage, totalPages, onPageChange)
 *   - "loadMore" → infinite scroll / load more (hasNextPage, fetchNextPage, isFetchingNextPage)
 *
 * @param {"page"|"loadMore"} mode
 *
 * Page mode props:
 * @param {number}   currentPage
 * @param {number}   pageSize
 * @param {number}   totalPages
 * @param {number}   totalItems
 * @param {function} onPageChange
 * @param {function} onPageSizeChange
 *
 * Load-more mode props:
 * @param {number}   totalItems
 * @param {number}   currentCount
 * @param {boolean}  hasNextPage
 * @param {function} fetchNextPage
 * @param {boolean}  isFetchingNextPage
 */
export default function TablePagination({
  mode = "page",

  // Page mode
  currentPage = 0,
  pageSize = 10,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  onPageSizeChange,

  // Load-more mode
  currentCount = 0,
  hasNextPage = false,
  fetchNextPage,
  isFetchingNextPage = false,
}) {
  // ── Load More Mode ──
  if (mode === "loadMore") {
    return (
      <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50/50">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>
            Showing <span className="font-medium text-gray-900">1</span> to{" "}
            <span className="font-medium text-gray-900">{currentCount}</span> of{" "}
            <span className="font-medium text-gray-900">{totalItems}</span> results
          </span>
        </div>

        <button
          onClick={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`
            flex items-center gap-2
            px-4 py-2
            border border-gray-200 rounded-lg
            text-sm font-medium
            transition-colors
            ${hasNextPage
              ? "text-gray-700 hover:bg-gray-100 bg-white cursor-pointer"
              : "text-gray-400 bg-gray-50 cursor-not-allowed opacity-50"
            }
          `}
        >
          {isFetchingNextPage ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin" />
              Loading…
            </>
          ) : hasNextPage ? (
            <>
              Load More
              <ChevronRight className="w-4 h-4" />
            </>
          ) : (
            "All loaded"
          )}
        </button>
      </div>
    );
  }

  // ── Page Mode ──
  if (totalPages <= 1) return null;

  const startItem = totalItems === 0 ? 0 : currentPage * pageSize + 1;
  const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 0; i < totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 2) {
        pages.push(0, 1, 2, "…", totalPages - 1);
      } else if (currentPage >= totalPages - 3) {
        pages.push(0, "…", totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pages.push(0, "…", currentPage - 1, currentPage, currentPage + 1, "…", totalPages - 1);
      }
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3.5 border-t border-gray-200 bg-gray-50/50 gap-4">
      {/* Left — result count + rows per page */}
      <div className="flex items-center gap-4 text-sm text-gray-600 w-full sm:w-auto justify-between sm:justify-start">
        <span className="hidden sm:inline">
          Showing{" "}
          <span className="font-medium text-gray-900">{startItem}</span> to{" "}
          <span className="font-medium text-gray-900">{endItem}</span> of{" "}
          <span className="font-medium text-gray-900">{totalItems}</span> results
        </span>
        <span className="sm:hidden font-medium">
          Page {currentPage + 1} of {totalPages}
        </span>

        {onPageSizeChange && (
          <div className="hidden md:flex items-center gap-2">
            <span className="text-gray-500">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-300 rounded-lg text-sm focus:ring-[#8B0D16] focus:border-[#8B0D16] text-gray-700 bg-white shadow-sm py-1 px-2 outline-none"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Right — page buttons */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 bg-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </button>

        <div className="hidden sm:flex items-center gap-1 px-2">
          {getPageNumbers().map((page, idx) =>
            page === "…" ? (
              <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 font-medium">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center ${
                  currentPage === page
                    ? "bg-[#8B0D16] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {page + 1}
              </button>
            )
          )}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages - 1}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 bg-white transition-colors"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
