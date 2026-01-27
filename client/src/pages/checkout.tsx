import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart";
import { Instagram, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getAllStaticProducts } from "@/lib/staticData";

export default function CheckoutPage() {
  const { data: products } = useQuery<Product[]>({
    queryKey: ["/api/products/all"],
    queryFn: () => {
      if (import.meta.env.PROD) {
        return getAllStaticProducts();
      } else {
        return fetch("/api/products/all").then(res => res.json());
      }
    }
  });

  // Use cart from context instead of duplicate query
  const { cartItems } = useCart();
  const { toast } = useToast();

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

  const instagramUsername = "elizz_16"; // Instagram username
  const telegramUsername = "elizz_16";

  const createOrderMessage = () => {
    const orderDetails = items?.map(item => 
      `${item.product.ProductName} - Количество: ${item.quantity} - BYN ${Number(item.product.priceBYN) * item.quantity} / RUB ${Number(item.product.priceRUB) * item.quantity}`
    ).join('\n');
    
    return `Здравствуйте! Я хочу оформить заказ:\n\n${orderDetails}\n\nИтого: BYN ${totalBYN} / RUB ${totalRUB}`;
  };

  const handleTelegramOrder = () => {
    const message = createOrderMessage();
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://t.me/${telegramUsername}?text=${encodedMessage}`, '_blank');
  };

  const handleInstagramOrder = () => {
    const message = createOrderMessage();
    // Instagram doesn't support pre-filled messages via URL like Telegram
    // Best approach: Copy message to clipboard and open Instagram DM to the user
    navigator.clipboard.writeText(message).then(() => {
      toast({
        title: "Сообщение скопировано",
        description: "Текст заказа скопирован. Откроется Instagram - просто вставьте сообщение (Ctrl+V / Cmd+V).",
      });
      // Open Instagram DM directly to the user
      // Note: Instagram doesn't support pre-filled text, so user needs to paste
      window.open(`https://www.instagram.com/direct/t/${instagramUsername}/`, '_blank');
    }).catch(() => {
      // Fallback if clipboard API fails - show message in alert
      alert(`Пожалуйста, скопируйте этот текст и отправьте в Instagram:\n\n${message}`);
      window.open(`https://www.instagram.com/direct/t/${instagramUsername}/`, '_blank');
    });
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
                        alt={item.product.ProductName}
                        className="w-12 h-12 object-cover rounded"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.product.ProductName}</p>
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
                  Чтобы завершить заказ, пожалуйста, свяжитесь с нами через Telegram или Instagram с деталями вашего заказа.
                </p>
                
                <div className="space-y-3">
                  <Button 
                    onClick={handleTelegramOrder}
                    className="w-full flex items-center gap-2 text-white border-0"
                    style={{ backgroundColor: '#000000' }}
                  >
                    <Send className="h-5 w-5" />
                    Заказать через Telegram
                  </Button>
                  
                  <Button 
                    onClick={handleInstagramOrder}
                    className="w-full flex items-center gap-2 text-white border-0"
                    style={{ backgroundColor: '#ec4899' }}
                  >
                    <Instagram className="h-5 w-5" />
                    Заказать через Instagram
                  </Button>
                </div>
                
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