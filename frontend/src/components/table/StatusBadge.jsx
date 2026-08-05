import Badge from "@/components/ui/Badge";

/**
 * StatusBadge — thin wrapper around Badge for lead/entity statuses.
 * Maps status strings to Badge variants with dot indicators.
 */

const STATUS_MAP = {
  // Lead statuses
  New: "info",
  Contacted: "success",
  Interested: "warning",
  Converted: "purple",
  Closed: "neutral",
  // Call outcomes
  Connected: "success",
  "No Answer": "warning",
  Busy: "orange",
  Failed: "danger",
  // User statuses
  Active: "success",
  Inactive: "danger",
  // Generic
  Online: "success",
  "In Call": "blue",
  Idle: "orange",
  Offline: "neutral",
};

export default function StatusBadge({ status, dot = true, className = "" }) {
  const variant = STATUS_MAP[status] || "neutral";

  return (
    <Badge variant={variant} dot={dot} className={className}>
      {status || "Unknown"}
    </Badge>
  );
}