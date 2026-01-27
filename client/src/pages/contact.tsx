import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { Instagram, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand/";
  const telegramUsername = "elizz_16";

  const handleInstagramOrder = () => {
    window.open(`${instagramLink}`, '_blank');
  };

  const handleTelegramOrder = () => {
    window.open(`https://t.me/${telegramUsername}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pt-44 pb-12">
        <div className="max-w-md mx-auto">
          <Card className="bg-transparent border-transparent shadow-none">
            <CardHeader>
              <CardTitle className="text-center">Контакты</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground text-center">
                Если у вас есть вопросы, просто напишите нам. Мы с радостью на них ответим!
              </p>
              <p className="text-muted-foreground text-center">
              +375 25 505 97 03
              </p>
              <p className="text-muted-foreground text-center">
              Minsk, Belarus
              </p>
              
              <div className="space-y-3">
                <Button 
                  onClick={handleTelegramOrder}
                  className="w-full flex items-center gap-2 text-white border-0"
                  style={{ backgroundColor: '#000000' }}
                >
                  <Send className="h-5 w-5" />
                  Написать через Telegram
                </Button>
                
                <Button 
                  onClick={handleInstagramOrder}
                  className="w-full flex items-center gap-2 text-white border-0"
                  style={{ backgroundColor: '#ec4899' }}
                >
                  <Instagram className="h-5 w-5" />
                  Написать через Instagram
                </Button>
              </div>
              
              
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}