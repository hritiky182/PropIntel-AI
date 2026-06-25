import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      await authService.resetPassword("mock-token", password);
      toast.success("Password has been reset successfully");
      navigate("/login");
    } catch (err) {
      toast.error("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 dark:bg-slate-950/20 p-6">
      <Card className="w-full max-w-md border-border/40 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-5">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500">
            <ShieldAlert className="h-5.5 w-5.5" />
          </div>
          <CardTitle className="text-xl font-bold font-outfit">Create new password</CardTitle>
          <CardDescription className="text-xs">
            Enter a strong password to protect your real estate portfolio.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="pass" className="text-xs font-semibold">New Password</Label>
              <Input
                id="pass"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-xl border-border/50 bg-background/50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm" className="text-xs font-semibold">Confirm New Password</Label>
              <Input
                id="confirm"
                type="password"
                required
                placeholder="••••••••"
                className="rounded-xl border-border/50 bg-background/50"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full h-11 rounded-xl bg-primary text-white font-semibold shadow-md" disabled={loading}>
              {loading ? "Updating..." : "Update Password"}
            </Button>
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold mt-4 transition-colors"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
