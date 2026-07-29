"use client";
import React, { useRef, useEffect } from "react";
import { useTableScroll } from "@/providers/TableScrollProvider";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DataTable({
  columns = [],
  data = [],
  selectedRows = [],
  setSelectedRows,
  rowKey = "id",
  renderRowActions,
  onRowClick,
  density = "standard",
  selectable = true,
  pagination, // { currentPage, pageSize, totalPages, totalItems, onPageChange, onPageSizeChange }
}) {
  const { setScrolled } = useTableScroll();
  const scrollRef = useRef(null);

  // Scroll restoration on page change
  useEffect(() => {
    if (scrollRef.current && pagination?.currentPage !== undefined) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pagination?.currentPage]);

  // Unique row id
  const getRowId = (row, index) => row[rowKey] ?? index;

  // Check if all rows are selected
  const allSelected =
    data.length > 0 &&
    data.every((row, index) =>
      selectedRows.includes(getRowId(row, index))
    );

  // Select/Deselect all rows
  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(
        data.map((row, index) => getRowId(row, index))
      );
    }
  };

  // Toggle one row
  const toggleRow = (row, index) => {
    const id = getRowId(row, index);

    if (selectedRows.includes(id)) {
      setSelectedRows(
        selectedRows.filter((item) => item !== id)
      );
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1) return null;

    const { currentPage, pageSize, totalPages, totalItems, onPageChange, onPageSizeChange } = pagination;
    const startItem = currentPage * pageSize + 1;
    const endItem = Math.min((currentPage + 1) * pageSize, totalItems);

    const getPageNumbers = () => {
      const pages = [];
      const maxVisible = 5;
      
      if (totalPages <= maxVisible) {
        for (let i = 0; i < totalPages; i++) pages.push(i);
      } else {
        if (currentPage <= 2) {
          pages.push(0, 1, 2, '...', totalPages - 1);
        } else if (currentPage >= totalPages - 3) {
          pages.push(0, '...', totalPages - 3, totalPages - 2, totalPages - 1);
        } else {
          pages.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
        }
      }
      return pages;
    };

    return (
      <div className="flex flex-col sm:flex-row items-center justify-between px-4 py-3 border-t border-gray-200 bg-gray-50/50 gap-4">
        <div className="flex items-center gap-4 text-sm text-gray-600 w-full sm:w-auto justify-between sm:justify-start">
          <span className="hidden sm:inline">
            Showing <span className="font-medium text-gray-900">{startItem}</span> to <span className="font-medium text-gray-900">{endItem}</span> of <span className="font-medium text-gray-900">{totalItems}</span> results
          </span>
          <span className="sm:hidden font-medium">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <div className="flex items-center gap-2 hidden md:flex">
            <span className="text-gray-500">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border-gray-300 rounded-md text-sm focus:ring-[#6F1D28] focus:border-[#6F1D28] text-gray-700 bg-white shadow-sm"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 0}
            className="p-1 sm:px-3 sm:py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-1 px-2">
            {getPageNumbers().map((page, idx) => (
              page === '...' ? (
                <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
              ) : (
                <button
                  key={page}
                  onClick={() => onPageChange(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors flex items-center justify-center ${
                    currentPage === page
                      ? "bg-[#6F1D28] text-white"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  {page + 1}
                </button>
              )
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            className="p-1 sm:px-3 sm:py-1.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 bg-white"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  };

  return (
    // Outer card: flex column, takes all available height from parent, clips corners
    <div
      className="
        flex flex-col flex-1 min-h-0
        overflow-hidden
        rounded-[22px]
        border border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* THE single scroll owner — overflow-auto here, children grow naturally */}
      <div 
        ref={scrollRef}
        className="overflow-auto flex-1 min-h-0"
        onScroll={(e) => {
          if (setScrolled) {
            setScrolled(e.target.scrollTop > 20);
          }
        }}
      >
        <table
          className="
            w-full
            min-w-[600px]
            border-separate
            border-spacing-0
          "
        >
          {/* Sticky header — sticks relative to the overflow-auto ancestor above */}
          <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm border-b border-gray-200">
            <tr>
              {selectable && (
                <th className="w-12 px-5 text-left align-middle">
                  <div className="flex items-center h-full pt-1">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all rows"
                      className="w-4 h-4 text-[#6F1D28] bg-white border-gray-300 rounded focus:ring-[#6F1D28] focus:ring-2 accent-[#6F1D28] cursor-pointer"
                    />
                  </div>
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`
                    text-left text-xs font-semibold uppercase tracking-wide text-slate-500
                    ${density === "compact"
                      ? "px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-3"
                      : "px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-5"
                    }
                  `}
                >
                  {column.label}
                </th>
              ))}

              <th className="w-20" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + 1}
                  className="py-6 text-center text-slate-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const id = getRowId(row, index);

                return (
                  <tr
                    key={id}
                    className={`border-t border-gray-100 transition ${onRowClick ? "cursor-pointer" : ""} ${selectedRows.includes(id) ? "bg-[#fdf8f8]" : "hover:bg-[#fdf8f8]"}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {/* Checkbox */}
                    {selectable && (
                      <td className="w-12 px-5 align-middle" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center h-full">
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(id)}
                            onChange={() => toggleRow(row, index)}
                            aria-label={`Select row ${id}`}
                            className="w-4 h-4 text-[#6F1D28] bg-white border-gray-300 rounded focus:ring-[#6F1D28] focus:ring-2 accent-[#6F1D28] cursor-pointer"
                          />
                        </div>
                      </td>
                    )}

                    {/* Cells */}
                    {columns.map((column) => {
                      const value = row[column.key];

                      return (
                        <td
                          key={column.key}
                          className={`text-[15px] text-slate-700 ${
                            density === "compact"
                              ? "px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                              : "px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-6"
                          }`}
                        >
                          {column.render ? column.render(value, row) : value}
                        </td>
                      );
                    })}

                    {/* Actions */}
                    <td
                      className={`${
                        density === "compact"
                          ? "px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                          : "px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-6"
                      }`}
                    >
                      {renderRowActions ? renderRowActions(row) : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Footer */}
      {renderPagination()}
    </div>
  );
}