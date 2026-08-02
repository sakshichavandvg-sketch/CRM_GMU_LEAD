"use client";

import { useMemo, useState } from "react";
import { UserCircle2 } from "lucide-react";
import { env } from "@/config/env";

const SIZE_MAP = {
  sm: "w-8 h-8 text-xs",
  md: "w-10 h-10 text-sm",
  lg: "w-12 h-12 text-base",
  xl: "w-16 h-16 text-xl",
  "2xl": "w-24 h-24 text-2xl",
};

export default function Avatar({
  src,
  name,
  size = "md",
  className = "",
  colorClass = "bg-[#7A1F2B] text-white", // Default to brand color
  onClick,
  isLoading = false,
}) {
  const [hasError, setHasError] = useState(false);

  const getInitials = (nameStr) => {
    if (!nameStr) return null;
    return nameStr
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const resolvedSrc = useMemo(() => {
    if (!src) return null;

    const filesUrl = env.NEXT_PUBLIC_FILES_URL?.replace(/\/$/, "") ?? "";
    let resolved = src;

    if (
      src.startsWith("http://") ||
      src.startsWith("https://") ||
      src.startsWith("blob:") ||
      src.startsWith("data:")
    ) {
      resolved = src;
    } else if (src.startsWith("/files/")) {
      resolved = filesUrl ? `${filesUrl}${src}` : src;
    }

    console.log("Avatar raw src:", src);
    console.log("Files URL:", env.NEXT_PUBLIC_FILES_URL);
    console.log("Resolved avatar URL:", resolved);

    return resolved;
  }, [src]);

  const showImage = resolvedSrc && !hasError;
  const initials = getInitials(name);
  const sizeClasses = SIZE_MAP[size] || SIZE_MAP.md;

  return (
    <div
      onClick={onClick}
      className={`
        relative flex shrink-0 items-center justify-center overflow-hidden rounded-full font-[700]
        ${sizeClasses}
        ${!showImage ? colorClass : "bg-gray-100"}
        ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}
        ${isLoading ? "opacity-70 animate-pulse" : ""}
        ${className}
      `}
    >
      {showImage ? (
        <img
          src={resolvedSrc}
          alt={name || "Avatar"}
          className="h-full w-full object-cover"
          onError={() => setHasError(true)}
        />
      ) : initials ? (
        <span>{initials}</span>
      ) : (
        <UserCircle2 className="h-1/2 w-1/2 opacity-80" />
      )}
    </div>
  );
}
