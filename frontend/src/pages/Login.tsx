import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Loader2, Sparkles, Shield, Compass, BarChart } from "lucide-react";
import { authService } from "@/services";
import { useAuthStore } from "@/store/authStore";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";

const schema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(4, "Password too short"),
});
type Form = z.infer<typeof schema>;

export default function Login() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: "alex@test.com", password: "demo" },
  });

  const onSubmit = async (data: Form) => {
    setLoading(true);
    try {
      const { user, token } = await authService.login(data.email, data.password);
      setAuth(user, token);
      toast.success(`Welcome back, ${user.name.split(" ")[0]}`);
      navigate("/dashboard");
    } catch (e) {
      toast.error((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const demos = [
    { label: "Super Admin", email: "alex@test.com", desc: "C-Suite Executive" },
    { label: "Acquisitions Dir.", email: "priya@test.com", desc: "Asset Sourcing" },
    { label: "Asset Manager", email: "tom@test.com", desc: "Portfolio & Leases" },
    { label: "Legal Counsel", email: "nadia@test.com", desc: "Transactions & Audits" },
    { label: "Project Manager", email: "owen@test.com", desc: "Refurbs & Construction" },
  ];

  return (
    <div className="grid min-h-screen lg:grid-cols-12 overflow-hidden bg-background">
      {/* Left Column: SaaS Promo Panel */}
      <div className="relative hidden lg:flex lg:col-span-7 flex-col justify-between p-12 bg-slate-950 text-white overflow-hidden border-r border-slate-800">
        {/* Abstract animated background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(14,165,233,0.12),transparent_50%)]" />

        <div className="relative flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-sky-400 shadow-lg shadow-indigo-500/30">
            <Building2 className="h-5.5 w-5.5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-wider font-outfit uppercase bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">AETHERIA</span>
        </div>

        <div className="relative max-w-xl z-10 my-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-sky-400 text-xs font-semibold mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            V3.0 AI-Powered Platform Release
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight leading-[1.1] font-outfit text-white">
            Next-Gen Real Estate <br />
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
              Intelligence & Automation.
            </span>
          </h1>

          <p className="mt-6 text-base text-slate-400 leading-relaxed font-light">
            Smarter deal sourcing, predictive yield analysis, integrated CRM workflows,
            and construction oversight. Built for institutional investors, councils,
            and property managers worldwide.
          </p>

          {/* Key SaaS value propositions */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-900">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                <Shield className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">Institutional Grade</h4>
                <p className="text-xs text-slate-400 mt-0.5">Role-based vaults and audit logs.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400 mt-0.5">
                <Compass className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200">AI Market Scouting</h4>
                <p className="text-xs text-slate-400 mt-0.5">Real-time yield forecasting.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 Aetheria Technologies Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>

      {/* Right Column: Login Form */}
      <div className="flex lg:col-span-5 items-center justify-center p-8 bg-slate-50/50 dark:bg-slate-950/20">
        <Card className="w-full max-w-md border-border/40 shadow-2xl rounded-2xl bg-white/95 dark:bg-slate-950/90 backdrop-blur">
          <CardHeader className="space-y-1.5 pb-6">
            <CardTitle className="text-2xl font-bold font-outfit">Welcome back</CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Sign in with one of our enterprise-configured demo roles below.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  className="rounded-xl border-border/50 bg-background/50"
                  placeholder="name@company.com"
                  {...register("email")}
                />
                {errors.email && <p className="text-xs text-destructive font-medium mt-1">{errors.email.message}</p>}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-xs font-semibold">Password</Label>
                  <Link to="/forgot-password" className="text-xs text-primary hover:underline font-semibold">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  className="rounded-xl border-border/50 bg-background/50"
                  placeholder="••••••••"
                  {...register("password")}
                />
                {errors.password && <p className="text-xs text-destructive font-medium mt-1">{errors.password.message}</p>}
              </div>

              <Button type="submit" className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-accent hover:opacity-90 font-semibold text-white shadow-lg shadow-primary/10 mt-2" disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4.5 w-4.5 animate-spin" />
                ) : (
                  "Sign in to Platform"
                )}
              </Button>
            </form>

            <div className="relative my-6 flex items-center justify-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/60" />
              </div>
              <span className="relative bg-card px-3.5 text-[10px] tracking-wider uppercase font-bold text-muted-foreground/80">
                Demo Quick Access
              </span>
            </div>

            {/* Quick Login Grids */}
            <div className="grid grid-cols-1 gap-2.5">
              {demos.map((d) => (
                <button
                  key={d.email}
                  type="button"
                  onClick={() => {
                    setValue("email", d.email);
                    setValue("password", "demo");
                    toast.info(`Selected ${d.label} profile`);
                  }}
                  className="flex items-center justify-between rounded-xl border border-border/40 bg-card p-3.5 text-left text-xs transition-all hover:bg-muted/55 hover:border-primary/30 group"
                >
                  <div>
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">{d.label}</p>
                    <p className="text-[10px] text-muted-foreground/90 font-medium mt-0.5">{d.desc}</p>
                  </div>
                  <span className="text-[10px] font-semibold text-muted-foreground bg-secondary/80 py-1 px-2 rounded border border-border/10 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                    Load
                  </span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
