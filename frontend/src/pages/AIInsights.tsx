import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis,
  Line, LineChart, Legend
} from "recharts";
import {
  Sparkles, BrainCircuit, ShieldAlert, ArrowRight, Loader2,
  TrendingUp, Landmark, Calculator, FlameKindling, Info
} from "lucide-react";
import { toast } from "sonner";
import { gbp } from "@/utils/format";

export default function AIInsights() {
  // Simulator form states
  const [postcode, setPostcode] = useState("LS6 2AB");
  const [type, setType] = useState("Terrace");
  const [bedrooms, setBedrooms] = useState("3");
  const [epc, setEpc] = useState("D");
  const [refurb, setRefurb] = useState("medium");
  
  // Statuses
  const [loading, setLoading] = useState(false);
  const [loaderStep, setLoaderStep] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleForecast = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    // Simulate multi-stage AI modeling steps
    const steps = [
      "Querying Land Registry deeds...",
      "Scraping active MLS comparables in Leeds...",
      "Simulating 5,000 Monte Carlo yield iterations...",
      "Evaluating EPC renovation cost-to-benefit ratio...",
      "Compiling investment dossier..."
    ];

    for (const step of steps) {
      setLoaderStep(step);
      await new Promise((r) => setTimeout(r, 600));
    }

    setLoading(false);
    
    // Generate mock simulation results based on input
    const basePrice = type === "Detached" ? 420000 : type === "Semi-Detached" ? 280000 : 190000;
    const refurbCost = refurb === "high" ? 45000 : refurb === "medium" ? 22000 : 8000;
    const estimatedValue = basePrice + refurbCost * 1.4;
    const projectedRent = (estimatedValue * 0.065) / 12;

    setResult({
      appraisalPrice: estimatedValue,
      suggestedOffer: estimatedValue * 0.94,
      refurbCost,
      rentalYield: 6.8 + (epc === "A" || epc === "B" ? 0.8 : 0.2),
      monthlyRent: projectedRent,
      irr: 12.4,
      npv: estimatedValue * 0.18,
      appreciationCurve: [
        { year: "Year 1", price: estimatedValue, rent: projectedRent },
        { year: "Year 2", price: estimatedValue * 1.045, rent: projectedRent * 1.035 },
        { year: "Year 3", price: estimatedValue * 1.095, rent: projectedRent * 1.07 },
        { year: "Year 4", price: estimatedValue * 1.15, rent: projectedRent * 1.11 },
        { year: "Year 5", price: estimatedValue * 1.21, rent: projectedRent * 1.15 },
      ],
      comparables: [
        { address: "14 Oak Road", distance: "0.2 miles", price: basePrice * 0.97, yield: "6.4%", date: "March 2026" },
        { address: "28 Cedar Lane", distance: "0.5 miles", price: basePrice * 1.03, yield: "6.9%", date: "January 2026" },
      ],
      insights: [
        `Postcode ${postcode} has experienced a +5.2% population surge, signaling strong rental occupancy backstops.`,
        `Upgrading EPC rating from ${epc} to C will unlock cheaper green financing rates and boost rental yield by +0.4%.`,
        `Refurbishment intensity is optimized for HMO conversions, maximizing cash-on-cash returns.`
      ]
    });
    toast.success("AI Valuation model compiled successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            AI Price & Yield Predictor
          </h1>
          <p className="text-sm text-muted-foreground">
            Leverage neural network models to estimate market values, Cap Rates, and 5-year yields.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Sourcing Simulator Form */}
        <Card className="lg:col-span-4 border-border/40 shadow-sm rounded-2xl h-fit bg-card">
          <CardHeader>
            <CardTitle className="text-base font-bold font-outfit flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-primary" />
              Sourcing Parameters
            </CardTitle>
            <CardDescription className="text-xs">Provide asset details to trigger underwriters.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleForecast} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <Label htmlFor="postcode" className="text-xs font-semibold">Postcode Sector</Label>
                <Input id="postcode" value={postcode} onChange={(e) => setPostcode(e.target.value)} required placeholder="e.g. LS6 2AB" className="rounded-xl h-10 border-border/65 bg-background/40 font-semibold uppercase" />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="type" className="text-xs font-semibold">Property Type</Label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-border/65 bg-background focus:ring-1 focus:ring-ring h-10">
                  <option value="Flat">Flat / Apartment</option>
                  <option value="Terrace">Terraced House</option>
                  <option value="Semi-Detached">Semi-Detached House</option>
                  <option value="Detached">Detached Villa</option>
                  <option value="Bungalow">Bungalow</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="bedrooms" className="text-xs font-semibold">Bedrooms</Label>
                  <Input id="bedrooms" type="number" min={1} value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} required className="rounded-xl h-10 border-border/65 bg-background/40" />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="epc" className="text-xs font-semibold">Current EPC</Label>
                  <select id="epc" value={epc} onChange={(e) => setEpc(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-border/65 bg-background focus:ring-1 focus:ring-ring h-10">
                    {["A", "B", "C", "D", "E", "F", "G"].map((item) => (
                      <option key={item} value={item}>{item}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="refurb" className="text-xs font-semibold">Refurbishment Scope</Label>
                <select id="refurb" value={refurb} onChange={(e) => setRefurb(e.target.value)} className="w-full text-xs p-2.5 rounded-xl border border-border/65 bg-background focus:ring-1 focus:ring-ring h-10">
                  <option value="low">Light (Cosmetic paint/clean - £8k)</option>
                  <option value="medium">Medium (Kitchen, bathroom, heating - £22k)</option>
                  <option value="high">Heavy (Full structural, rewiring, EPC boost - £45k)</option>
                </select>
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 font-semibold text-white shadow-md shadow-primary/10 mt-2" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4.5 w-4.5" />
                    Forecast Investment ROI
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Right Column: Results Display */}
        <div className="lg:col-span-8 space-y-6">
          {/* Loading status screen */}
          {loading && (
            <Card className="border-border/40 shadow-sm rounded-2xl h-96 flex flex-col items-center justify-center bg-card">
              <CardContent className="text-center space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
                <p className="text-sm font-semibold text-foreground">{loaderStep}</p>
                <p className="text-xs text-muted-foreground">AI neural nets are matching Land Registry records against local rental demand pools...</p>
              </CardContent>
            </Card>
          )}

          {/* Initial State */}
          {!loading && !result && (
            <Card className="border-dashed border-border/60 shadow-sm rounded-2xl h-96 flex flex-col items-center justify-center text-center p-6 bg-card/40">
              <CardContent className="space-y-3.5">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                  <BrainCircuit className="h-7 w-7" />
                </div>
                <h3 className="text-base font-bold text-foreground font-outfit">AI Sourcing Simulator</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
                  Provide property characteristics in the sidebar to simulate pricing trends, rental yields, and financial return metrics over a 5-year horizon.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Forecast Reports */}
          {!loading && result && (
            <div className="space-y-6 animate-fade-in">
              {/* Financial Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Card className="border-border/40 shadow-sm rounded-xl">
                  <CardContent className="p-4 text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">AI Value Appraisal</p>
                    <p className="text-lg font-extrabold text-foreground font-outfit mt-1">{gbp(result.appraisalPrice)}</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 shadow-sm rounded-xl">
                  <CardContent className="p-4 text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Target Offer</p>
                    <p className="text-lg font-extrabold text-primary font-outfit mt-1">{gbp(result.suggestedOffer)}</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 shadow-sm rounded-xl">
                  <CardContent className="p-4 text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Net Rental Yield</p>
                    <p className="text-lg font-extrabold text-emerald-600 font-outfit mt-1">{result.rentalYield}%</p>
                  </CardContent>
                </Card>
                <Card className="border-border/40 shadow-sm rounded-xl">
                  <CardContent className="p-4 text-center">
                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Proj. Monthly Rent</p>
                    <p className="text-lg font-extrabold text-foreground font-outfit mt-1">{gbp(result.monthlyRent)}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Chart: 5-Year Capital appreciation & Rental Growth */}
              <Card className="border-border/40 shadow-sm rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-base font-bold font-outfit">5-Year Growth Projections</CardTitle>
                  <CardDescription className="text-xs">Estimated asset appreciation curves and compound rental escalations.</CardDescription>
                </CardHeader>
                <CardContent className="h-72 pb-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={result.appreciationCurve}>
                      <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="year" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="left" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--color-muted-foreground)" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                      <Legend wrapperStyle={{ fontSize: 11 }} />
                      <Line yAxisId="left" type="monotone" dataKey="price" name="Asset Value (£)" stroke="var(--color-primary)" strokeWidth={2.5} activeDot={{ r: 6 }} />
                      <Line yAxisId="right" type="monotone" dataKey="rent" name="Monthly Rent (£)" stroke="var(--color-success)" strokeWidth={2.5} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Bottom Panels: CMA & AI Narratives */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* CMA Table */}
                <Card className="border-border/40 shadow-sm rounded-2xl">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold font-outfit">Local Market Comparables (CMA)</CardTitle>
                    <CardDescription className="text-xs">Recent deeds filed in the immediate vicinity.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border/30 text-xs">
                      {result.comparables.map((c: any) => (
                        <div key={c.address} className="flex justify-between items-center p-3.5 hover:bg-muted/15">
                          <div>
                            <p className="font-bold text-foreground font-outfit">{c.address}</p>
                            <p className="text-[10px] text-muted-foreground mt-0.5">{c.distance} · Sold: {c.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-extrabold text-foreground">{gbp(c.price)}</p>
                            <p className="text-[10px] text-emerald-600 font-semibold">{c.yield} Net Yield</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* AI Insights Bullet List */}
                <Card className="border-border/40 shadow-sm rounded-2xl bg-gradient-to-tr from-primary/5 to-background">
                  <CardHeader>
                    <CardTitle className="text-sm font-bold font-outfit flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4 text-primary" />
                      AI Strategic Assessment
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3.5 text-xs text-muted-foreground leading-relaxed">
                    {result.insights.map((ins: string, i: number) => (
                      <div key={i} className="flex gap-2.5">
                        <div className="h-5 w-5 rounded-lg bg-primary/15 text-primary flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                          {i + 1}
                        </div>
                        <p>{ins}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
