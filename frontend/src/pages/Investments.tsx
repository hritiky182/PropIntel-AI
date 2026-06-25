import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend
} from "recharts";
import {
  Calculator, TrendingUp, ShieldAlert, BadgePercent, Landmark, Info, Sparkles
} from "lucide-react";
import { gbp } from "@/utils/format";
import { toast } from "sonner";

export default function Investments() {
  // Financial Inputs
  const [purchasePrice, setPurchasePrice] = useState(250000);
  const [refurbBudget, setRefurbBudget] = useState(25000);
  const [stampDuty, setStampDuty] = useState(7500);
  const [ltv, setLtv] = useState(75);
  const [mortgageRate, setMortgageRate] = useState(4.5);
  const [projectedRent, setProjectedRent] = useState(1800);
  const [scenario, setScenario] = useState("base");

  // Calculations
  const metrics = useMemo(() => {
    // Modify rent and rates based on scenario
    let activeRent = projectedRent;
    let activeRate = mortgageRate;
    
    if (scenario === "optimistic") {
      activeRent = projectedRent * 1.10; // +10% rent
    } else if (scenario === "stress") {
      activeRate = mortgageRate + 2.0; // +2% interest rate stress test
    }

    const loanAmt = purchasePrice * (ltv / 100);
    const depositAmt = purchasePrice - loanAmt;
    const mortgagePayment = (loanAmt * (activeRate / 100)) / 12; // Interest-only mortgage mock
    const operatingExp = activeRent * 0.15; // 15% management & maintenance
    
    const totalCashRequired = depositAmt + refurbBudget + stampDuty + 2500; // 2500 legal fees
    const grossMonthlyCashflow = activeRent;
    const netMonthlyCashflow = activeRent - mortgagePayment - operatingExp;
    const netAnnualCashflow = netMonthlyCashflow * 12;

    const grossYield = (activeRent * 12 / purchasePrice) * 100;
    const netYield = (netAnnualCashflow / (purchasePrice + refurbBudget)) * 100;
    const cashOnCash = (netAnnualCashflow / totalCashRequired) * 100;

    // Chart Cashflow Accumulation over 5 years
    const cashflowCurve = Array.from({ length: 5 }).map((_, idx) => {
      const year = idx + 1;
      const baseYearly = netAnnualCashflow;
      
      // Calculate under different scenarios for comparison
      const baseVal = baseYearly * year;
      const optVal = (projectedRent * 1.10 * 12 - (loanAmt * (mortgageRate / 100)) - (projectedRent * 1.10 * 12 * 0.15)) * year;
      const stressVal = (projectedRent * 12 - (loanAmt * ((mortgageRate + 2) / 100)) - (projectedRent * 12 * 0.15)) * year;

      return {
        year: `Year ${year}`,
        "Base Case": Math.round(baseVal),
        "Optimistic (+10% Rent)": Math.round(optVal),
        "Stress Test (+2% Rate)": Math.round(stressVal),
      };
    });

    return {
      loanAmt,
      depositAmt,
      mortgagePayment,
      operatingExp,
      totalCashRequired,
      netMonthlyCashflow,
      grossYield,
      netYield,
      cashOnCash,
      cashflowCurve,
    };
  }, [purchasePrice, refurbBudget, stampDuty, ltv, mortgageRate, projectedRent, scenario]);

  const handleReset = () => {
    setPurchasePrice(250000);
    setRefurbBudget(25000);
    setStampDuty(7500);
    setLtv(75);
    setMortgageRate(4.5);
    setProjectedRent(1800);
    toast.success("Feasibility values reset!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Investment Feasibility Platform
          </h1>
          <p className="text-sm text-muted-foreground">
            Perform granular underwriting, run interest rate stress-tests, and model portfolio scenarios.
          </p>
        </div>
        <Button onClick={handleReset} variant="outline" size="sm" className="rounded-xl h-9">
          Reset Simulator
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Underwrite Form */}
        <Card className="lg:col-span-4 border-border/40 shadow-sm rounded-2xl h-fit bg-card">
          <CardHeader>
            <CardTitle className="text-base font-bold font-outfit flex items-center gap-2">
              <Calculator className="h-5 w-5 text-primary" />
              Underwrite Parameters
            </CardTitle>
            <CardDescription className="text-xs">Adjust inputs to calculate yields dynamically.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Purchase Price (£)</Label>
                  <Input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Refurb Budget (£)</Label>
                  <Input type="number" value={refurbBudget} onChange={(e) => setRefurbBudget(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Stamp Duty (£)</Label>
                  <Input type="number" value={stampDuty} onChange={(e) => setStampDuty(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Proj. Monthly Rent (£)</Label>
                  <Input type="number" value={projectedRent} onChange={(e) => setProjectedRent(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Mortgage LTV (%)</Label>
                  <Input type="number" max={90} min={10} value={ltv} onChange={(e) => setLtv(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold">Interest Rate (%)</Label>
                  <Input type="number" step={0.1} value={mortgageRate} onChange={(e) => setMortgageRate(Number(e.target.value))} className="rounded-xl h-10" />
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Feasibility Dashboard */}
        <div className="lg:col-span-8 space-y-6">
          {/* Scenario Tabs switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-muted/65 p-2 rounded-2xl border border-border/25">
            <span className="text-xs font-bold text-foreground font-outfit px-2">Scenario Analysis:</span>
            <div className="flex gap-2">
              <Button
                variant={scenario === "base" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setScenario("base")}
                className={`rounded-xl text-xs h-8 ${scenario === "base" ? "bg-primary/15 text-primary font-bold" : "text-muted-foreground"}`}
              >
                Base Case
              </Button>
              <Button
                variant={scenario === "optimistic" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setScenario("optimistic")}
                className={`rounded-xl text-xs h-8 ${scenario === "optimistic" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold" : "text-muted-foreground"}`}
              >
                Optimistic Case (+10% Rent)
              </Button>
              <Button
                variant={scenario === "stress" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setScenario("stress")}
                className={`rounded-xl text-xs h-8 ${scenario === "stress" ? "bg-red-500/15 text-red-600 dark:text-red-400 font-bold" : "text-muted-foreground"}`}
              >
                Stress Test Case (+2% Rate)
              </Button>
            </div>
          </div>

          {/* Core Return Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardContent className="p-4 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Cash Capital Required</p>
                <p className="text-lg font-extrabold text-foreground font-outfit mt-1">{gbp(metrics.totalCashRequired)}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardContent className="p-4 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Net Monthly Cashflow</p>
                <p className="text-lg font-extrabold text-primary font-outfit mt-1">{gbp(metrics.netMonthlyCashflow)}</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardContent className="p-4 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Net Annual Yield</p>
                <p className="text-lg font-extrabold text-emerald-600 font-outfit mt-1">{metrics.netYield.toFixed(1)}%</p>
              </CardContent>
            </Card>
            <Card className="border-border/40 shadow-sm rounded-xl">
              <CardContent className="p-4 text-center">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">Cash on Cash ROI</p>
                <p className="text-lg font-extrabold text-foreground font-outfit mt-1">{metrics.cashOnCash.toFixed(1)}%</p>
              </CardContent>
            </Card>
          </div>

          {/* Scenario Chart */}
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">5-Year Cumulative Cashflow Forecast</CardTitle>
              <CardDescription className="text-xs">Visualizing cash-on-cash capital growth curves across base, bullish and stress-tested economic paths.</CardDescription>
            </CardHeader>
            <CardContent className="h-72 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={metrics.cashflowCurve}>
                  <defs>
                    <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="optGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-destructive)" stopOpacity={0.15} />
                      <stop offset="100%" stopColor="var(--color-destructive)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Area type="monotone" dataKey="Base Case" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#baseGrad)" />
                  <Area type="monotone" dataKey="Optimistic (+10% Rent)" stroke="var(--color-success)" strokeWidth={2.5} fill="url(#optGrad)" />
                  <Area type="monotone" dataKey="Stress Test (+2% Rate)" stroke="var(--color-destructive)" strokeWidth={2} fill="url(#stressGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
