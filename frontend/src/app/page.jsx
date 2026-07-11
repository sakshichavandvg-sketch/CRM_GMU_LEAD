import LeftPanel from "@/components/layout/LeftPanel";
import RightPanel from "@/components/layout/RightPanel";
import LoginForm from "@/features/auth/LoginForm";

export default function Home() {
  return (
    <main className="flex flex-col lg:flex-row h-screen overflow-hidden bg-[var(--background)]">
      {/* LEFT PANEL: flex-1 takes remaining space, hidden on mobile/tablet */}
      <div className="hidden lg:flex flex-1">
        <LeftPanel />
      </div>

      {/* RIGHT PANEL: fixed width on desktop, full width on mobile/tablet */}
      <div className="w-full lg:w-[540px] xl:w-[580px] 2xl:w-[620px]">
        <RightPanel>
          <LoginForm />
        </RightPanel>
      </div>
    </main>
  );
}