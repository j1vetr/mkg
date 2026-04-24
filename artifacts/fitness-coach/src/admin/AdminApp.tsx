import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { AdminAuthProvider, useAdminAuth } from "./AdminAuthContext";
import AdminLogin from "./Login";
import AdminShell from "./AdminShell";
import AdminDashboard from "./Dashboard";
import PackagesAdmin from "./PackagesAdmin";
import MediaAdmin from "./MediaAdmin";

function Guarded({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAdminAuth();
  const [, setLocation] = useLocation();
  useEffect(() => {
    if (!loading && !user) setLocation("/admin/giris");
  }, [user, loading, setLocation]);
  if (loading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ minHeight: "100vh", background: "#080808", color: "#444", fontSize: "0.8rem", letterSpacing: "0.1em" }}
      >
        YÜKLENİYOR…
      </div>
    );
  }
  if (!user) return null;
  return <AdminShell>{children}</AdminShell>;
}

function AdminRouter() {
  return (
    <Switch>
      <Route path="/admin/giris" component={AdminLogin} />
      <Route path="/admin">
        <Guarded>
          <AdminDashboard />
        </Guarded>
      </Route>
      <Route path="/admin/paketler">
        <Guarded>
          <PackagesAdmin />
        </Guarded>
      </Route>
      <Route path="/admin/medya">
        <Guarded>
          <MediaAdmin />
        </Guarded>
      </Route>
    </Switch>
  );
}

export default function AdminApp() {
  return (
    <AdminAuthProvider>
      <AdminRouter />
    </AdminAuthProvider>
  );
}
