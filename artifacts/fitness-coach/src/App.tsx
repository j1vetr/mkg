import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LegalPage from "@/pages/Legal";
import { LEGAL_SLUGS } from "@/pages/legalContent";
import { CheckoutProvider } from "@/checkout/CheckoutContext";
import CheckoutPanel from "@/checkout/Checkout";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {LEGAL_SLUGS.map((slug) => (
        <Route key={slug} path={`/${slug}`}>
          {() => <LegalPage slug={slug} />}
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckoutProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <CheckoutPanel />
      </CheckoutProvider>
    </QueryClientProvider>
  );
}

export default App;
