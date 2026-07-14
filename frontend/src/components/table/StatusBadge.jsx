export default function StatusBadge({ status }) {
  const styles = {
    New: "bg-blue-50 text-blue-600",
    Contacted: "bg-green-50 text-green-600",
    Interested: "bg-amber-50 text-amber-700",
    Converted: "bg-purple-50 text-purple-600",
    Closed: "bg-gray-100 text-gray-600",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[status]}`}
    >
      {status}
    </span>
  );
}