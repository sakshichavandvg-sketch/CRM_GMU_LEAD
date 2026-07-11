"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
    label,
    name,
    placeholder,
    value,
    onChange,
    onBlur,
    error,
    disabled = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="space-y-1.5">
            <label
                htmlFor={name}
                className="block text-[14px] font-medium text-gray-700 font-inter"
            >
                {label}
            </label>

            <div className="relative">
                <input
                    id={name}
                    name={name}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                     disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`
                        w-full
                        rounded-xl
                        border
                        px-4
                        py-3
                        pr-11
                        text-[16px]
                        placeholder:text-gray-400
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
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="
                        absolute
                        right-4
                        top-1/2
                        -translate-y-1/2
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        hover:text-gray-600
                        transition
                    "
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>

            <div className="min-h-[20px] text-[12px] text-red-500 font-inter">
                {error && <p>{error}</p>}
            </div>
        </div>
    );
}