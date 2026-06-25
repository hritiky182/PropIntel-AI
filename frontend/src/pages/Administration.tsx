import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users, ShieldCheck, Activity, Terminal, CheckCircle2,
  AlertTriangle, Play, Cpu, HardDrive, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

export default function Administration() {
  const [users, setUsers] = useState([
    { id: "u1", name: "Priya Shah", email: "priya@aetheria.com", role: "Admin", status: "Active" },
    { id: "u2", name: "Tom Reid", email: "tom@aetheria.com", role: "Sourcing Agent", status: "Active" },
    { id: "u3", name: "Marcus Webb", email: "marcus.w@investor.co.uk", role: "Investor", status: "Active" },
    { id: "u4", name: "Lisa Gentry", email: "lisa@ecowarm.co.uk", role: "Contractor", status: "Active" },
  ]);

  const auditLogs = [
    { time: "2026-06-25 14:22:15", user: "Priya Shah", event: "Generated Leeds ROI Underwrite Model", ip: "192.168.1.42" },
    { time: "2026-06-25 14:10:02", user: "Tom Reid", event: "Signed off on 12 Oak Road physical survey", ip: "192.168.1.104" },
    { time: "2026-06-25 13:45:12", user: "Marcus Webb", event: "Signed digital NDA for 6-Bed HMO Leeds LS6", ip: "84.22.19.112" },
    { time: "2026-06-25 12:30:19", user: "System", event: "Synced Land Registry API feed", ip: "Localhost" },
  ];

  const handleRoleChange = (id: string, newRole: string) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, role: newRole } : u)));
    toast.success(`Role updated successfully for the user.`);
  };

  const handleRevoke = (name: string) => {
    toast.warning(`Access credentials revoked for ${name}.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            System Administration Console
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage corporate user roles, review security audit trails, and monitor microservices performance.
          </p>
        </div>
      </div>

      {/* Health Checks row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-4.5 flex items-center gap-3">
            <Cpu className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">API Cluster Load</p>
              <p className="text-base font-extrabold text-foreground font-outfit mt-0.5">14.2%</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px]">Optimal</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-4.5 flex items-center gap-3">
            <HardDrive className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">DB Synced Nodes</p>
              <p className="text-base font-extrabold text-foreground font-outfit mt-0.5">3 / 3 Active</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px]">Synced</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-4.5 flex items-center gap-3">
            <Activity className="h-5 w-5 text-primary shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Gateway Latency</p>
              <p className="text-base font-extrabold text-foreground font-outfit mt-0.5">24 ms</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px]">Excellent</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-4.5 flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-emerald-500 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Firewall Audits</p>
              <p className="text-base font-extrabold text-foreground font-outfit mt-0.5">0 Threat Blocks</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px]">Secure</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="users" className="rounded-lg text-xs font-semibold px-4">User Directory</TabsTrigger>
          <TabsTrigger value="logs" className="rounded-lg text-xs font-semibold px-4">System Activity Logs</TabsTrigger>
        </TabsList>

        {/* TAB 1: Users Directory & Roles */}
        <TabsContent value="users" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/45 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">User Details</th>
                      <th className="p-4">Assigned Corporate Role</th>
                      <th className="p-4">Active Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-foreground font-outfit">{u.name}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{u.email}</div>
                        </td>
                        <td className="p-4">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u.id, e.target.value)}
                            className="text-xs font-semibold text-foreground border border-border/60 rounded-xl bg-background px-3 py-1 focus:ring-1 focus:ring-ring focus:outline-none"
                          >
                            <option value="Admin">Admin</option>
                            <option value="Sourcing Agent">Sourcing Agent</option>
                            <option value="Investor">Investor</option>
                            <option value="Contractor">Contractor</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[10px]">
                            {u.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="h-8 text-[10px] text-destructive hover:bg-destructive/10 rounded-xl font-bold" onClick={() => handleRevoke(u.name)}>
                            Revoke Access
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 2: System Activity Logs */}
        <TabsContent value="logs" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/20">
              <div>
                <CardTitle className="text-base font-bold font-outfit">Audit Trails</CardTitle>
                <CardDescription className="text-xs">Immutable system events register.</CardDescription>
              </div>
              <Button size="sm" variant="outline" className="rounded-xl text-xs h-8 border-border/50" onClick={() => toast.success("Refreshed security trails")}>
                <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reload
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/45 bg-secondary/35 font-bold text-muted-foreground/80">
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Operator</th>
                      <th className="p-4">System Event Log</th>
                      <th className="p-4 text-right">Source IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30 font-mono text-[10px]">
                    {auditLogs.map((l, i) => (
                      <tr key={i} className="hover:bg-muted/25 transition-colors">
                        <td className="p-4 text-muted-foreground/80">{l.time}</td>
                        <td className="p-4 font-bold text-foreground">{l.user}</td>
                        <td className="p-4 text-muted-foreground font-semibold">{l.event}</td>
                        <td className="p-4 text-right text-muted-foreground/80">{l.ip}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
