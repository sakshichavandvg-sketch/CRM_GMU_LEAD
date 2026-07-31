export default function Checkbox({ label, name, checked, onChange, variant = "primary" }) {
    const accentClass = variant === "maroon" ? "accent-[var(--gmu-maroon)]" : "accent-[var(--gold)]";
    return (
        <label htmlFor={name} className="flex items-center gap-2 cursor-pointer font-inter">
            <input
                id={name}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                aria-checked={checked}
                className={`h-[18px] w-[18px] rounded-[4px] border-gray-300 ${accentClass}`}
            />

            <span className="text-[13px] font-medium text-[var(--gmu-text)]">{label}</span>
        </label>
    );
}