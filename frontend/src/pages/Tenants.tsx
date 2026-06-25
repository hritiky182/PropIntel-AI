import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Users, Key, Wrench, CreditCard, PlusCircle, Calendar,
  ShieldCheck, AlertCircle, Phone, Mail, DollarSign, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";
import { gbp } from "@/utils/format";

export default function Tenants() {
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const [serviceForm, setServiceForm] = useState({
    property: "",
    tenant: "",
    issue: "",
    priority: "Medium",
  });

  // Mock Tenants Data
  const tenancies = [
    { id: "t1", name: "David Beckham", property: "12 Oak Road", leaseStart: "2025-01-01", leaseEnd: "2026-12-31", rent: 1250, status: "Active" },
    { id: "t2", name: "Helena Carter", property: "14 Cedar Lane", leaseStart: "2024-06-15", leaseEnd: "2026-06-14", rent: 1650, status: "Renewing" },
    { id: "t3", name: "Ryan Reynolds", property: "23 Elm Street", leaseStart: "2025-03-01", leaseEnd: "2026-02-28", rent: 980, status: "Active" },
    { id: "t4", name: "Scarlett Johansson", property: "10 Birch Way", leaseStart: "2023-09-01", leaseEnd: "2025-08-31", rent: 2200, status: "Arrears" },
  ];

  // Mock Maintenance Tickets
  const tickets = [
    { id: "tk1", property: "12 Oak Road", tenant: "David Beckham", issue: "Heating boiler pressure loss", priority: "High", status: "Scheduled", vendor: "EcoWarm Plumbing" },
    { id: "tk2", property: "10 Birch Way", tenant: "Scarlett Johansson", issue: "Roof tile displacement", priority: "Critical", status: "Awaiting Quote", vendor: "Apex Structural Ltd" },
    { id: "tk3", property: "23 Elm Street", tenant: "Ryan Reynolds", issue: "Kitchen sink washer wear", priority: "Low", status: "Completed", vendor: "Sparky Electrical" },
  ];

  // Mock Rent Payments Ledger
  const payments = [
    { id: "p1", tenant: "David Beckham", date: "2026-06-01", amount: 1250, status: "Paid" },
    { id: "p2", tenant: "Helena Carter", date: "2026-06-01", amount: 1650, status: "Paid" },
    { id: "p3", tenant: "Ryan Reynolds", date: "2026-06-01", amount: 980, status: "Paid" },
    { id: "p4", tenant: "Scarlett Johansson", date: "2026-06-01", amount: 2200, status: "Overdue" },
  ];

  const handleCreateService = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Service ticket successfully created for ${serviceForm.tenant}!`);
    setIsServiceOpen(false);
    setServiceForm({ property: "", tenant: "", issue: "", priority: "Medium" });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Tenant & Property Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Oversee corporate lease contracts, track maintenance order tickets, and audit payment arrears.
          </p>
        </div>
        <Button onClick={() => setIsServiceOpen(true)} className="bg-primary hover:opacity-90 text-white rounded-xl h-10 shadow-sm self-start md:self-auto">
          <Wrench className="mr-2 h-4 w-4" /> Log Service Ticket
        </Button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Occupied Portfolios</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">94.8%</p>
            </div>
            <Badge className="bg-primary/10 text-primary border-none font-bold text-xs">Healthy</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Arrears Rate</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">2.4%</p>
            </div>
            <Badge className="bg-red-500/10 text-red-600 border-none font-bold text-xs">Low risk</Badge>
          </CardContent>
        </Card>
        <Card className="border-border/40 shadow-sm rounded-xl">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-muted-foreground">Active Work Orders</p>
              <p className="text-2xl font-bold font-outfit text-foreground mt-1.5">3 Tickets</p>
            </div>
            <Badge className="bg-amber-500/10 text-amber-600 border-none font-bold text-xs">2 Scheduled</Badge>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="leases" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="leases" className="rounded-lg text-xs font-semibold px-4">Tenancies & Leases</TabsTrigger>
          <TabsTrigger value="tickets" className="rounded-lg text-xs font-semibold px-4">Maintenance Tickets</TabsTrigger>
          <TabsTrigger value="payments" className="rounded-lg text-xs font-semibold px-4">Payments & Ledger</TabsTrigger>
        </TabsList>

        {/* TAB 1: Leases & Tenancies */}
        <TabsContent value="leases" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl bg-card">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">Tenant Name</th>
                      <th className="p-4">Leased Asset</th>
                      <th className="p-4">Lease Duration</th>
                      <th className="p-4">Monthly Rent</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {tenancies.map((t) => (
                      <tr key={t.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-bold text-foreground font-outfit">{t.name}</td>
                        <td className="p-4 text-muted-foreground">{t.property}</td>
                        <td className="p-4 text-muted-foreground font-medium">
                          {new Date(t.leaseStart).toLocaleDateString("en-GB")} - {new Date(t.leaseEnd).toLocaleDateString("en-GB")}
                        </td>
                        <td className="p-4 font-bold text-foreground">{gbp(t.rent)}</td>
                        <td className="p-4">
                          <Badge className={`border-none text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            t.status === "Active" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" :
                            t.status === "Renewing" ? "bg-primary/15 text-primary" :
                            "bg-red-500/15 text-red-600 dark:text-red-400"
                          }`}>
                            {t.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="outline" size="sm" className="h-7 text-[10px] rounded-lg border-border/50" onClick={() => toast.info(`Lease contract opened for ${t.name}`)}>
                            Open Lease
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

        {/* TAB 2: Maintenance Tickets */}
        <TabsContent value="tickets" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">Property</th>
                      <th className="p-4">Tenant</th>
                      <th className="p-4">Service Request</th>
                      <th className="p-4">Priority</th>
                      <th className="p-4">Assigned Vendor</th>
                      <th className="p-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {tickets.map((tk) => (
                      <tr key={tk.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-bold text-foreground font-outfit">{tk.property}</td>
                        <td className="p-4 text-muted-foreground">{tk.tenant}</td>
                        <td className="p-4 text-muted-foreground/90 font-medium">{tk.issue}</td>
                        <td className="p-4">
                          <Badge className={`border-none text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            tk.priority === "Critical" || tk.priority === "High" ? "bg-red-500/15 text-red-600 dark:text-red-400" :
                            "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                          }`}>
                            {tk.priority}
                          </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground">{tk.vendor}</td>
                        <td className="p-4">
                          <Badge variant="outline" className="text-[9px] font-bold py-0.5 border-border/60 bg-secondary px-2">{tk.status}</Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Payments & Ledger */}
        <TabsContent value="payments" className="outline-none">
          <Card className="border-border/40 shadow-sm rounded-2xl">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 bg-secondary/30 font-bold text-muted-foreground/80">
                      <th className="p-4">Tenant Name</th>
                      <th className="p-4">Payment Date</th>
                      <th className="p-4">Rent Amount</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/30">
                    {payments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-muted/20 transition-colors">
                        <td className="p-4 font-bold text-foreground font-outfit">{pay.tenant}</td>
                        <td className="p-4 text-muted-foreground">{new Date(pay.date).toLocaleDateString("en-GB")}</td>
                        <td className="p-4 font-bold text-foreground">{gbp(pay.amount)}</td>
                        <td className="p-4">
                          <Badge className={`border-none text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                            pay.status === "Paid" ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400" : "bg-red-500/15 text-red-600 dark:text-red-400"
                          }`}>
                            {pay.status}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <Button variant="ghost" size="sm" className="h-7 text-[10px] text-primary hover:bg-primary/10 rounded-lg px-2" onClick={() => toast.success("Invoice PDF generated")}>
                            Generate Invoice
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

      {/* SERVICE REQUEST DIALOG */}
      <Dialog open={isServiceOpen} onOpenChange={setIsServiceOpen}>
        <DialogContent className="max-w-md border-border/40 shadow-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="font-outfit text-xl">Log Maintenance Request</DialogTitle>
            <DialogDescription className="text-xs">Submit a repair or service request to the facilities management team.</DialogDescription>
          </DialogHeader>
          <form className="space-y-4 pt-2" onSubmit={handleCreateService}>
            <div className="space-y-1.5">
              <Label htmlFor="tenantName" className="text-xs font-semibold">Tenant Name</Label>
              <Input
                id="tenantName"
                required
                placeholder="David Beckham"
                className="rounded-xl"
                value={serviceForm.tenant}
                onChange={(e) => setServiceForm({ ...serviceForm, tenant: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="propAddr" className="text-xs font-semibold">Leased Property Address</Label>
              <Input
                id="propAddr"
                required
                placeholder="12 Oak Road"
                className="rounded-xl"
                value={serviceForm.property}
                onChange={(e) => setServiceForm({ ...serviceForm, property: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="issueDesc" className="text-xs font-semibold">Issue Description</Label>
              <textarea
                id="issueDesc"
                required
                className="w-full min-h-[80px] text-xs p-3 rounded-xl border border-input bg-background focus:ring-1 focus:ring-ring"
                placeholder="Water dripping from bathroom ceiling, likely a toilet seal issue upstairs..."
                value={serviceForm.issue}
                onChange={(e) => setServiceForm({ ...serviceForm, issue: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="priorityLevel" className="text-xs font-semibold">Priority Level</Label>
              <select
                id="priorityLevel"
                className="w-full text-xs p-2.5 rounded-xl border border-input bg-background focus:ring-1 focus:ring-ring"
                value={serviceForm.priority}
                onChange={(e) => setServiceForm({ ...serviceForm, priority: e.target.value })}
              >
                <option value="Low">Low (Cosmetic, minor wear)</option>
                <option value="Medium">Medium (Appliance failure, non-emergency)</option>
                <option value="High">High (No hot water, leakage)</option>
                <option value="Critical">Critical (Structural flood, gas threat)</option>
              </select>
            </div>
            
            <div className="flex gap-2 justify-end pt-2">
              <Button type="button" variant="ghost" onClick={() => setIsServiceOpen(false)} className="rounded-xl text-xs h-9">
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white font-semibold text-xs rounded-xl h-9 px-4 shadow-sm">
                Log Request
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
