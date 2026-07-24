"use client";
import TelecallerDetailsView from "@/features/users/components/details/TelecallerDetailsView";
import useTelecallerDashboard from "@/features/users/hooks/useTelecallerDashboard";

export default function TelecallerDetailsClient({ userId }) {
  const { data: telecaller, isLoading, isError } = useTelecallerDashboard(userId);

  return (
    <TelecallerDetailsView
      userId={userId}
      telecaller={telecaller}
      isLoading={isLoading}
      isError={isError}
    />
  );
}
