import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "./lib/cart";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import ProductPage from "@/pages/product";
import ProductsPage from "@/pages/products";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import ContactPage from "@/pages/contact";
import DeliveryPage from "@/pages/delivery";

function Router() {
  const base = "";
  
  return (
    <WouterRouter base={base}>
      <div className="min-h-screen transition-opacity duration-500 ease-in-out">
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