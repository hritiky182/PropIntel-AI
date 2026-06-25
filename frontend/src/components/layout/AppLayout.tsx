import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";

export default function AppLayout() {
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);
  const sidebarOpen = useUIStore((s) => s.sidebarOpen);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="flex min-h-screen w-full bg-slate-50/60 dark:bg-slate-950/40 text-foreground">
      <Sidebar open={sidebarOpen} />
      <div className="flex min-w-0 flex-1 flex-col transition-all duration-300">
        <Topbar />
        <main className="flex-1 p-4 md:p-6 max-w-[1600px] w-full mx-auto animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
