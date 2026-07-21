"use client";

export default function DataTable({
  columns = [],
  data = [],
  selectedRows = [],
  setSelectedRows,
  rowKey = "id",
  renderRowActions,
  onRowClick,
  density = "standard",
}) {
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

  return (
    <div
      className="
        overflow-hidden
        rounded-[22px]
        border
        border-gray-200
        bg-white
        shadow-sm
        relative
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full relative">
          {/* Header */}
          <thead className="bg-gray-50 sticky top-0 z-20 shadow-sm border-b border-gray-200">
            <tr>
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

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={`
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-slate-500
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
                  colSpan={columns.length + 2}
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
                    className={`border-t border-gray-100 transition ${onRowClick ? 'cursor-pointer' : ''} ${selectedRows.includes(id) ? 'bg-[#fdf8f8]' : 'hover:bg-[#fdf8f8]'}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {/* Checkbox */}
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
                          {column.render
                            ? column.render(value, row)
                            : value}
                        </td>
                      );
                    })}

                    {/* Actions */}
                    <td className={`${
                      density === "compact"
                        ? "px-3 py-2 sm:px-4 sm:py-3 lg:px-5 lg:py-4"
                        : "px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-6"
                    }`}>
                      {renderRowActions
                        ? renderRowActions(row)
                        : null}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}