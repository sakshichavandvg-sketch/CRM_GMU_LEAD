import DashboardShell from "@/components/layout/DashboardShell";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";

export default function DashboardLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      <DashboardShell>
        {children}
      </DashboardShell>
    </ProtectedRoute>
  );
}