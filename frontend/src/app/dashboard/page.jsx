import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardStats from "@/components/dashboard/DashboardStats";
import LeadTemperature from "@/components/dashboard/LeadTemperature";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import DashboardBottom from "@/components/dashboard/DashboardBottom";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />

      <DashboardStats />

      <LeadTemperature />

      <DashboardCharts />

      <DashboardBottom />
    </div>
  );
}