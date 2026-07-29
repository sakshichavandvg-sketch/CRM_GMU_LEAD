import DashboardShell from "@/components/layout/DashboardShell";
import ProtectedRoute from "@/features/auth/components/ProtectedRoute";
import RoleGuard from "@/features/auth/components/RoleGuard";
import { ROLES } from "@/constants/roles";
import { VoiceProvider } from "@/features/telecaller/voice/context/VoiceProvider";

export default function TelecallerLayout({
  children,
}) {
  return (
    <ProtectedRoute>
      <RoleGuard allowedRoles={[ROLES.TELE_CALLER]}>
        <VoiceProvider>
          <DashboardShell>
            {children}
          </DashboardShell>
        </VoiceProvider>
      </RoleGuard>
    </ProtectedRoute>
  );
}