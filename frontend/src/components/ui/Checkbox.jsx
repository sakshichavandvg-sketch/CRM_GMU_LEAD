export default function Checkbox({ label, name, checked, onChange }) {
    return (
        <label htmlFor={name} className="flex items-center gap-2 cursor-pointer font-inter">
            <input
                id={name}
                type="checkbox"
                name={name}
                checked={checked}
                onChange={onChange}
                aria-checked={checked}
                className="h-4 w-4 rounded border-gray-300 accent-[var(--gold)]"
            />

            <span className="text-[14px] text-gray-600">{label}</span>
        </label>
    );
}