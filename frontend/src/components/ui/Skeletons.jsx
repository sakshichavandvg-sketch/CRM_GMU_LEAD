/**
 * Reusable Skeleton Components
 *
 * Tailwind-only loading placeholders.
 * Use these instead of "Loading..." text.
 */

// Base shimmer block
function SkeletonBlock({ className = "" }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
    />
  );
}

// ─── Table Skeleton ──────────────────────────────────────────

export function TableSkeleton({ rows = 6, columns = 5 }) {
  return (
    <div className="overflow-hidden rounded-[22px] border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-6 bg-gray-50/80 px-6 py-3.5">
        <SkeletonBlock className="h-4 w-4 rounded" />
        {Array.from({ length: columns }).map((_, i) => (
          <SkeletonBlock key={i} className="h-3 w-20" />
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="flex items-center gap-6 border-t border-gray-100 px-6 py-4"
        >
          <SkeletonBlock className="h-4 w-4 rounded" />
          {Array.from({ length: columns }).map((_, colIndex) => (
            <SkeletonBlock
              key={colIndex}
              className={`h-4 ${colIndex === 0 ? "w-28" : colIndex === 1 ? "w-32" : "w-20"}`}
            />
          ))}
        </div>
      ))}

      {/* Pagination skeleton */}
      <div className="flex items-center justify-between px-6 py-3.5 border-t border-gray-200 bg-gray-50/50">
        <SkeletonBlock className="h-3 w-40" />
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-8 w-20 rounded-lg" />
          <SkeletonBlock className="h-8 w-8 rounded-lg" />
          <SkeletonBlock className="h-8 w-8 rounded-lg" />
          <SkeletonBlock className="h-8 w-20 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ─── Card Skeleton ───────────────────────────────────────────

export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="animate-pulse space-y-3">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-7 w-16" />
        <SkeletonBlock className="h-3 w-28" />
      </div>
    </div>
  );
}

// ─── Stats Skeleton ──────────────────────────────────────────

export function StatsSkeleton({ count = 7 }) {
  return (
    <div className="grid gap-5 xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-2">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}

// ─── Dashboard Skeleton ──────────────────────────────────────

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="animate-pulse space-y-2">
        <SkeletonBlock className="h-8 w-48" />
        <SkeletonBlock className="h-4 w-72" />
      </div>

      {/* Stats */}
      <StatsSkeleton />

      {/* Charts placeholder */}
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-48 w-full" />
          </div>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="animate-pulse space-y-4">
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-48 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Form Skeleton ───────────────────────────────────────────

export function FormSkeleton({ fields = 4 }) {
  return (
    <div className="animate-pulse space-y-6">
      {Array.from({ length: fields }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-12 w-full rounded-xl" />
        </div>
      ))}

      {/* Submit button */}
      <SkeletonBlock className="h-11 w-full rounded-xl" />
    </div>
  );
}
