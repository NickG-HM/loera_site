import { useQuery } from "@tanstack/react-query";
import { Product, CartItem } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { Instagram } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CheckoutPage() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: cartItems } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
  });

  const items = cartItems?.map((item) => ({
    ...item,
    product: products?.find((p) => p.id === item.productId)!,
  }));

  const total = items?.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  const formatCartDetails = () => {
    if (!items) return "";
    const itemDetails = items.map(item => 
      `${item.product.name} (${item.quantity}x)`
    ).join(", ");
    return `Hi! How can I purchase ${itemDetails}?`;
  };

  const whatsappLink = `https://api.whatsapp.com/send/?phone=375255059703&text=${encodeURIComponent(formatCartDetails())}&type=phone_number&app_absent=0`;
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between py-2 border-b last:border-0"
                >
                  <div>
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    ${(Number(item.product.price) * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="flex justify-between pt-4 font-bold">
                <p>Total</p>
                <p>${total?.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="w-full" size="lg">
                Proceed to Checkout via WhatsApp
              </Button>
            </a>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-gray-50 px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <a href={instagramLink} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="w-full" size="lg">
                <Instagram className="mr-2 h-4 w-4" />
                Contact Us on Instagram
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}