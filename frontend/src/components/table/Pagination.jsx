"use client";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}) {
  const start = (currentPage - 1) * pageSize + 1;

  const end = Math.min(
    currentPage * pageSize,
    totalItems
  );

  return (
    <div className="mt-6 flex items-center justify-between border-t border-gray-200 pt-5">

      <p className="text-sm text-gray-500">
        Showing{" "}
        <span className="font-medium text-gray-800">
          {start}-{end}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-800">
          {totalItems}
        </span>{" "}
        records
      </p>

      <div className="flex items-center gap-2">

        <button
          disabled={currentPage === 1}
          onClick={() =>
            onPageChange(currentPage - 1)
          }
          className="
            rounded-lg
            border
            border-gray-200
            px-3
            py-2
            text-sm
            disabled:opacity-40
          "
        >
          Previous
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                onPageChange(index + 1)
              }
              className={`
                h-9
                w-9
                rounded-lg
                text-sm
                transition

                ${
                  currentPage === index + 1
                    ? "bg-[var(--primary)] text-white"
                    : "border border-gray-200 hover:bg-gray-50"
                }
              `}
            >
              {index + 1}
            </button>
          )
        )}

        <button
          disabled={currentPage === totalPages}
          onClick={() =>
            onPageChange(currentPage + 1)
          }
          className="
            rounded-lg
            border
            border-gray-200
            px-3
            py-2
            text-sm
            disabled:opacity-40
          "
        >
          Next
        </button>

      </div>

    </div>
  );
}