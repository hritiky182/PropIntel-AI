import { Bell, Menu, Moon, Sun, LogOut, Settings, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/store/authStore";
import { useUIStore } from "@/store/uiStore";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@/hooks/useFetch";
import { notificationService } from "@/services";
import { relative } from "@/utils/format";

export function Topbar() {
  const { user, logout } = useAuthStore();
  const { toggleSidebar, theme, toggleTheme } = useUIStore();
  const navigate = useNavigate();
  const { data: notifications } = useFetch(() => notificationService.list(), []);
  const unread = notifications?.filter((n) => !n.read).length || 0;

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/40 bg-background/70 px-4 backdrop-blur-md md:px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted">
          <Menu className="h-5 w-5 text-foreground/80" />
        </Button>
        <div className="flex items-center gap-2">
          <span className="hidden h-4 w-px bg-border/80 md:block" />
          <h2 className="text-sm font-medium tracking-wide text-muted-foreground bg-secondary/65 py-1 px-3 rounded-full border border-border/20 md:block">
            {user?.council || "Global Agency Network"}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="h-9 w-9 rounded-lg hover:bg-muted text-foreground/70"
        >
          {theme === "light" ? <Moon className="h-4.5 w-4.5" /> : <Sun className="h-4.5 w-4.5 text-amber-500" />}
        </Button>

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-lg hover:bg-muted text-foreground/70">
              <Bell className="h-4.5 w-4.5" />
              {unread > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-bold text-destructive-foreground ring-2 ring-background">
                  {unread}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-1 border-border/40 shadow-xl rounded-xl">
            <div className="flex items-center justify-between px-3 py-2">
              <DropdownMenuLabel className="p-0 text-sm font-semibold">Notifications</DropdownMenuLabel>
              {unread > 0 && (
                <Badge variant="destructive" className="text-[9px] font-bold px-1.5 py-0.5 rounded">
                  {unread} unread
                </Badge>
              )}
            </div>
            <DropdownMenuSeparator className="bg-border/40" />
            <div className="max-h-[300px] overflow-y-auto">
              {notifications && notifications.length > 0 ? (
                notifications.map((n) => (
                  <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-1 p-3 rounded-lg cursor-pointer focus:bg-muted">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-sm font-semibold tracking-tight text-foreground">{n.title}</span>
                      {!n.read && <Badge variant="secondary" className="text-[9px] bg-primary/10 text-primary border-none font-bold">New</Badge>}
                    </div>
                    <span className="text-xs text-muted-foreground leading-snug">{n.body}</span>
                    <span className="text-[9px] text-muted-foreground/60 font-medium">{relative(n.createdAt)}</span>
                  </DropdownMenuItem>
                ))
              ) : (
                <div className="p-4 text-center text-xs text-muted-foreground">No new notifications</div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2 rounded-xl border border-border/30 bg-background/40 hover:bg-muted transition-all duration-250">
              <Avatar className="h-7 w-7 rounded-lg border border-primary/20">
                <AvatarFallback className="bg-gradient-to-tr from-primary to-accent text-primary-foreground text-xs font-semibold rounded-lg">
                  {user?.name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase() || "AI"}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-xs font-semibold tracking-wide text-foreground/80 md:inline max-w-[90px] truncate">{user?.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 p-1 border-border/40 shadow-xl rounded-xl">
            <div className="px-3 py-2">
              <div className="text-xs font-bold text-foreground truncate">{user?.name}</div>
              <div className="text-[10px] text-muted-foreground truncate">{user?.email}</div>
            </div>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem onClick={() => navigate("/settings")} className="rounded-lg cursor-pointer focus:bg-muted">
              <Settings className="mr-2.5 h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium">Account Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border/40" />
            <DropdownMenuItem
              onClick={() => { logout(); navigate("/login"); }}
              className="text-destructive focus:text-destructive focus:bg-destructive/10 rounded-lg cursor-pointer"
            >
              <LogOut className="mr-2.5 h-4 w-4" />
              <span className="text-xs font-semibold">Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
