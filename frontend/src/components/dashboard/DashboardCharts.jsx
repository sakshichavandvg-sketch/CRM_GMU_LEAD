import PipelineChart from "./PipelineChart";
import SourceAnalytics from "./SourceAnalytics";

export default function DashboardCharts() {
  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">
        <PipelineChart />
      </div>

      <SourceAnalytics />

    </div>
  );
}