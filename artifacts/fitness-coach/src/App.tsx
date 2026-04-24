import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LegalPage from "@/pages/Legal";
import { LEGAL_SLUGS } from "@/pages/legalContent";
import { CheckoutProvider } from "@/checkout/CheckoutContext";
import CheckoutPanel from "@/checkout/Checkout";
import AdminApp from "@/admin/AdminApp";

const queryClient = new QueryClient();

function PublicRouter() {
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        {LEGAL_SLUGS.map((slug) => (
          <Route key={slug} path={`/${slug}`}>
            {() => <LegalPage slug={slug} />}
          </Route>
        ))}
        <Route component={NotFound} />
      </Switch>
      <CheckoutPanel />
    </>
  );
}

function Router() {
  const [location] = useLocation();
  if (location.startsWith("/admin")) {
    return <AdminApp />;
  }
  return (
    <CheckoutProvider>
      <PublicRouter />
    </CheckoutProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
