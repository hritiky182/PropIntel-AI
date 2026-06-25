import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { StatCard } from "@/components/common/StatCard";
import { useFetch } from "@/hooks/useFetch";
import { analyticsService, notificationService } from "@/services";
import { compactGbp, relative } from "@/utils/format";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Bar, BarChart, Legend, Line, LineChart, Cell, PieChart, Pie
} from "recharts";
import {
  Building2, TrendingUp, Users, Wrench, Sparkles, BrainCircuit,
  ArrowUpRight, ArrowDownRight, Calendar, Download, RefreshCw, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

export default function Dashboard() {
  const [refreshing, setRefreshing] = useState(false);
  const { data: kpis, loading } = useFetch(() => analyticsService.kpis(), [refreshing]);
  const { data: trend } = useFetch(() => analyticsService.portfolioTrend(), [refreshing]);
  const { data: notes } = useFetch(() => notificationService.list(), [refreshing]);

  const handleRefresh = async () => {
    setRefreshing(true);
    toast.info("Refreshing dashboard analytics...");
    await new Promise((r) => setTimeout(r, 600));
    setRefreshing(false);
    toast.success("Analytics updated successfully!");
  };

  // Additional mock data for new modules in dashboard
  const salesMetrics = [
    { name: "Sourced Leads", value: 120, rate: "+12%" },
    { name: "Active Pipeline", value: 45, rate: "+8%" },
    { name: "Under Contract", value: 18, rate: "+15%" },
    { name: "Closed Deals", value: 32, rate: "+22%" },
  ];

  const investmentMetrics = [
    { name: "Commercial", value: 4200000, yield: "8.4%" },
    { name: "Residential Multi-family", value: 5800000, yield: "6.2%" },
    { name: "Single Family", value: 2400000, yield: "5.8%" },
    { name: "Student Housing", value: 1600000, yield: "7.9%" },
  ];

  const COLORS = ["#6366f1", "#0ea5e9", "#10b981", "#f59e0b"];

  const constructionData = [
    { name: "Phase 1: Sourcing", progress: 95, budget: 50000, spent: 48000 },
    { name: "Phase 2: Refurb", progress: 65, budget: 120000, spent: 78000 },
    { name: "Phase 3: Handover", progress: 20, budget: 35000, spent: 5000 },
  ];

  const tenantMetrics = {
    occupancyRate: "94.8%",
    activeLeases: 142,
    avgLeaseTerm: "18.4 mos",
    pendingRequests: 8,
  };

  return (
    <div className="space-y-6">
      {/* Header section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Executive Command Center
          </h1>
          <p className="text-sm text-muted-foreground">
            Real-time cross-module intelligence and performance monitoring.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading || refreshing} className="rounded-xl h-9">
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
            Sync Data
          </Button>
          <Button size="sm" className="bg-primary hover:opacity-90 text-white rounded-xl h-9 shadow-md">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      {loading || !kpis ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-muted rounded-2xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Gross Portfolio Value"
            value={compactGbp(kpis.portfolioValue)}
            delta="+5.4% YoY Growth"
            icon={Building2}
            tone="primary"
          />
          <StatCard
            label="Active Acquisitions"
            value={kpis.activeAcquisitions}
            delta="+4 Sourced this month"
            icon={TrendingUp}
            tone="info"
          />
          <StatCard
            label="Average Net Yield"
            value={`${kpis.avgYield}%`}
            delta="+0.4 pts vs Market Average"
            icon={BrainCircuit}
            tone="success"
          />
          <StatCard
            label="Construction & Refurbs"
            value={kpis.refurbActive}
            delta="2 Projects finishing soon"
            icon={Wrench}
            tone="warning"
          />
        </div>
      )}

      {/* AI Market Insights Alert Row */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 via-accent/5 to-background shadow-md rounded-2xl">
        <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0 border border-primary/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 font-outfit">
                AI Portfolio Recommendation
                <Badge variant="secondary" className="bg-primary/15 text-primary border-none font-bold text-[9px] px-1.5 py-0.5">HIGH PRIORITY</Badge>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                AI Agent detected a <span className="font-semibold text-emerald-500">12% undervaluation</span> on 4 upcoming properties in Leeds. Yield forecast is projected to exceed <span className="font-semibold text-primary">7.8%</span> post-refurbishment.
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="rounded-xl shrink-0 border-primary/30 text-primary hover:bg-primary/5 text-xs font-semibold">
            Evaluate Opportunities
            <ArrowUpRight className="ml-1.5 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {/* Tabbed Dashboards */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="overview" className="rounded-lg text-xs font-semibold px-4">Executive Summary</TabsTrigger>
          <TabsTrigger value="sales" className="rounded-lg text-xs font-semibold px-4">Market & Sales</TabsTrigger>
          <TabsTrigger value="operations" className="rounded-lg text-xs font-semibold px-4">Operations & Tenants</TabsTrigger>
        </TabsList>

        {/* Tab 1: Overview */}
        <TabsContent value="overview" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Chart 1: Market Trends Area Chart */}
            <Card className="lg:col-span-2 border-border/40 shadow-sm rounded-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base font-bold font-outfit">Sourcing & Spend Projection</CardTitle>
                  <CardDescription className="text-xs">Visualizing completed acquisitions against ongoing pipelines.</CardDescription>
                </div>
                <Badge variant="outline" className="text-[10px] font-semibold text-muted-foreground border-border/60">12 Month Trend</Badge>
              </CardHeader>
              <CardContent className="h-80 pb-2">
                {trend && (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trend}>
                      <defs>
                        <linearGradient id="primaryGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.2} />
                          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11, paddingTop: 10 }} />
                      <Area type="monotone" dataKey="acquired" name="Acquisitions Done" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#primaryGrad)" />
                      <Area type="monotone" dataKey="pipeline" name="Sourcing Pipeline" stroke="var(--color-accent)" strokeWidth={2.5} fill="url(#accentGrad)" />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

            {/* Chart 2: Portfolio Yield Share */}
            <Card className="border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Portfolio Composition</CardTitle>
                <CardDescription className="text-xs">Asset class value breakdown & yields.</CardDescription>
              </CardHeader>
              <CardContent className="h-80 flex flex-col items-center justify-between pb-6">
                <div className="w-full h-[180px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentMetrics}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {investmentMetrics.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(val: number) => `£${(val / 1000000).toFixed(1)}M`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend list */}
                <div className="w-full space-y-2.5">
                  {investmentMetrics.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded" style={{ backgroundColor: COLORS[index] }} />
                        <span className="font-medium text-muted-foreground truncate max-w-[130px]">{item.name}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-foreground">£{(item.value / 1000000).toFixed(1)}M</span>
                        <Badge variant="outline" className="text-[9px] bg-secondary border-none font-bold py-0 px-1">{item.yield} net</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Activity Logs & Executive Alerts */}
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Real-Time Activity Feed</CardTitle>
              <CardDescription className="text-xs">Latest alerts from intelligence bots, legal partners, and site teams.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/40 p-0">
              {notes?.map((n) => (
                <div key={n.id} className="flex items-start justify-between gap-4 p-4.5 hover:bg-muted/20 transition-colors">
                  <div className="flex gap-3">
                    <div className={`mt-0.5 h-2 w-2 rounded-full shrink-0 ${
                      n.type === "success" ? "bg-emerald-500" :
                      n.type === "warning" ? "bg-amber-500" : "bg-primary"
                    }`} />
                    <div>
                      <p className="text-xs font-semibold text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{n.body}</p>
                    </div>
                  </div>
                  <span className="shrink-0 text-[10px] font-medium text-muted-foreground/70">{relative(n.createdAt)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Sales & Market */}
        <TabsContent value="sales" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {salesMetrics.map((metric) => (
              <Card key={metric.name} className="border-border/40 shadow-sm rounded-xl bg-card">
                <CardContent className="p-5 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">{metric.name}</p>
                    <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">{metric.value}</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs">
                    {metric.rate}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Lead Sourcing Channels</CardTitle>
                <CardDescription className="text-xs font-medium">Conversion volume per inbound pipeline channel.</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: "Direct Sourced", leads: 48, contracts: 12 },
                    { name: "Off-Market Portal", leads: 35, contracts: 10 },
                    { name: "Agent Network", leads: 22, contracts: 5 },
                    { name: "MLS Scrapers", leads: 15, contracts: 2 },
                  ]}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="leads" name="Leads Generated" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="contracts" name="Under Contract" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Yield Forecast Stability</CardTitle>
                <CardDescription className="text-xs">Yield predictions against actual realized portfolio yields.</CardDescription>
              </CardHeader>
              <CardContent className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={[
                    { month: "Jan", target: 6.0, actual: 5.9 },
                    { month: "Feb", target: 6.0, actual: 6.1 },
                    { month: "Mar", target: 6.2, actual: 6.2 },
                    { month: "Apr", target: 6.2, actual: 6.3 },
                    { month: "May", target: 6.5, actual: 6.4 },
                    { month: "Jun", target: 6.5, actual: 6.6 },
                  ]}>
                    <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10 }} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="target" name="AI Target Yield %" stroke="var(--color-primary)" strokeWidth={2.5} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="actual" name="Realized Yield %" stroke="var(--color-success)" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Tab 3: Operations & Tenants */}
        <TabsContent value="operations" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Construction Metrics */}
            <Card className="lg:col-span-2 border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Active Construction Phases</CardTitle>
                <CardDescription className="text-xs">Current milestones, budget and spending across asset refurbs.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {constructionData.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-foreground">{item.name}</span>
                      <span className="font-semibold text-primary">{item.progress}% Complete</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary rounded-full h-2" style={{ width: `${item.progress}%` }} />
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span>Spent: <strong>{compactGbp(item.spent)}</strong></span>
                      <span>Budget: <strong>{compactGbp(item.budget)}</strong></span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Tenant Health */}
            <Card className="border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Tenant Operations</CardTitle>
                <CardDescription className="text-xs">Operational tenancy stats.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3.5 rounded-xl bg-secondary/50 border border-border/10">
                  <div className="flex items-center gap-2">
                    <Users className="h-4.5 w-4.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">Occupancy Rate</span>
                  </div>
                  <span className="text-base font-bold font-outfit text-primary">{tenantMetrics.occupancyRate}</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl border border-border/40 text-center">
                    <p className="text-[10px] font-medium text-muted-foreground">Active Leases</p>
                    <p className="text-lg font-bold font-outfit text-foreground mt-1">{tenantMetrics.activeLeases}</p>
                  </div>
                  <div className="p-3 rounded-xl border border-border/40 text-center">
                    <p className="text-[10px] font-medium text-muted-foreground">Avg. Lease Term</p>
                    <p className="text-lg font-bold font-outfit text-foreground mt-1">{tenantMetrics.avgLeaseTerm}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3.5 rounded-xl border border-border/40">
                  <div className="flex items-center gap-2">
                    <Wrench className="h-4.5 w-4.5 text-amber-500" />
                    <span className="text-xs font-medium text-muted-foreground">Pending Maintenance</span>
                  </div>
                  <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded-full">
                    {tenantMetrics.pendingRequests} Orders
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
