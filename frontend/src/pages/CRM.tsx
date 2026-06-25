import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Users, Mail, Phone, Calendar, Search, Plus, Sparkles, CheckCircle2,
  TrendingUp, BarChart3, AlertCircle, ArrowUpRight, MessageSquare, Clock
} from "lucide-react";
import { toast } from "sonner";

export default function CRM() {
  const [activeTab, setActiveTab] = useState("pipeline");
  const [search, setSearch] = useState("");
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [appointmentForm, setAppointmentForm] = useState({
    leadName: "",
    property: "",
    date: "",
    time: "",
    type: "Viewing",
  });

  // Mock Leads & Deals
  const [deals, setDeals] = useState([
    { id: "d1", name: "Sarah Connor", property: "12 Oak Road", value: 245000, stage: "Qualified", score: 92, phone: "+44 7911 123456", email: "sarah@cyberdyne.com" },
    { id: "d2", name: "John Miller", property: "14 Cedar Lane", value: 310000, stage: "Proposal", score: 85, phone: "+44 7911 234567", email: "john.m@gmail.com" },
    { id: "d3", name: "Emma Watson", property: "23 Elm Street", value: 185000, stage: "New", score: 76, phone: "+44 7911 345678", email: "emma@hogwarts.edu" },
    { id: "d4", name: "Bruce Wayne", property: "10 Birch Way", value: 495000, stage: "Under Contract", score: 98, phone: "+44 7911 456789", email: "bruce@waynecorp.com" },
    { id: "d5", name: "Clark Kent", property: "5 Maple Road", value: 135000, stage: "Closed Won", score: 94, phone: "+44 7911 567890", email: "clark@dailyplanet.com" },
  ]);

  const stages = ["New", "Qualified", "Proposal", "Under Contract", "Closed Won"];

  const campaigns = [
    { id: "c1", name: "Leeds High-Yield Portfolios", channel: "Email", sent: 1200, openRate: "64.2%", clickRate: "18.4%", replies: 28, status: "Active" },
    { id: "c2", name: "Off-Market Luxury London Deals", channel: "SMS", sent: 450, openRate: "92.1%", clickRate: "24.5%", replies: 42, status: "Active" },
    { id: "c3", name: "Manchester Student Housing Sourcing", channel: "Email", sent: 800, openRate: "58.0%", clickRate: "12.2%", replies: 11, status: "Paused" },
  ];

  const appointments = [
    { id: "a1", name: "Sarah Connor", property: "12 Oak Road", date: "2026-06-26", time: "10:00 AM", type: "Viewing" },
    { id: "a2", name: "John Miller", date: "2026-06-28", time: "2:30 PM", type: "Underwrite Consultation" },
  ];

  const handleAddAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Appointment scheduled successfully with ${appointmentForm.leadName}!`);
    setIsAppointmentOpen(false);
    setAppointmentForm({ leadName: "", property: "", date: "", time: "", type: "Viewing" });
  };

  const handleMoveStage = (id: string, newStage: string) => {
    setDeals(deals.map((d) => (d.id === id ? { ...d, stage: newStage } : d)));
    toast.success(`Deal stage updated to ${newStage}`);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground">
            CRM & Sales Automation
          </h1>
          <p className="text-sm text-muted-foreground">
            Accelerate deal-making, track investor outreach campaigns, and log communications.
          </p>
        </div>
        <Button onClick={() => setIsAppointmentOpen(true)} className="bg-primary hover:opacity-90 text-white rounded-xl h-10 shadow-sm self-start md:self-auto">
          <Calendar className="mr-2 h-4 w-4" /> Schedule Event
        </Button>
      </div>

      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Total Pipeline Value</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">£1,370,000</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">+18% MoM</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Avg. Lead Score</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">89.4 / 100</p>
            </div>
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-none font-bold text-xs">High Intent</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Outreach Conversions</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">81 Responses</p>
            </div>
            <Badge className="bg-sky-500/10 text-sky-600 dark:text-sky-400 border-none font-bold text-xs">14.8% CTR</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="pipeline" className="rounded-lg text-xs font-semibold px-4">Sales Pipeline</TabsTrigger>
          <TabsTrigger value="leads" className="rounded-lg text-xs font-semibold px-4">Leads & Scoring</TabsTrigger>
          <TabsTrigger value="campaigns" className="rounded-lg text-xs font-semibold px-4">Outreach Campaigns</TabsTrigger>
        </TabsList>

        {/* TAB 1: Sales Pipeline (Kanban-style boards) */}
        <TabsContent value="pipeline" className="outline-none">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {stages.map((stage) => {
              const stageDeals = deals.filter((d) => d.stage === stage);
              return (
                <div key={stage} className="space-y-3 min-w-[200px]">
                  <div className="flex items-center justify-between px-2">
                    <span className="text-xs font-bold text-foreground font-outfit tracking-wide uppercase">{stage}</span>
                    <Badge variant="outline" className="text-[10px] font-bold text-muted-foreground border-border/60 bg-secondary/50">
                      {stageDeals.length}
                    </Badge>
                  </div>
                  
                  <div className="bg-muted/30 p-2.5 rounded-2xl min-h-[350px] border border-border/20 space-y-3.5">
                    {stageDeals.map((deal) => (
                      <Card key={deal.id} className="border-border/40 shadow-sm rounded-xl bg-card hover:border-primary/40 transition-all cursor-pointer group">
                        <CardContent className="p-3.5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-foreground group-hover:text-primary transition-colors font-outfit">{deal.name}</span>
                            <Badge className={`border-none text-[9px] font-bold px-1 rounded ${
                              deal.score > 90 ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                              deal.score > 80 ? "bg-primary/15 text-primary" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                            }`}>
                              {deal.score}
                            </Badge>
                          </div>
                          <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {deal.property}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-border/35">
                            <span className="text-xs font-extrabold text-foreground">£{(deal.value / 1000).toFixed(0)}k</span>
                            <select
                              value={deal.stage}
                              onChange={(e) => handleMoveStage(deal.id, e.target.value)}
                              className="text-[9px] font-semibold text-muted-foreground border border-border/60 rounded bg-background p-0.5 focus:outline-none"
                            >
                              {stages.map((st) => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {stageDeals.length === 0 && (
                      <div className="text-center py-12 text-[10px] text-muted-foreground border border-dashed border-border/40 rounded-xl">
                        No deals here
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </TabsContent>

        {/* TAB 2: Leads & Scoring */}
        <TabsContent value="leads" className="outline-none space-y-4">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader className="p-4 pb-2">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search lead database by name, email, phone..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9 rounded-xl border-border/50 bg-background/50 h-10"
                />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">Customer Name</th>
                      <th className="p-4">Linked Property</th>
                      <th className="p-4">AI Score</th>
                      <th className="p-4">Contact Info</th>
                      <th className="p-4">Probability</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {deals
                      .filter((d) => d.name.toLowerCase().includes(search.toLowerCase()))
                      .map((d) => (
                        <tr key={d.id} className="hover:bg-muted/20 transition-colors">
                          <td className="p-4 font-bold text-foreground font-outfit">{d.name}</td>
                          <td className="p-4 text-muted-foreground">{d.property}</td>
                          <td className="p-4">
                            <Badge className="bg-primary/10 text-primary border-none font-bold text-[10px]">
                              {d.score} / 100
                            </Badge>
                          </td>
                          <td className="p-4 space-y-0.5 text-[10px]">
                            <div className="flex items-center gap-1.5 text-muted-foreground"><Mail className="h-3 w-3" /> {d.email}</div>
                            <div className="flex items-center gap-1.5 text-muted-foreground"><Phone className="h-3 w-3" /> {d.phone}</div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <div className="w-16 bg-muted rounded-full h-1.5">
                                <div className="bg-emerald-500 rounded-full h-1.5" style={{ width: `${d.score}%` }} />
                              </div>
                              <span className="font-bold text-[10px] text-emerald-600">{d.score}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-lg border-border/50" onClick={() => toast.info(`Dossier opened for ${d.name}`)}>
                              View File
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

        {/* TAB 3: Outreach Campaigns */}
        <TabsContent value="campaigns" className="outline-none space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {campaigns.map((c) => (
              <Card key={c.id} className="border-border/40 shadow-sm rounded-2xl bg-card flex flex-col justify-between overflow-hidden">
                <CardHeader className="pb-3 bg-secondary/20 border-b border-border/30">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xs font-bold font-outfit text-foreground truncate max-w-[170px]">{c.name}</CardTitle>
                    <Badge className={`border-none text-[9px] font-bold py-0.5 px-1.5 rounded-full ${
                      c.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-muted text-muted-foreground"
                    }`}>
                      {c.status}
                    </Badge>
                  </div>
                  <CardDescription className="text-[10px] mt-1">Channel: <strong>{c.channel} Outreach</strong></CardDescription>
                </CardHeader>
                <CardContent className="p-4.5 pt-4 grid grid-cols-2 gap-3 text-center text-xs">
                  <div className="p-2 border border-border/40 rounded-xl">
                    <p className="text-[10px] text-muted-foreground">Open Rate</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{c.openRate}</p>
                  </div>
                  <div className="p-2 border border-border/40 rounded-xl">
                    <p className="text-[10px] text-muted-foreground">CTR</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{c.clickRate}</p>
                  </div>
                  <div className="p-2 border border-border/40 rounded-xl">
                    <p className="text-[10px] text-muted-foreground">Volume Sent</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{c.sent}</p>
                  </div>
                  <div className="p-2 border border-border/40 rounded-xl">
                    <p className="text-[10px] text-muted-foreground">Replies</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">{c.replies}</p>
                  </div>
                </CardContent>
                <CardFooter className="p-4.5 pt-0 flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-[10px] rounded-xl h-8 border-border/50" onClick={() => toast.info("Campaign metrics expanded")}>
                    Outreach Analytics
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* SCHEDULE APPOINTMENT DIALOG */}
      <Dialog open={isAppointmentOpen} onOpenChange={setIsAppointmentOpen}>
        <DialogContent className="max-w-md border-border/40 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl">Schedule CRM Event</DialogTitle>
            <DialogDescription className="text-xs">Schedule viewings, underwrite reviews, or calls with buyers.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={handleAddAppointment}>
            <div className="space-y-1.5">
              <Label htmlFor="leadName" className="text-xs font-semibold">Investor / Lead Name</Label>
              <Input
                id="leadName"
                required
                placeholder="Sarah Connor"
                className="rounded-xl"
                value={appointmentForm.leadName}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, leadName: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="property" className="text-xs font-semibold">Target Asset Address (Optional)</Label>
              <Input
                id="property"
                placeholder="12 Oak Road"
                className="rounded-xl"
                value={appointmentForm.property}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, property: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="date" className="text-xs font-semibold">Date</Label>
                <Input
                  id="date"
                  type="date"
                  required
                  className="rounded-xl"
                  value={appointmentForm.date}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="time" className="text-xs font-semibold">Time</Label>
                <Input
                  id="time"
                  placeholder="10:00 AM"
                  required
                  className="rounded-xl"
                  value={appointmentForm.time}
                  onChange={(e) => setAppointmentForm({ ...appointmentForm, time: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="type" className="text-xs font-semibold">Event Type</Label>
              <select
                id="type"
                className="w-full text-xs p-2.5 rounded-xl border border-input bg-background focus:ring-1 focus:ring-ring"
                value={appointmentForm.type}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, type: e.target.value })}
              >
                <option value="Viewing">Property Viewing</option>
                <option value="Call">Introductory Call</option>
                <option value="Consultation">Underwrite Consultation</option>
                <option value="Negotiation">Offer Negotiation</option>
              </select>
            </div>
            
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsAppointmentOpen(false)} className="rounded-xl text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white font-semibold text-xs rounded-xl h-9 px-4 shadow-sm">
                Schedule Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
