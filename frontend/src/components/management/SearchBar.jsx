"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="max-w-md">
      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full
            rounded-xl
            border
            border-gray-200
            bg-white
            py-3
            pl-11
            pr-4
            text-sm
            outline-none
            transition
            focus:border-[var(--primary)]
          "
        />

      </div>
    </div>
  );
}