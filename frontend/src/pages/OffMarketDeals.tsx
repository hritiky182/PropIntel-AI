import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis
} from "recharts";
import {
  ShieldCheck, ShieldAlert, Sparkles, Lock, ArrowRight,
  Eye, FileSpreadsheet, Send, TrendingUp, HelpCircle
} from "lucide-react";
import { toast } from "sonner";
import { gbp } from "@/utils/format";

export default function OffMarketDeals() {
  const [signedNDAs, setSignedNDAs] = useState<string[]>([]);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [isNdaOpen, setIsNdaOpen] = useState(false);
  const [ndaSignature, setNdaSignature] = useState("");

  const offMarketProperties = [
    { id: "om1", title: "6-Bed HMO Portfolio", location: "Leeds LS6", price: 345000, yield: "8.9%", epc: "C", details: "Confidential HMO portfolio fully managed. Long term tenancy agreements in place. Projected gross rent £32,500/annum." },
    { id: "om2", title: "12-Unit Residential Block", location: "Manchester M15", price: 1850000, yield: "7.4%", epc: "B", details: "Institutional block near university. Direct title deed transfer. 100% occupancy history over last 4 years." },
    { id: "om3", title: "Grade-II Office Conversion Opportunity", location: "Birmingham B3", price: 1200000, yield: "9.2%", epc: "D", details: "PD rights approved for 18 luxury apartments. Freehold interest included." },
  ];

  const transactionData = [
    { month: "Jan", volume: 2400000 },
    { month: "Feb", volume: 3800000 },
    { month: "Mar", volume: 1900000 },
    { month: "Apr", volume: 4600000 },
    { month: "May", volume: 5100000 },
    { month: "Jun", volume: 6200000 },
  ];

  const handleOpenDeal = (deal: any) => {
    setSelectedDeal(deal);
    if (signedNDAs.includes(deal.id)) {
      // Already unlocked, no need to sign NDA
    } else {
      setIsNdaOpen(true);
    }
  };

  const handleSignNda = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ndaSignature.trim()) {
      return toast.error("Please type your full legal name to sign the agreement.");
    }
    setSignedNDAs([...signedNDAs, selectedDeal.id]);
    setIsNdaOpen(false);
    setNdaSignature("");
    toast.success(`NDA signed! Confidential dossier unlocked for ${selectedDeal.title}.`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Confidential Off-Market Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Snoop institutional property portfolios protected by Non-Disclosure Agreements (NDAs).
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-emerald-500/15 px-3.5 py-1.5 border border-emerald-500/30">
          <ShieldCheck className="h-4.5 w-4.5 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Verified Buyer Status Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column: Private listings list */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-bold text-foreground font-outfit tracking-wider uppercase mb-3">Institutional Inventory</h2>
          {offMarketProperties.map((deal) => {
            const isUnlocked = signedNDAs.includes(deal.id);
            return (
              <Card key={deal.id} className="border-border/40 hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden bg-card flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 bg-slate-950 flex items-center justify-center p-6 text-center text-xs text-slate-400 border-r border-border/20 shrink-0 relative">
                  {isUnlocked ? (
                    <div className="space-y-2 text-emerald-500">
                      <ShieldCheck className="h-9 w-9 mx-auto" />
                      <p className="font-bold">UNLOCKED</p>
                    </div>
                  ) : (
                    <div className="space-y-2 text-muted-foreground/80">
                      <Lock className="h-9 w-9 mx-auto text-primary animate-pulse" />
                      <p className="font-bold uppercase tracking-wider text-[10px]">NDA SECURED</p>
                    </div>
                  )}
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-sm text-foreground font-outfit">{deal.title}</h3>
                      <Badge className="bg-primary/10 text-primary border-none font-bold text-[9px] px-2 py-0.5">Confidential</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Location: <strong>{deal.location}</strong></p>
                  </div>

                  <p className="text-xs text-muted-foreground/90 line-clamp-2 leading-relaxed">
                    {isUnlocked ? deal.details : "This asset's tenant lease structure, coordinates, and exact financial valuations are protected under a confidentiality agreement. Sign the digital NDA to view details."}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <div className="flex items-center gap-4 text-xs font-semibold text-foreground">
                      <span>Price: <strong>{isUnlocked ? gbp(deal.price) : "£•••••••"}</strong></span>
                      <span className="text-emerald-600 dark:text-emerald-400">Yield: <strong>{deal.yield}</strong></span>
                    </div>
                    <Button
                      size="sm"
                      className="rounded-xl text-xs font-semibold bg-primary text-white"
                      onClick={() => handleOpenDeal(deal)}
                    >
                      {isUnlocked ? (
                        <>
                          <Eye className="mr-1.5 h-3.5 w-3.5" />
                          View Dossier
                        </>
                      ) : (
                        <>
                          <Lock className="mr-1.5 h-3.5 w-3.5" />
                          Unlock Details
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Right Column: Off-market transaction volume chart */}
        <div className="space-y-6">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit">Confidential Sourcing Volume</CardTitle>
              <CardDescription className="text-xs">Cumulative value of transactions completed off-market.</CardDescription>
            </CardHeader>
            <CardContent className="h-60 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionData}>
                  <defs>
                    <linearGradient id="volGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid stroke="var(--color-border)" strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--color-muted-foreground)" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(val: number) => `£${(val / 1000000).toFixed(1)}M`} />
                  <Tooltip contentStyle={{ background: "var(--color-card)", border: "1px solid var(--color-border)", borderRadius: 10 }} />
                  <Area type="monotone" dataKey="volume" name="Transaction Value" stroke="var(--color-primary)" strokeWidth={2.5} fill="url(#volGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Security details */}
          <Card className="border-border/40 shadow-sm rounded-2xl bg-gradient-to-tr from-primary/5 to-background border-primary/20">
            <CardContent className="p-5 flex gap-3 text-xs text-muted-foreground leading-relaxed">
              <ShieldAlert className="h-5.5 w-5.5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-foreground font-outfit mb-1">Due Diligence Compliance</h4>
                <p>
                  All off-market listings are backed by pre-vetted legal packs including verified title registers, water/environmental searches, and tenancy agreements to guarantee sourcing security.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* NDA SIGNATURE DIALOG */}
      <Dialog open={isNdaOpen} onOpenChange={setIsNdaOpen}>
        <DialogContent className="max-w-md border-border/40 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl flex items-center gap-2">
              <Lock className="h-5.5 w-5.5 text-primary" />
              Confidentiality Agreement
            </DialogTitle>
            <DialogDescription className="text-xs">
              Review and digitally sign the Non-Disclosure Agreement to unlock due diligence records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2 text-xs text-muted-foreground leading-relaxed">
            <div className="bg-secondary/40 p-4 rounded-xl border border-border/40 h-40 overflow-y-auto font-mono text-[10px]">
              <p className="font-bold text-foreground mb-2">NON-DISCLOSURE AGREEMENT (NDA)</p>
              <p className="mb-2">
                This Agreement is entered into by and between the Receiving Party (User) and the Disclosing Party (Aetheria Ltd) regarding the evaluation of potential property acquisitions.
              </p>
              <p className="mb-2">
                1. Confidential Information: All proprietary pricing, rents, lease tenancies, and coordinates provided shall be held in absolute confidentiality.
              </p>
              <p>
                2. Term: This agreement remains active for 24 months from signature date.
              </p>
            </div>

            <form onSubmit={handleSignNda} className="space-y-3 pt-2">
              <div className="space-y-1.5">
                <Label htmlFor="signature" className="text-xs font-semibold">Type Full Legal Name to Sign</Label>
                <Input
                  id="signature"
                  required
                  placeholder="Johnathan Doe"
                  className="rounded-xl font-semibold border-border/65 h-10 bg-background/40"
                  value={ndaSignature}
                  onChange={(e) => setNdaSignature(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2 justify-end pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsNdaOpen(false)} className="rounded-xl text-xs h-9">
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-white font-semibold text-xs rounded-xl h-9 px-4 shadow-sm">
                  Sign & Unlock Dossier
                </Button>
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>

      {/* FULL CONFIDENTIAL DOSSIER DIALOG */}
      {selectedDeal && signedNDAs.includes(selectedDeal.id) && (
        <Dialog open={selectedDeal !== null} onOpenChange={(open) => !open && setSelectedDeal(null)}>
          <DialogContent className="max-w-xl border-border/40 shadow-2xl rounded-2xl">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-6 w-6 text-emerald-500" />
                <DialogTitle className="font-outfit text-xl">{selectedDeal.title}</DialogTitle>
              </div>
              <DialogDescription className="text-xs">Confidential investment prospectus for verified institutional partners.</DialogDescription>
            </DialogHeader>
            <div className="space-y-5 pt-3 text-xs leading-relaxed">
              <div className="grid grid-cols-3 gap-3 text-center bg-secondary/40 p-3 rounded-xl">
                <div>
                  <p className="text-[10px] text-muted-foreground">Unconditional Price</p>
                  <p className="font-extrabold text-foreground text-sm mt-0.5">{gbp(selectedDeal.price)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">Projected Net Yield</p>
                  <p className="font-extrabold text-emerald-600 text-sm mt-0.5">{selectedDeal.yield}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground">EPC Rating</p>
                  <p className="font-extrabold text-foreground text-sm mt-0.5">{selectedDeal.epc}</p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-foreground font-outfit">Detailed Asset Dossier</h4>
                <p className="text-muted-foreground">{selectedDeal.details}</p>
              </div>

              <div className="space-y-2 border-t border-border/30 pt-3.5">
                <h4 className="font-bold text-foreground font-outfit">Due Diligence Downloads</h4>
                <div className="grid grid-cols-2 gap-2.5">
                  <Button variant="outline" size="sm" className="h-9 rounded-xl text-[11px] font-semibold border-border/60 justify-start" onClick={() => toast.success("Valuation underwrite Excel downloaded!")}>
                    <FileSpreadsheet className="mr-2 h-4 w-4 text-emerald-500" /> Valuation Underwrite.xlsx
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 rounded-xl text-[11px] font-semibold border-border/60 justify-start" onClick={() => toast.success("Title register PDF downloaded!")}>
                    <ShieldCheck className="mr-2 h-4 w-4 text-primary" /> Title Register.pdf
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
