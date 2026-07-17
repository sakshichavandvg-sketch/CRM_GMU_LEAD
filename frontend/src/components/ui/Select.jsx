export default function Select({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  error,
  required = false,
  disabled = false,
}) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={name}
          className="block text-[14px] font-medium text-gray-700 font-inter"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`
          w-full
          rounded-xl
          border
          px-4
          py-3
          text-[16px]
          outline-none
          transition-all
          duration-200
          font-inter
          ${
            error
              ? "border-red-400 focus:ring-2 focus:ring-red-200"
              : "border-gray-300 focus:border-[var(--gold)] focus:ring-2 focus:ring-yellow-100"
          }
        `}
      >
        <option value="">{placeholder}</option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div className="min-h-[20px] text-[12px] text-red-500 font-inter">
        {error && <p>{error}</p>}
      </div>
    </div>
  );
}