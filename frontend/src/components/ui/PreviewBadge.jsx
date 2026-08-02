"use client";

import { env } from "@/config/env";
import { useEffect, useState } from "react";

export default function PreviewBadge() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !env.FRONTEND_ONLY) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-amber-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-semibold flex flex-col items-center pointer-events-none opacity-90">
      <span>Frontend Preview Mode</span>
      <span className="text-xs font-normal">Using Sample Data</span>
    </div>
  );
}
