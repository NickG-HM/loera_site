import { useQuery } from "@tanstack/react-query";
import { Product, CartItem } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "wouter";

export default function CartPage() {
  const { data: products, isLoading: productsLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  const { data: cartItems, isLoading: cartLoading } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"]
  });

  const { updateQuantity, removeFromCart } = useCart();
  const { formatPrice, currency, getFixedPrice } = useCurrency();

  if (productsLoading || cartLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="bg-muted h-8 w-1/4 rounded mb-8" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-muted h-24 rounded-lg mb-4" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const items = cartItems?.map(item => ({
    ...item,
    product: products?.find(p => p.id === item.productId)!
  }));

  // Calculate total using fixed prices based on selected currency
  const total = items?.reduce(
    (sum, item) => sum + Number(getFixedPrice(item.product.id)) * item.quantity,
    0
  );

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div 
        className="fixed inset-0 z-30 bg-background/80 backdrop-blur-sm transition-opacity duration-500"
      >
        <div 
          className="absolute inset-y-0 right-0 w-full md:w-[600px] bg-background shadow-lg transform transition-transform duration-500 ease-in-out"
        >
          <div className="container mx-auto px-4 pt-44 pb-12 h-full overflow-auto">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

            {(!items || items.length === 0) ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Your cart is empty</p>
                <Link href="/">
                  <Button>Continue Shopping</Button>
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b py-4 transition-all duration-300 ease-in-out hover:bg-accent/5"
                    >
                      <Link href={`/product/${item.product.id}`}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-24 h-24 object-cover rounded transform transition-transform duration-300 hover:scale-105"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/product/${item.product.id}`}>
                          <h3 className="font-medium hover:text-primary transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <p className="text-muted-foreground text-sm">
                          {formatPrice(item.product.id.toString())}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="transition-transform active:scale-95"
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="transition-transform active:scale-95"
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="ml-auto text-destructive hover:bg-destructive/10 transition-colors"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-card p-6 rounded-lg h-fit">
                  <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>{currency} {total}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>{currency} {total}</span>
                    </div>
                  </div>
                  <Link href="/checkout">
                    <Button 
                      className="w-full transition-transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Proceed to Checkout
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}