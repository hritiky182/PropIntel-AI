import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFetch } from "@/hooks/useFetch";
import { refurbService } from "@/services";
import { compactGbp } from "@/utils/format";
import {
  Briefcase, Wrench, Hammer, Users, AlertTriangle, ShieldCheck,
  CheckCircle2, DollarSign, Calendar, Compass, ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";

export default function Projects() {
  const { data: projects, loading } = useFetch(() => refurbService.list(), []);
  
  // Risk Register Data
  const risks = [
    { id: "r1", project: "12 Oak Road", risk: "Material supply delays", level: "Medium", mitigation: "Pre-order insulation 4 weeks in advance" },
    { id: "r2", project: "14 Cedar Lane", risk: "Structural joist rot", level: "High", mitigation: "Engage structural surveyor for underwrites" },
    { id: "r3", project: "23 Elm Street", risk: "Subcontractor capacity", level: "Low", mitigation: "Utilize pre-vetted roster agreements" },
  ];

  // Contractors List
  const contractors = [
    { name: "Apex Structural Ltd", contact: "Dave Miller", trade: "Structural Eng.", rating: "4.8/5", activeJobs: 2 },
    { name: "EcoWarm Plumbing", contact: "Lisa Gentry", trade: "HVAC & Gas", rating: "4.9/5", activeJobs: 3 },
    { name: "Sparky Electrical", contact: "Niall Horan", trade: "Electrical", rating: "4.7/5", activeJobs: 1 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Construction & Refurbs
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor active property developments, coordinate contractors, and audit budget variances.
          </p>
        </div>
        <Button onClick={() => toast.info("New Refurbishment Project wizard is restricted.")} className="bg-primary hover:opacity-90 text-white rounded-xl h-10 shadow-sm self-start md:self-auto">
          <Hammer className="mr-2 h-4 w-4" /> Initialize Project
        </Button>
      </div>

      <Tabs defaultValue="projects" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="projects" className="rounded-lg text-xs font-semibold px-4">Active Projects</TabsTrigger>
          <TabsTrigger value="contractors" className="rounded-lg text-xs font-semibold px-4">Contractors & Budgets</TabsTrigger>
          <TabsTrigger value="risks" className="rounded-lg text-xs font-semibold px-4">Risk Register</TabsTrigger>
        </TabsList>

        {/* TAB 1: Active Projects */}
        <TabsContent value="projects" className="outline-none space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-pulse">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-60 bg-muted rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects?.map((proj) => (
                <Card key={proj.id} className="border-border/40 shadow-sm rounded-2xl bg-card overflow-hidden">
                  <CardHeader className="pb-3 border-b border-border/30 bg-secondary/15">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-bold font-outfit text-foreground">{proj.property}</CardTitle>
                        <CardDescription className="text-[10px] mt-0.5">Manager: <strong>{proj.manager}</strong></CardDescription>
                      </div>
                      <Badge className={`border-none text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                        proj.status === "Completed" ? "bg-emerald-500 text-white" :
                        proj.status === "In Progress" ? "bg-primary text-white" :
                        "bg-amber-500 text-white"
                      }`}>
                        {proj.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-5 space-y-4 text-xs">
                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-medium">
                        <span className="text-muted-foreground">Milestone Progress</span>
                        <span className="font-bold text-primary">{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-primary rounded-full h-2 transition-all duration-300" style={{ width: `${proj.progress}%` }} />
                      </div>
                    </div>

                    {/* Financial stats */}
                    <div className="grid grid-cols-2 gap-4 pt-2 text-center border-t border-border/30">
                      <div>
                        <p className="text-[10px] text-muted-foreground">Allocated Budget</p>
                        <p className="text-sm font-bold text-foreground font-outfit mt-0.5">{compactGbp(proj.budget)}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-muted-foreground">Spent to Date</p>
                        <p className="text-sm font-bold text-foreground font-outfit mt-0.5">{compactGbp(proj.spent)}</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="px-5 py-3 border-t border-border/20 flex justify-between items-center bg-muted/25 text-[10px] text-muted-foreground">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Start: {new Date(proj.start).toLocaleDateString("en-GB")}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary hover:bg-primary/10 rounded-lg px-2" onClick={() => toast.success("Gantt timeline generated")}>
                      View Gantt
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* TAB 2: Contractors & Budgets */}
        <TabsContent value="contractors" className="outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contractors List */}
            <Card className="lg:col-span-2 border-border/40 shadow-sm rounded-2xl bg-card">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Vetted Contractor Network</CardTitle>
                <CardDescription className="text-xs">Assigned contractors, ratings, and current active jobs.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/35 text-xs">
                  {contractors.map((c) => (
                    <div key={c.name} className="flex items-center justify-between p-4 hover:bg-muted/15 transition-colors">
                      <div>
                        <p className="font-bold text-foreground font-outfit">{c.name}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Contact: {c.contact} · {c.trade}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-[9px] font-bold border-border/60 bg-secondary px-2 py-0.5">{c.rating}</Badge>
                        <p className="text-[10px] text-muted-foreground mt-1">{c.activeJobs} active refurbs</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources / Budgets Summary */}
            <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Financial Summary</CardTitle>
                <CardDescription className="text-xs">Cumulative construction capital expenditure.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 text-xs">
                <div className="flex justify-between items-center p-3.5 rounded-xl bg-secondary/50 border border-border/10">
                  <span className="font-semibold text-muted-foreground">Cumulative Budget</span>
                  <span className="text-base font-bold font-outfit text-foreground">£395,000</span>
                </div>
                <div className="flex justify-between items-center p-3.5 rounded-xl border border-border/40">
                  <span className="font-semibold text-muted-foreground">Cumulative Spent</span>
                  <span className="text-base font-bold font-outfit text-foreground">£186,000</span>
                </div>
                <div className="flex justify-between items-center p-3.5 rounded-xl border border-border/40">
                  <span className="font-semibold text-muted-foreground">Sourcing Efficiency</span>
                  <span className="text-base font-bold font-outfit text-emerald-600">+14.2% Under Budget</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 3: Risk Register */}
        <TabsContent value="risks" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Project Risk Mitigation Logs</CardTitle>
              <CardDescription className="text-xs">Identified structural, supply, or regulatory risk registers.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">Linked Asset</th>
                      <th className="p-4">Risk Threat</th>
                      <th className="p-4">Risk Level</th>
                      <th className="p-4">Mitigation Protocol</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {risks.map((r) => (
                      <tr key={r.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-bold text-foreground font-outfit">{r.project}</td>
                        <td className="p-4 text-muted-foreground">{r.risk}</td>
                        <td className="p-4">
                          <Badge className={`border-none text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            r.level === "High" ? "bg-red-500/15 text-red-600 dark:text-red-400" :
                            r.level === "Medium" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                            "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {r.level}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground/90">{r.mitigation}</td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-lg border-border/50" onClick={() => toast.success("Risk review logged")}>
                            Mark Reviewed
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
      </Tabs>
    </div>
  );
}
