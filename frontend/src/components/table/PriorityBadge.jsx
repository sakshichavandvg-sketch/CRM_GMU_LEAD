import Badge from "@/components/ui/Badge";

/**
 * PriorityBadge — thin wrapper around Badge for priority levels.
 */

const PRIORITY_MAP = {
  High: "danger",
  Medium: "warning",
  Low: "success",
};

export default function PriorityBadge({ priority, dot = true, className = "" }) {
  const variant = PRIORITY_MAP[priority] || "neutral";

  return (
    <Badge variant={variant} dot={dot} className={className}>
      {priority || "Unknown"}
    </Badge>
  );
}