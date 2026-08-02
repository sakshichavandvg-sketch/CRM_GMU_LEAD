import PipelineChart from "./PipelineChart";
import SourceAnalytics from "./SourceAnalytics";

export default function DashboardCharts({ charts }) {
  return (
    <div className="grid gap-6 xl:grid-cols-10">

      <div className="xl:col-span-7">
        <PipelineChart pipeline={charts?.pipeline} />
      </div>

      <div className="xl:col-span-3">
        <SourceAnalytics sourceAnalytics={charts?.sourceAnalytics} />
      </div>

    </div>
  );
}