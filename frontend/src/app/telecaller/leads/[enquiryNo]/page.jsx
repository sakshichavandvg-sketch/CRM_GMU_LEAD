import TelecallerLeadDetailsClient from "./TelecallerLeadDetailsClient";
import { telecallerBreadcrumbs } from "@/config/telecallerBreadcrumbs";

export default async function TelecallerLeadDetailsPage({ params }) {
  const { enquiryNo } = await params;

  return (
    <div className="flex flex-col min-h-0 h-full overflow-y-auto">
      <div className="flex-1 pb-10">
        <TelecallerLeadDetailsClient enquiryNo={enquiryNo} />
      </div>
    </div>
  );
}
