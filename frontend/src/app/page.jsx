import LoginPage from "@/features/auth/LoginPage";
import PublicRoute from "@/features/auth/components/PublicRoute";

export default function Home() {
  return (
    <PublicRoute>
      <LoginPage />
    </PublicRoute>
  );
}