export default function PriorityBadge({ priority }) {
  const styles = {
    High: "bg-red-50 text-red-600",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-green-50 text-green-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}