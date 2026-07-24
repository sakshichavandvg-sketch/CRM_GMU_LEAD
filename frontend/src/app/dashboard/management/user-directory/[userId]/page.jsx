import TelecallerDetailsClient from "./TelecallerDetailsClient";

export default async function TelecallerDetailsPage({ params }) {
  const { userId } = await params;

  return <TelecallerDetailsClient userId={userId} />;
}
