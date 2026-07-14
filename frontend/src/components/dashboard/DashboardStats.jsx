import DashboardCard from "./DashboardCard";
import { dashboardStats } from "@/config/dashboardStats";

export default function DashboardStats() {
  return (
    <div className="grid gap-5 xl:grid-cols-7 lg:grid-cols-4 md:grid-cols-2">
      {dashboardStats.map((item) => (
        <DashboardCard
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
}