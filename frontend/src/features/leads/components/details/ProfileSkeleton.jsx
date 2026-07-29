"use client";

import { FormSkeleton } from "@/components/ui/Skeletons";

export default function ProfileSkeleton() {
  return (
    <div className="flex flex-col gap-6 mt-6 animate-pulse">
      {/* Hero Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4 items-center">
          <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
          <div className="flex flex-col gap-3">
            <div className="w-48 h-6 bg-gray-200 rounded-md"></div>
            <div className="w-64 h-4 bg-gray-200 rounded-md"></div>
            <div className="flex gap-2">
              <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
              <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end gap-4">
          <div className="w-32 h-10 bg-gray-200 rounded-xl"></div>
          <div className="flex gap-2">
            <div className="w-24 h-9 bg-gray-200 rounded-md"></div>
            <div className="w-24 h-9 bg-gray-200 rounded-md"></div>
          </div>
        </div>
      </div>

      {/* Stats Skeleton */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 h-32 bg-gray-200 rounded-2xl"></div>
        <div className="flex-[3] grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
          <div className="h-24 bg-gray-200 rounded-2xl"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px]">
        <div className="w-full h-12 bg-gray-100 rounded-xl mb-6"></div>
        <FormSkeleton />
      </div>
    </div>
  );
}
