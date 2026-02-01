import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./lib/cart";
import { PageLoader } from "@/components/loading-spinner";
// Import Home directly (not lazy) for faster initial load
import Home from "@/pages/home";

// Lazy load other pages for code splitting
const ProductPage = lazy(() => import("@/pages/product"));
const ProductsPage = lazy(() => import("@/pages/products"));
const CartPage = lazy(() => import("@/pages/cart"));
const CheckoutPage = lazy(() => import("@/pages/checkout"));
const ContactPage = lazy(() => import("@/pages/contact"));
const DeliveryPage = lazy(() => import("@/pages/delivery"));
const NotFound = lazy(() => import("@/pages/not-found"));

function Router() {
  const base = "";
  
  return (
    <WouterRouter base={base}>
      <div className="min-h-screen transition-opacity duration-500 ease-in-out">
        <Suspense fallback={<PageLoader />}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/product/:id" component={ProductPage} />
            <Route path="/cart" component={CartPage} />
            <Route path="/checkout" component={CheckoutPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/delivery" component={DeliveryPage} />
            <Route path="/category/:category" component={ProductsPage} />
            <Route path="/search/:query" component={ProductsPage} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Router />
        <Toaster />
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;