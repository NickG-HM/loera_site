import { useQuery } from "@tanstack/react-query";
import { Product, CartItem } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
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

  const totalBYN = items?.reduce(
    (sum, item) => sum + Number(item.product.priceBYN) * item.quantity,
    0
  );

  const totalRUB = items?.reduce(
    (sum, item) => sum + Number(item.product.priceRUB) * item.quantity,
    0
  );

  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";

  const handleInstagramOrder = () => {
    const orderDetails = items?.map(item => 
      `${item.product.name} - Количество: ${item.quantity} - BYN ${Number(item.product.priceBYN) * item.quantity} / RUB ${Number(item.product.priceRUB) * item.quantity}`
    ).join('\n');
    
    const message = `Здравствуйте! Я хочу оформить заказ:\n\n${orderDetails}\n\nИтого: BYN ${totalBYN} / RUB ${totalRUB}`;
    
    window.open(`${instagramLink}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pt-44 pb-12">
        <h1 className="text-3xl font-bold mb-8">Оформление заказа</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Сумма заказа</CardTitle>
              </CardHeader>
              <CardContent>
                {items?.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center py-2 border-b last:border-b-0"
                  >
                    <div className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Количество: {item.quantity}
                        </p>
                      </div>
                    </div>
                    <p className="font-medium">
                      BYN {(Number(item.product.priceBYN) * item.quantity)} / RUB {(Number(item.product.priceRUB) * item.quantity)}
                    </p>
                  </div>
                ))}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Итого:</span>
                    <span>BYN {totalBYN} / RUB {totalRUB}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Завершить заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Чтобы завершить заказ, пожалуйста, свяжитесь с нами через Instagram с деталями вашего заказа.
                </p>
                
                <Button 
                  onClick={handleInstagramOrder}
                  className="w-full flex items-center gap-2"
                >
                  <Instagram className="h-5 w-5" />
                  Заказать через Instagram
                </Button>
                
                <div className="text-sm text-muted-foreground">
                  <p>Мы ответим на ваше сообщение с:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Подтверждением заказа</li>
                    <li>Деталями оплаты</li>
                    <li>Информацией о доставке</li>
                    <li>Ориентировочным временем доставки</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}