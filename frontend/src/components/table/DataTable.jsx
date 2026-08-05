"use client";

import React, { useRef, useEffect } from "react";
import { Inbox } from "lucide-react";

/**
 * DataTable — the unified enterprise table primitive.
 *
 * Owns: thead, tbody, row selection, empty state, loading skeleton, mobile card renderer.
 * Does NOT own: card wrapper (use TableCard), pagination (use TablePagination).
 *
 * @param {Array}         columns        - [{ key, label, render?, headerClassName?, cellClassName? }]
 * @param {Array}         data           - Row objects
 * @param {Array}         selectedRows   - Selected row IDs
 * @param {function}      setSelectedRows
 * @param {string}        rowKey         - Property to use as row identifier (default: "id")
 * @param {function}      renderRowActions - (row) => ReactNode for action column
 * @param {function}      onRowClick     - (row) => void
 * @param {"standard"|"comfortable"} density
 * @param {boolean}       selectable     - Show checkboxes
 * @param {boolean}       loading        - Show skeleton rows
 * @param {number}        skeletonRows   - Number of skeleton rows to show (default: 6)
 * @param {ReactNode}     emptyState     - Custom empty state component
 * @param {function}      renderMobileCard - (row, index) => ReactNode for mobile view
 * @param {function}      onScroll       - scroll callback for scroll-aware headers
 * @param {string}        className      - Additional classes on the scroll container
 */
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
  loading = false,
  skeletonRows = 6,
  emptyState,
  renderMobileCard,
  onScroll,
  className = "",
}) {
  const scrollRef = useRef(null);

  // Unique row id
  const getRowId = (row, index) => row[rowKey] ?? index;

  // Check if all rows are selected
  const allSelected =
    data.length > 0 &&
    data.every((row, index) => selectedRows.includes(getRowId(row, index)));

  // Select/Deselect all rows
  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((row, index) => getRowId(row, index)));
    }
  };

  // Toggle one row
  const toggleRow = (row, index) => {
    const id = getRowId(row, index);
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((item) => item !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Density tokens
  const cellPadding =
    density === "comfortable"
      ? "px-6 py-4"
      : "px-6 py-4";

  const headerPadding =
    density === "comfortable"
      ? "px-6 py-4"
      : "px-6 py-4";

  // ── Skeleton Loading State ──
  if (loading) {
    return (
      <>
        {/* Desktop skeleton */}
        <div className={`hidden md:block overflow-x-auto ${className}`}>
          <table className="w-full min-w-[1000px] border-separate border-spacing-0">
            <thead className="bg-gray-50/80">
              <tr>
                {selectable && (
                  <th className="w-14 px-6 py-3.5">
                    <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                  </th>
                )}
                {columns.map((col) => (
                  <th key={col.key} className={headerPadding}>
                    <div className="h-3 w-20 rounded bg-gray-200 animate-pulse" />
                  </th>
                ))}
                {renderRowActions && <th className="w-14" />}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: skeletonRows }).map((_, rowIdx) => (
                <tr key={rowIdx} className="border-b border-gray-100">
                  {selectable && (
                    <td className="w-14 px-6 py-4">
                      <div className="w-4 h-4 rounded bg-gray-200 animate-pulse" />
                    </td>
                  )}
                  {columns.map((col, colIdx) => (
                    <td key={col.key} className={cellPadding}>
                      <div
                        className={`h-4 rounded bg-gray-200 animate-pulse ${
                          colIdx === 0 ? "w-32" : "w-24"
                        }`}
                      />
                    </td>
                  ))}
                  {renderRowActions && (
                    <td className="w-14 px-6 py-4">
                      <div className="w-6 h-6 rounded bg-gray-200 animate-pulse" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile skeleton */}
        {renderMobileCard && (
          <div className="md:hidden p-4 space-y-3">
            {Array.from({ length: skeletonRows }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="flex justify-between mb-3">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-5 w-16 rounded-full bg-gray-200" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-3 w-20 rounded bg-gray-200" />
                  <div className="h-3 w-24 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Fallback skeleton when no mobile renderer */}
        {!renderMobileCard && (
          <div className="md:hidden p-4 space-y-3">
            {Array.from({ length: skeletonRows }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse"
              >
                <div className="h-4 w-32 rounded bg-gray-200 mb-2" />
                <div className="h-3 w-24 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}
      </>
    );
  }

  // ── Empty State ──
  if (!loading && data.length === 0) {
    return (
      <div className="py-16 flex items-center justify-center">
        {emptyState || (
          <div className="flex flex-col items-center gap-3 text-center px-6">
            <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
              <Inbox className="text-gray-400" size={24} />
            </div>
            <p className="text-sm font-medium text-gray-800">No records found</p>
            <p className="text-xs text-gray-500">
              There is no data to display.
            </p>
          </div>
        )}
      </div>
    );
  }

  // ── Desktop Table ──
  return (
    <>
      <div
        ref={scrollRef}
        className={`hidden md:block overflow-x-auto flex-1 min-h-0 ${className}`}
        onScroll={(e) => {
          if (onScroll) onScroll(e);
        }}
      >
        <table className="w-full min-w-[1000px] border-separate border-spacing-0">
          {/* Sticky header */}
          <thead className="bg-gray-50/80 sticky top-0 z-20">
            <tr>
              {selectable && (
                <th className="w-[40px] px-2 text-center align-middle" style={{ paddingTop: "14px", paddingBottom: "14px" }}>
                  <div className="flex items-center justify-center">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all rows"
                      className="w-4 h-4 text-[#8B0D16] bg-white border-gray-300 rounded focus:ring-[#8B0D16] focus:ring-2 accent-[#8B0D16] cursor-pointer"
                    />
                  </div>
                </th>
              )}

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  style={{ width: column.width || "auto" }}
                  className={`
                    text-left text-[12px] font-[700] uppercase tracking-[0.08em] text-gray-900
                    whitespace-nowrap h-[52px]
                    ${headerPadding}
                    ${column.headerClassName || ""}
                  `}
                >
                  {column.label}
                </th>
              ))}

              {renderRowActions && (
                <th
                  className={`w-[64px] text-center ${headerPadding}`}
                />
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.map((row, index) => {
              const id = getRowId(row, index);
              const isSelected = selectedRows.includes(id);

              return (
                <tr
                  key={id}
                  className={`
                    border-b border-gray-100
                    transition-colors
                    ${onRowClick ? "cursor-pointer" : ""}
                    ${isSelected ? "bg-[#8B0D16]/[0.03]" : "hover:bg-gray-50/60"}
                  `}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {/* Checkbox */}
                  {selectable && (
                    <td
                      className="w-[40px] px-2 align-middle text-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(row, index)}
                          aria-label={`Select row ${id}`}
                          className="w-4 h-4 text-[#8B0D16] bg-white border-gray-300 rounded focus:ring-[#8B0D16] focus:ring-2 accent-[#8B0D16] cursor-pointer"
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
                        className={`
                          text-sm text-gray-700
                          ${cellPadding}
                          ${column.cellClassName || ""}
                        `}
                      >
                        {column.render ? column.render(value, row) : value}
                      </td>
                    );
                  })}

                  {/* Actions */}
                  {renderRowActions && (
                    <td
                      className={`w-[64px] text-center ${cellPadding}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {renderRowActions(row)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Mobile Card View ── */}
      {renderMobileCard ? (
        <div className="md:hidden flex-1 overflow-y-auto bg-gray-50/30 p-4 space-y-3">
          {data.map((row, index) => (
            <React.Fragment key={getRowId(row, index)}>
              {renderMobileCard(row, index)}
            </React.Fragment>
          ))}
        </div>
      ) : (
        /* Fallback: horizontally scrollable table on mobile */
        <div className="md:hidden overflow-x-auto">
          <table className="w-full min-w-[600px] border-separate border-spacing-0">
            <thead className="bg-gray-50/80">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className="text-left text-[11px] font-bold uppercase tracking-wider text-gray-500 whitespace-nowrap px-4 py-3"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, index) => {
                const id = getRowId(row, index);
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-100 transition-colors hover:bg-gray-50/60"
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <td key={column.key} className="text-sm text-gray-700 px-4 py-3">
                          {column.render ? column.render(value, row) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}