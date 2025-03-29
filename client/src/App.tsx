import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { staticQueryClient, useStaticData } from "./lib/staticClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./lib/cart";
import { CurrencyProvider } from "./lib/currency";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductPage from "@/pages/product";
import ProductsPage from "@/pages/products";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import ContactPage from "@/pages/contact";

function Router() {
  // Define base path - empty for local, can be updated for deployment if needed
  const basePath = "";
  
  return (
    <div className="min-h-screen transition-opacity duration-500 ease-in-out">
      <Switch>
        <Route path={`${basePath}/`} component={Home} />
        <Route path={`${basePath}/products`} component={ProductsPage} />
        <Route path={`${basePath}/product/:id`} component={ProductPage} />
        <Route path={`${basePath}/cart`} component={CartPage} />
        <Route path={`${basePath}/checkout`} component={CheckoutPage} />
        <Route path={`${basePath}/contact`} component={ContactPage} />
        <Route path={`${basePath}/category/:category`} component={ProductsPage} />
        <Route path={`${basePath}/search/:query`} component={ProductsPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  // Use staticQueryClient for static deployments, otherwise use normal queryClient
  const client = useStaticData ? staticQueryClient : queryClient;
  
  return (
    <QueryClientProvider client={client}>
      <CurrencyProvider>
        <CartProvider>
          <Router />
          <Toaster />
        </CartProvider>
      </CurrencyProvider>
    </QueryClientProvider>
  );
}

export default App;