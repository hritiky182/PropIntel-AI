import { useEffect, useState } from "react";
import { authService } from "@/services";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MailCheck, ShieldX } from "lucide-react";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "mock-token";
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    let alive = true;
    authService
      .verifyEmail(token)
      .then(() => {
        if (alive) {
          setSuccess(true);
          toast.success("Email verified successfully!");
          setTimeout(() => navigate("/login"), 3000);
        }
      })
      .catch(() => {
        if (alive) {
          setSuccess(false);
          toast.error("Verification failed. The link may have expired.");
        }
      })
      .finally(() => {
        if (alive) setVerifying(false);
      });

    return () => {
      alive = false;
    };
  }, [token, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50/50 dark:bg-slate-950/20 p-6">
      <Card className="w-full max-w-md border-border/40 shadow-2xl rounded-2xl">
        <CardHeader className="text-center pb-5">
          <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            {verifying ? (
              <Loader2 className="h-5.5 w-5.5 animate-spin" />
            ) : success ? (
              <MailCheck className="h-5.5 w-5.5 text-emerald-500" />
            ) : (
              <ShieldX className="h-5.5 w-5.5 text-destructive" />
            )}
          </div>
          <CardTitle className="text-xl font-bold font-outfit">
            {verifying ? "Verifying email" : success ? "Email Verified" : "Verification Failed"}
          </CardTitle>
          <CardDescription className="text-xs">
            {verifying
              ? "Checking security certificates with the registry..."
              : success
              ? "Your account is active. Redirecting to login shortly..."
              : "We could not verify your email address."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          {!verifying && (
            <Link to="/login" className="text-xs text-primary hover:underline font-semibold">
              Proceed to Login Page
            </Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
