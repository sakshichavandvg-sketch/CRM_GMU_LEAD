"use client";

export default function DataTable({
  columns = [],
  data = [],
  selectedRows = [],
  setSelectedRows,
  rowKey = "id",
  renderRowActions,
  onRowClick,
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
      "
    >
      <div className="overflow-x-auto">
        <table className="min-w-[600px] w-full">
          {/* Header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-5">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Select all rows"
                />
              </th>

              {columns.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className="
                    px-3 py-3
                    sm:px-5 sm:py-4
                    lg:px-7 lg:py-5
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
                    className={`border-t border-gray-100 transition hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {/* Checkbox */}
                    <td className="px-3 sm:px-5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(id)}
                        onChange={() => toggleRow(row, index)}
                        aria-label={`Select row ${id}`}
                      />
                    </td>

                    {/* Cells */}
                    {columns.map((column) => {
                      const value = row[column.key];

                      return (
                        <td
                          key={column.key}
                          className="px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-6 text-[15px] text-slate-700"
                        >
                          {column.render
                            ? column.render(value, row)
                            : value}
                        </td>
                      );
                    })}

                    {/* Actions */}
                    <td className="px-3 py-3 sm:px-5 sm:py-4 lg:px-7 lg:py-6">
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