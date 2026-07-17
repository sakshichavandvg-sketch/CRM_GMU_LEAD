export default function Textarea({
  label,
  name,
  value,
  onChange,
  rows = 4,
  placeholder,
  error,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          className="block text-[14px] font-medium text-gray-700 font-inter"
        >
          {label}
        </label>
      )}

      <textarea
        name={name}
        value={value}
        rows={rows}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          outline-none
          resize-none
          transition-all
          duration-200
          ${
            error
              ? "border-red-400"
              : "border-gray-300 focus:border-[var(--gold)] focus:ring-2 focus:ring-yellow-100"
          }
        `}
      />

      <div className="min-h-[20px] text-[12px] text-red-500">
        {error}
      </div>
    </div>
  );
}