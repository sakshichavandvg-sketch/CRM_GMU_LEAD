import DashboardCard from "./DashboardCard";

export default function DashboardStats({ stats = [] }) {
  return (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
      {stats.map((item) => (
        <DashboardCard
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
}