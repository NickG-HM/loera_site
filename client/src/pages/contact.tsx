import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Instagram, MessageCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";
  const whatsappLink = "https://api.whatsapp.com/send/?phone=375255059703&type=phone_number&app_absent=0";

  const handleInstagramOrder = () => {
    window.open(`${instagramLink}`, '_blank');
  };

  const handleWhatsAppOrder = () => {
    window.open(`${whatsappLink}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pt-44 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-transparent border-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center">Завершить заказ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                Чтобы завершить заказ, пожалуйста, свяжитесь с нами через Instagram или WhatsApp с деталями вашего заказа.
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center gap-2 text-white border-0"
                  style={{ backgroundColor: '#ec4899' }}
                >
                  <MessageCircle className="h-5 w-5" />
                  Заказать через WhatsApp
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
              
              <div className="text-sm text-muted-foreground text-center">
                <p>Мы ответим на ваше сообщение с:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-left inline-block">
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
  );
}