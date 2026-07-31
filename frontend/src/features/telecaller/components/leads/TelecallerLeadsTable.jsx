"use client";
import React, { useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Phone, Eye, MoreVertical, MapPin } from "lucide-react";

export default function TelecallerLeadsTable({
  columns = [],
  data = [],
  rowKey = "enquiryNo",
  onRowClick,
  pagination, // { currentPage, pageSize, totalPages, totalItems, onPageChange, onPageSizeChange }
  onClearFilters,
  hasActiveFilters,
}) {
  const scrollRef = useRef(null);

  // Scroll restoration on page change
  useEffect(() => {
    if (scrollRef.current && pagination?.currentPage !== undefined) {
      scrollRef.current.scrollTop = 0;
    }
  }, [pagination?.currentPage]);

  const getRowId = (row, index) => row[rowKey] ?? index;

  const renderPagination = () => {
    if (!pagination) return null;

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
      <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 border-t border-gray-100 bg-white gap-4 rounded-b-[22px]">
        {/* LEFT */}
        <div className="flex items-center gap-4 text-sm text-gray-600 w-full md:w-auto justify-between md:justify-start">
          <span className="font-medium text-gray-700">
            Showing {startItem}–{endItem} of {totalItems}
          </span>
          
          <div className="flex items-center gap-2">
            <span className="text-gray-500 hidden sm:inline">Rows per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              className="border border-gray-200 rounded-lg text-sm focus:ring-[#8B1538] focus:border-[#8B1538] text-gray-700 bg-white shadow-sm py-1.5 px-2 outline-none font-medium"
            >
              {[10, 25, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} ▼
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* RIGHT */}
        {totalPages > 1 && (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 0}
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <div className="hidden sm:flex items-center gap-1 px-2">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 font-medium">...</span>
                ) : (
                  <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`w-8 h-8 rounded-lg text-sm font-bold transition-all flex items-center justify-center ${
                      currentPage === page
                        ? "bg-[#8B1538] text-white shadow-sm"
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
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-gray-900 disabled:opacity-40 disabled:hover:bg-white transition-colors flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 bg-white rounded-[22px] border border-gray-200 shadow-sm overflow-hidden">
      
      {/* DESKTOP TABLE VIEW */}
      <div 
        ref={scrollRef}
        className="hidden md:block overflow-auto flex-1 min-h-0 custom-scrollbar"
      >
        <table className="w-full min-w-[900px] border-separate border-spacing-0">
          <thead className="bg-gray-50 sticky top-0 z-20">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 px-6 py-4 border-b border-gray-200 whitespace-nowrap"
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="py-16 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500 gap-3">
                    <p className="font-medium text-gray-800">No leads found</p>
                    {hasActiveFilters ? (
                      <>
                        <p className="text-sm">Try adjusting or clearing your filters.</p>
                        <button 
                          onClick={onClearFilters}
                          className="mt-2 px-4 py-2 bg-[#8B1538]/10 text-[#8B1538] hover:bg-[#8B1538]/20 rounded-xl text-sm font-semibold transition-colors"
                        >
                          Clear Filters
                        </button>
                      </>
                    ) : (
                      <p className="text-sm">You have no leads assigned yet.</p>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              data.map((row, index) => {
                const id = getRowId(row, index);
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50 cursor-pointer group"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <td
                          key={column.key}
                          className="px-6 py-4 text-sm text-gray-700 align-middle border-b border-gray-100 last:border-0"
                        >
                          {column.render ? column.render(value, row) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARD VIEW */}
      <div className="md:hidden flex-1 overflow-y-auto bg-gray-50/50 p-4 space-y-4">
        {data.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-xl border border-gray-200 shadow-sm flex flex-col items-center justify-center gap-3">
            <p className="font-medium text-gray-800">No leads found</p>
            {hasActiveFilters ? (
              <>
                <p className="text-sm text-gray-500">Try adjusting or clearing your filters.</p>
                <button 
                  onClick={onClearFilters}
                  className="mt-2 px-4 py-2 bg-[#8B1538]/10 text-[#8B1538] hover:bg-[#8B1538]/20 rounded-xl text-sm font-semibold transition-colors"
                >
                  Clear Filters
                </button>
              </>
            ) : (
              <p className="text-sm text-gray-500">You have no leads assigned yet.</p>
            )}
          </div>
        ) : (
          data.map((row, index) => {
            const id = getRowId(row, index);
            return (
              <div 
                key={id}
                onClick={() => onRowClick && onRowClick(row)}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col gap-3"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1 overflow-hidden">
                    {columns.find(c => c.key === 'name')?.render(row.name, row)}
                  </div>
                  <div className="text-right flex flex-col items-end gap-2 shrink-0">
                    {columns.find(c => c.key === 'status')?.render(row.status, row)}
                    <span className="text-xs font-semibold text-gray-400">#{row.enquiryNo}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-50 mt-1">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Course</span>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {columns.find(c => c.key === 'course')?.render ? columns.find(c => c.key === 'course').render(row.course, row) : row.course}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Opinion</span>
                    <span className="text-sm truncate">
                      {columns.find(c => c.key === 'opinion')?.render ? columns.find(c => c.key === 'opinion').render(row.opinion, row) : row.opinion}
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* FOOTER */}
      {renderPagination()}
    </div>
  );
}
