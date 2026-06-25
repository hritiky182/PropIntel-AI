import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { authService } from "@/services";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ShieldCheck, ShieldAlert } from "lucide-react";

export default function MFA() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    setLoading(true);
    try {
      const { ok } = await authService.verifyMfa(code);
      if (!ok) {
        toast.error("Invalid verification code");
        return;
      }
      toast.success("Identity verified successfully!");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 dark:bg-slate-950/20 p-6">
      <Card className="w-full max-w-md border-border/40 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-5">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="h-5.5 w-5.5" />
          </div>
          <CardTitle className="text-xl font-bold font-outfit">Security Verification</CardTitle>
          <CardDescription className="text-xs">
            Enter the 6-digit authenticator code. For testing, enter any 6 digits.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup className="gap-1.5">
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot 
                    key={i} 
                    index={i} 
                    className="rounded-lg border-border/50 bg-background/50 h-11 w-11 font-semibold text-sm"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>
          <Button
            className="w-full h-11 rounded-xl bg-primary text-white font-semibold shadow-md mt-2"
            disabled={code.length !== 6 || loading}
            onClick={handleVerify}
          >
            {loading ? "Verifying..." : "Verify and Continue"}
          </Button>
          <div className="flex items-center gap-2 rounded-lg bg-amber-500/15 p-3 text-[11px] text-amber-600 dark:text-amber-400">
            <ShieldAlert className="h-4 w-4 shrink-0" />
            <span>MFA protection is enabled for your corporate profile. Contact your system administrator to revoke.</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
