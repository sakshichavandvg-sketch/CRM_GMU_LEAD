import LeadDetailsClient from "./LeadDetailsClient";
import { breadcrumbs } from "@/config/breadcrumbs";

export default async function LeadDetailsPage({ params }) {
  const { leadId } = await params;

  return (
    <div className="flex flex-col min-h-0 h-full overflow-y-auto">
      <div className="flex-1 pb-10">
        <LeadDetailsClient leadId={leadId} />
      </div>
    </div>
  );
}
