export default function Button({
  children,
  type = "button",
  variant = "primary",
  onClick,
  fullWidth = true,
  disabled = false,
  loading = false,
  loadingText = "Loading...",
  className = "",
}) {
  const variants = {
    primary: `
      bg-gradient-to-r
      from-[var(--gold)]
      to-[#E8BF67]
      text-[var(--primary)]
      hover:-translate-y-0.5
      hover:shadow-lg
    `,
    secondary: `
      border
      border-gray-300
      bg-white
      text-gray-700
      hover:bg-gray-50
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
    `,
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        rounded-xl
        px-4
        py-2.5
        text-[15px]
        font-semibold
        transition-all
        duration-200
        disabled:cursor-not-allowed
        disabled:opacity-50
        ${fullWidth ? "w-full" : ""}
        ${variants[variant]}
        ${className}
      `}
    >
      {loading ? loadingText : children}
    </button>
  );
}