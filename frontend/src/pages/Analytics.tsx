import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Bar, BarChart, Legend, Line, LineChart, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from "recharts";
import {
  TrendingUp, Compass, Sparkles, Map, Database,
  ArrowUpRight, Landmark, RefreshCw, BarChart3, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

export default function Analytics() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    toast.info("Syncing market data feeds...");
    await new Promise((r) => setTimeout(r, 600));
    setRefreshing(false);
    toast.success("Market intelligence data updated!");
  };

  // Mock Market Data
  const regionalGrowth = [
    { city: "Leeds", cagr: "+7.8%", yield: "7.1%", demandScore: "94/100", trend: "Highly Bullish" },
    { city: "Manchester", cagr: "+6.9%", yield: "6.4%", demandScore: "89/100", trend: "Bullish" },
    { city: "Birmingham", cagr: "+5.8%", yield: "5.9%", demandScore: "81/100", trend: "Stable" },
    { city: "Liverpool", cagr: "+5.2%", yield: "6.8%", demandScore: "78/100", trend: "High Cashflow" },
    { city: "Newcastle", cagr: "+4.9%", yield: "7.4%", demandScore: "72/100", trend: "Undervalued" },
  ];

  const supplyDemandData = [
    { month: "Jan", supply: 120, demand: 180 },
    { month: "Feb", supply: 110, demand: 195 },
    { month: "Mar", supply: 115, demand: 210 },
    { month: "Apr", supply: 95, demand: 225 },
    { month: "May", supply: 85, demand: 240 },
    { month: "Jun", supply: 75, demand: 260 },
  ];

  const competitorData = [
    { subject: "Yields", Institutional: 72, PrivateRetail: 54 },
    { subject: "LTV leverage", Institutional: 55, PrivateRetail: 75 },
    { subject: "LTV cost", Institutional: 45, PrivateRetail: 80 },
    { subject: "Sourcing speed", Institutional: 90, PrivateRetail: 40 },
    { subject: "EPC upgrade", Institutional: 85, PrivateRetail: 30 },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Market Intelligence
          </h1>
          <p className="text-sm text-muted-foreground">
            Regional heatmaps, supply & demand imbalances, and predictive growth modeling.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing} className="rounded-xl h-9">
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh Feeds
        </Button>
      </div>

      {/* AI Market Prediction Alert */}
      <Card className="border-emerald-500/20 bg-gradient-to-r from-emerald-500/5 via-teal-500/5 to-background shadow-md rounded-2xl">
        <CardContent className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0 border border-emerald-500/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-foreground flex items-center gap-1.5 font-outfit">
                AI Market Growth Opportunity detected
                <Badge className="bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border-none font-bold text-[9px] px-1.5 py-0.5">UNDERVALUED</Badge>
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Supply contraction in <span className="font-semibold text-primary">Leeds City Center</span> has created a severe rental demand deficit. AI models predict a <span className="font-semibold text-emerald-600">+8.4% rental increase</span> over the next 12 months.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="heatmap" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="heatmap" className="rounded-lg text-xs font-semibold px-4">Sourcing Heatmaps</TabsTrigger>
          <TabsTrigger value="trends" className="rounded-lg text-xs font-semibold px-4">Supply & Demand</TabsTrigger>
          <TabsTrigger value="competitor" className="rounded-lg text-xs font-semibold px-4">Competitor Analysis</TabsTrigger>
        </TabsList>

        {/* TAB 1: Sourcing Heatmaps & Growth Predictions */}
        <TabsContent value="heatmap" className="space-y-6 outline-none">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Visual Heatmap Grid */}
            <Card className="lg:col-span-2 border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">Regional Yield Hotspots</CardTitle>
                <CardDescription className="text-xs">Yield and demand density mapped across UK metropolitan hubs.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3.5 pb-6">
                {regionalGrowth.map((reg, idx) => {
                  const gradients = [
                    "from-indigo-500/20 to-sky-400/15 border-indigo-500/30",
                    "from-sky-500/20 to-emerald-400/15 border-sky-500/30",
                    "from-emerald-500/20 to-teal-400/15 border-emerald-500/30",
                    "from-purple-500/20 to-indigo-400/15 border-purple-500/30",
                    "from-amber-500/20 to-orange-400/15 border-amber-500/30",
                  ];
                  return (
                    <div key={reg.city} className={`p-4 rounded-2xl border bg-gradient-to-tr ${gradients[idx % gradients.length]} space-y-3 shadow-sm hover:scale-102 transition-all cursor-pointer`}>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-foreground font-outfit">{reg.city}</span>
                        <Badge variant="outline" className="text-[9px] font-extrabold border-border/60 bg-background/55">{reg.trend}</Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2 text-center border-t border-border/20">
                        <div>
                          <p className="text-[9px] text-muted-foreground">CAGR</p>
                          <p className="text-sm font-extrabold text-primary font-outfit">{reg.cagr}</p>
                        </div>
                        <div>
                          <p className="text-[9px] text-muted-foreground">Yield</p>
                          <p className="text-sm font-extrabold text-foreground font-outfit">{reg.yield}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* CAGR Predictor Table */}
            <Card className="border-border/40 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-base font-bold font-outfit">AI Growth Indices</CardTitle>
                <CardDescription className="text-xs">Predictive metrics for next-gen portfolios.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border/30">
                  {regionalGrowth.map((reg) => (
                    <div key={reg.city} className="flex items-center justify-between p-3.5 hover:bg-muted/10 transition-colors text-xs">
                      <div>
                        <p className="font-bold text-foreground font-outfit">{reg.city}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">Demand: {reg.demandScore}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-extrabold text-primary">{reg.cagr} CAGR</p>
                        <p className="text-[10px] text-muted-foreground/80 font-medium">{reg.yield} Proj. Yield</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* TAB 2: Supply and Demand */}
        <TabsContent value="trends" className="space-y-6 outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Sourcing Deficit (Supply vs. Demand)</CardTitle>
              <CardDescription className="text-xs">Illustrating the growing gap between high rental demand and contracting market supply.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={supplyDemandData}>
                  <defs>
                    <linearGradient id="demandGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="supplyGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="demand" name="Rental Demand Volume" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#demandGrad)" />
                  <Area type="monotone" dataKey="supply" name="Listed Inventory Supply" stroke="var(--color-accent)" strokeWidth={2} fill="url(#supplyGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Competitor Analysis */}
        <TabsContent value="competitor" className="space-y-6 outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Sourcing Speed & Leverage vs Retail Buyers</CardTitle>
              <CardDescription className="text-xs">Radar benchmarking institutional cash-buyer networks against private retail buyers.</CardDescription>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center pb-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={competitorData}>
                  <PolarGrid stroke="var(--color-border)" />
                  <PolarAngleAxis dataKey="subject" stroke="var(--color-muted-foreground)" fontSize={10} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} fontSize={8} stroke="var(--color-muted-foreground)" />
                  <Radar name="Aetheria Institutional Net" dataKey="Institutional" stroke="var(--color-primary)" fill="var(--color-primary)" fillOpacity={0.3} />
                  <Radar name="Private Retail Network" dataKey="PrivateRetail" stroke="var(--color-accent)" fill="var(--color-accent)" fillOpacity={0.2} />
                  <Legend wrapperStyle={{ fontSize: 11, paddingTop: 15 }} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10 }} />
                </RadarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
