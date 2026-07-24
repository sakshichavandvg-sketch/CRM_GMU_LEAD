import PipelineChart from "./PipelineChart";
import SourceAnalytics from "./SourceAnalytics";

export default function DashboardCharts({ charts }) {
  return (
    <div className="grid gap-6 xl:grid-cols-3">

      <div className="xl:col-span-2">
        <PipelineChart />
      </div>

      <SourceAnalytics sourceAnalytics={charts?.sourceAnalytics} />

    </div>
  );
}