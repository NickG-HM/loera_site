import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";
  const whatsappLink = "https://api.whatsapp.com/send/?phone=375255059703&type=phone_number&app_absent=0";

  return (
    <div className="min-h-screen">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-4 pt-44 pb-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light mb-10 text-center">Контакты</h1>
          
          <div className="space-y-8 max-w-md mx-auto">
            <div className="space-y-4 text-center">
              <p className="text-lg mb-6">
                Если у вас есть вопросы, просто напишите нам.
                <br />
                Мы с радостью на них ответим!
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <p>+375 25 505 97 03</p>
                <p>Minsk, Belarus</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 pt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Заказать WhatsApp
                </Button>
              </a>
              
              <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline"
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Заказать Instagram
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}