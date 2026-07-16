"use client";

import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";
import TableAction from "./TableAction";

export default function DataTable({
  columns = [],
  data = [],
  selectedRows = [],
  setSelectedRows,
}) {
  // Helper functions
  const allSelected =
    data.length > 0 && selectedRows.length === data.length;

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((_, index) => index));
    }
  };

  const toggleRow = (index) => {
    if (selectedRows.includes(index)) {
      setSelectedRows(selectedRows.filter((item) => item !== index));
    } else {
      setSelectedRows([...selectedRows, index]);
    }
  };

  return (
    <div
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              {/* Step 3 — Header Checkbox */}
              <th className="w-12 px-5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                />
              </th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="
                    px-7
                    py-5
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
                  "
                >
                  {column.label}
                </th>
              ))}

              <th className="w-16" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + 2}
                  className="text-center py-6 text-slate-500"
                >
                  No records found
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={index}
                  className="border-t border-gray-100 hover:bg-gray-50 transition"
                >
                  {/* Step 4 — Row Checkbox */}
                  <td className="px-5">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(index)}
                      onChange={() => toggleRow(index)}
                    />
                  </td>

                  {columns.map((column) => {
                    const value = row[column.key];

                    if (column.type === "status") {
                      return (
                        <td key={column.key} className="px-7 py-6">
                          <StatusBadge status={value} />
                        </td>
                      );
                    }

                    if (column.type === "priority") {
                      return (
                        <td key={column.key} className="px-7 py-6">
                          <PriorityBadge priority={value} />
                        </td>
                      );
                    }

                    return (
                      <td
                        key={column.key}
                        className="px-7 py-6 text-[15px] text-slate-700"
                      >
                        {value}
                      </td>
                    );
                  })}

                  <td className="px-7 py-6">
                    <TableAction />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
