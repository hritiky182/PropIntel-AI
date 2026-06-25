import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User, ShieldAlert, Settings as SettingsIcon, Bell,
  Lock, BadgePercent, Globe, Sparkles, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  // Form states
  const [profile, setProfile] = useState({
    name: "Priya Shah",
    email: "priya@aetheria.com",
    phone: "+44 7911 123456",
    title: "Senior Acquisitions Director",
  });

  const [mfa, setMfa] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [dealSourcingAlerts, setDealSourcingAlerts] = useState(true);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Corporate profile settings updated successfully!");
  };

  const handleMfaToggle = (checked: boolean) => {
    setMfa(checked);
    toast.success(checked ? "Multi-factor authentication (MFA) activated!" : "MFA deactivated.");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-outfit text-foreground flex items-center gap-2">
            Platform Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Configure your investor profile, adjust security controls, and set notification thresholds.
          </p>
        </div>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-muted/65 p-1 rounded-xl w-full justify-start overflow-x-auto md:w-auto">
          <TabsTrigger value="profile" className="rounded-lg text-xs font-semibold px-4">Corporate Profile</TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg text-xs font-semibold px-4">Security & Credentials</TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg text-xs font-semibold px-4">Preferences & Alerts</TabsTrigger>
        </TabsList>

        {/* TAB 1: Profile */}
        <TabsContent value="profile" className="outline-none">
          <Card className="max-w-2xl border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Personal Dossier
              </CardTitle>
              <CardDescription className="text-xs">Update your professional team credentials.</CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSave}>
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Full name</Label>
                    <Input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} required className="rounded-xl h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Corporate Title</Label>
                    <Input value={profile.title} onChange={(e) => setProfile({ ...profile, title: e.target.value })} required className="rounded-xl h-10" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Work Email Address</Label>
                    <Input type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required className="rounded-xl h-10" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-semibold">Mobile Number</Label>
                    <Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} required className="rounded-xl h-10" />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end border-t border-border/20 p-4.5">
                <Button type="submit" className="bg-primary text-white font-semibold text-xs rounded-xl h-9 px-4.5 shadow-sm">
                  Save Credentials
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        {/* TAB 2: Security & Credentials */}
        <TabsContent value="security" className="outline-none space-y-6">
          <Card className="max-w-2xl border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                MFA Authentication Protocols
              </CardTitle>
              <CardDescription className="text-xs">Enforce multi-factor verification on your account.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4.5 rounded-2xl border border-border/40 bg-secondary/30">
                <div className="space-y-0.5">
                  <p className="font-bold text-foreground font-outfit">Two-Factor Authentication (2FA)</p>
                  <p className="text-[10px] text-muted-foreground">Require a secure code from your authenticator app to log in.</p>
                </div>
                <Switch checked={mfa} onCheckedChange={handleMfaToggle} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* TAB 3: Preferences & Alerts */}
        <TabsContent value="notifications" className="outline-none">
          <Card className="max-w-2xl border-border/40 shadow-sm rounded-2xl bg-card">
            <CardHeader>
              <CardTitle className="text-base font-bold font-outfit flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-xs">Select how and when you receive intelligence alerts.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-xs">
              <div className="flex items-center justify-between py-3 border-b border-border/30">
                <div className="space-y-0.5">
                  <p className="font-bold text-foreground font-outfit">Sourcing Deal Alerts</p>
                  <p className="text-[10px] text-muted-foreground">Receive instant alerts when AI models detect undervalued deals in your target region.</p>
                </div>
                <Switch checked={dealSourcingAlerts} onCheckedChange={(val) => { setDealSourcingAlerts(val); toast.success("Deal alert triggers updated!"); }} />
              </div>

              <div className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <p className="font-bold text-foreground font-outfit">Email Weekly Summaries</p>
                  <p className="text-[10px] text-muted-foreground">Receive weekly digests containing regional yield indexes and macro market forecasts.</p>
                </div>
                <Switch checked={emailAlerts} onCheckedChange={(val) => { setEmailAlerts(val); toast.success("Weekly summary preferences saved!"); }} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
