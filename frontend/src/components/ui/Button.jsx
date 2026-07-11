export default function Button({
    children,
    type = "button",
    onClick,
    fullWidth = true,
    disabled = false,
    loading = false,
    className = "",
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`
                rounded-xl
                bg-gradient-to-r
                from-[var(--gold)]
                to-[#E8BF67]
                px-4
                py-2.5
                text-[15px]
                font-semibold
                text-[var(--primary)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-lg
                disabled:opacity-50
                disabled:cursor-not-allowed
                ${fullWidth ? "w-full" : ""}
                ${className}
            `}
        >
            {loading ? "Signing In..." : children}
        </button>
    );
}