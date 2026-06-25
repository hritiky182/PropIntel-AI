import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { authService } from "@/services";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { KeyRound, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await authService.forgotPassword(email);
      toast.success("Reset link sent to your email");
      setSent(true);
    } catch (err) {
      toast.error("Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 dark:bg-slate-950/20 p-6">
      <Card className="w-full max-w-md border-border/40 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-5">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <KeyRound className="h-5.5 w-5.5" />
          </div>
          <CardTitle className="text-xl font-bold font-outfit">Reset password</CardTitle>
          <CardDescription className="text-xs">
            We will email you a secure link to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sent ? (
            <div className="space-y-4 text-center">
              <div className="flex justify-center text-emerald-500 mb-2">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <p className="text-sm text-foreground">
                If an account exists for <strong>{email}</strong>, a reset link will arrive shortly.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline font-semibold mt-2"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
              </Link>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-semibold">Work email address</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  className="rounded-xl border-border/50 bg-background/50"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-11 rounded-xl bg-primary text-white font-semibold shadow-md" disabled={loading}>
                {loading ? "Sending..." : "Send Secure Reset Link"}
              </Button>
              <Link
                to="/login"
                className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground hover:text-foreground font-semibold mt-4 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" /> Back to sign in
              </Link>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
