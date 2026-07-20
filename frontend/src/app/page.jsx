import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import LoginForm from "@/features/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row h-screen overflow-hidden bg-[var(--background)]">
      {/* LEFT PANEL: Hero */}
      <div className="w-full h-[35vh] md:h-full md:w-[45%] lg:w-[52%] xl:w-[58%] 2xl:w-[60%] shrink-0">
        <LeftPanel />
      </div>

      {/* RIGHT PANEL: Login */}
      <div className="w-full flex-1 md:h-full md:w-[55%] lg:w-[48%] xl:w-[42%] 2xl:w-[40%] overflow-y-auto">
        <RightPanel>
          <LoginForm />
        </RightPanel>
      </div>
    </main>
  );
}