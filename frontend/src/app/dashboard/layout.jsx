import DashboardShell from "@/components/layout/DashboardShell";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import RoleGuard from "@/features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";

export default function DashboardLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[ROLES.ADMIN]}>
        <DashboardShell>
          {children}
        </DashboardShell>
      </RoleGuard>
    </ProtectedRoute>
  );
}