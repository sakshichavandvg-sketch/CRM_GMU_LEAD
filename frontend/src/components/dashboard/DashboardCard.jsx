export default function DashboardCard({
  title,
  value,
  subtitle,
  type,
}) {
  const color =
    type === "success"
      ? "text-green-600"
      : type === "warning"
      ? "text-orange-500"
      : "text-gray-500";

  return (
    <div
      className="
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        hover:shadow-md
        transition
      "
    >
      <p className="text-xs uppercase tracking-wide text-gray-400">
        {title}
      </p>

      <h2 className="mt-4 text-4xl font-bold text-gray-900">
        {value}
      </h2>

      <p className={`mt-3 text-sm font-medium ${color}`}>
        {subtitle}
      </p>
    </div>
  );
}