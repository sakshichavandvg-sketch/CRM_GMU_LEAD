"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function DashboardHeader({ breadcrumbs = [] }) {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-gray-500">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <React.Fragment key={index}>
            {isLast ? (
              <span className="font-semibold text-slate-900" aria-current="page">
                {item.label}
              </span>
            ) : (
              <>
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#6F1D28] hover:underline focus:outline-none focus:ring-2 focus:ring-[#6F1D28] focus:ring-offset-2 rounded"
                >
                  {item.label}
                </Link>
                <ChevronRight size={15} className="text-gray-400 mx-1" />
              </>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}