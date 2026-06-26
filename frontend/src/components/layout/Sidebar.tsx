import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Store, Building2, Users, LineChart, Sparkles,
  Briefcase, Key, TrendingUp, ShieldCheck, FolderOpen, Database,
  Settings, Home, LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/authStore";

interface NavItem {
  to: string;
  label: string;
  icon: React.ComponentType<any>;
  adminOnly?: boolean;
}

const nav: NavItem[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/marketplace", label: "Marketplace", icon: Store },
  { to: "/properties", label: "Properties", icon: Building2 },
  { to: "/crm", label: "CRM", icon: Users },
  { to: "/analytics", label: "Analytics", icon: LineChart },
  { to: "/ai-insights", label: "AI Insights", icon: Sparkles },
  { to: "/projects", label: "Projects", icon: Briefcase },
  { to: "/tenants", label: "Tenants", icon: Key },
  { to: "/investments", label: "Investments", icon: TrendingUp },
  { to: "/off-market", label: "Off-Market Deals", icon: ShieldCheck },
  { to: "/documents", label: "Documents", icon: FolderOpen },
  { to: "/administration", label: "Administration", icon: Database, adminOnly: true },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ open }: { open: boolean }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { user, logout } = useAuthStore();

  return (
    <aside
      className={cn(
        "sticky top-0 hidden h-screen shrink-0 border-r bg-sidebar text-sidebar-foreground transition-all duration-300 md:flex md:flex-col shadow-lg z-20",
        open ? "w-64" : "w-20",
      )}
    >
      {/* Brand logo */}
      <div className="flex h-16 items-center gap-3 px-5 border-b border-sidebar-border/30 bg-sidebar/55 backdrop-blur-md">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-primary-foreground shadow-md shadow-primary/20 animate-pulse">
          <Building2 className="h-5 w-5 text-white" />
        </div>
        {open && (
          <div className="leading-tight select-none">
            <p className="text-sm font-bold tracking-wider bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent uppercase font-outfit">AETHERIA</p>
            <p className="text-[10px] tracking-widest text-sidebar-primary uppercase font-semibold">Real Estate AI</p>
          </div>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-sidebar-border">
        {nav
          .filter((item) => !item.adminOnly || user?.role === "super_admin")
          .map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-all duration-200 relative overflow-hidden",
                  active
                    ? "bg-gradient-to-r from-primary/20 to-accent/10 text-sidebar-primary border-l-2 border-primary"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                )}
              >
                <Icon className={cn(
                  "h-4.5 w-4.5 shrink-0 transition-transform duration-200 group-hover:scale-110",
                  active ? "text-sidebar-primary" : "text-sidebar-foreground/50 group-hover:text-sidebar-foreground"
                )} />
                {open && (
                  <span className="truncate tracking-wide font-medium">{item.label}</span>
                )}
                {/* Active indicator bar */}
                {active && !open && (
                  <div className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-l-full bg-primary" />
                )}
              </Link>
            );
          })}
      </nav>

      {/* User profile footer */}
      {user && (
        <div className="border-t border-sidebar-border/30 bg-sidebar/40 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/20 text-primary font-bold text-sm shrink-0 border border-primary/35">
              {user.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase()}
            </div>
            {open && (
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
                <p className="text-[10px] capitalize text-sidebar-foreground/50 truncate tracking-wide">
                  {user.role.replace("_", " ")}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </aside>
  );
}
