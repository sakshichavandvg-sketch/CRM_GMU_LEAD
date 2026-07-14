"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="relative w-[420px]">

      <Search
        className="absolute left-4 top-3.5 text-gray-400"
        size={18}
      />

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          h-12
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          pl-11
          pr-4
          outline-none
          transition
          focus:border-[var(--primary)]
        "
      />

    </div>
  );
}