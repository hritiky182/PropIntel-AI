import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import AppLayout from "@/components/layout/AppLayout";
import Login from "@/pages/Login";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import VerifyEmail from "@/pages/VerifyEmail";
import MFA from "@/pages/MFA";

// Lazy / direct imports of pages
import Dashboard from "@/pages/Dashboard";
import Marketplace from "@/pages/Marketplace";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import CRM from "@/pages/CRM";
import Analytics from "@/pages/Analytics";
import AIInsights from "@/pages/AIInsights";
import Projects from "@/pages/Projects";
import Tenants from "@/pages/Tenants";
import Investments from "@/pages/Investments";
import OffMarketDeals from "@/pages/OffMarketDeals";
import Documents from "@/pages/Documents";
import Administration from "@/pages/Administration";
import Settings from "@/pages/Settings";

// Role-based route guard
import { useAuthStore } from "@/store/authStore";

function RoleGuard({ children, allowedRoles }: { children: React.ReactNode; allowedRoles: string[] }) {
  const user = useAuthStore((s) => s.user);
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role.toLowerCase())) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/mfa" element={<MFA />} />

        {/* Protected layout shell */}
        <Route path="/" element={<AppLayout />}>
          {/* Redirect index to dashboard */}
          <Route index element={<Navigate to="/dashboard" replace />} />
          
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="properties" element={<Properties />} />
          <Route path="properties/:id" element={<PropertyDetail />} />
          <Route path="crm" element={<CRM />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="ai-insights" element={<AIInsights />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="investments" element={<Investments />} />
          <Route path="off-market" element={<OffMarketDeals />} />
          <Route path="documents" element={<Documents />} />
          
          {/* Admin-only route */}
          <Route
            path="administration"
            element={
              <RoleGuard allowedRoles={["super_admin"]}>
                <Administration />
              </RoleGuard>
            }
          />
          
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Fallback redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster position="top-right" closeButton richColors />
    </BrowserRouter>
  );
}
