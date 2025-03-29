import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";
  const whatsappLink = "https://api.whatsapp.com/send/?phone=375255059703&type=phone_number&app_absent=0";

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-48">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-light mb-10 text-center">Контакты</h1>
          
          <div className="space-y-6">
            <div className="space-y-3 text-center">
              <p className="text-muted-foreground">Phone: +375 25 505 97 03</p>
              <p className="text-muted-foreground">Location: Minsk, Belarus</p>
            </div>
            
            <div className="space-y-4 pt-6">
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button 
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  WhatsApp
                </Button>
              </a>
              
              <a href={instagramLink} target="_blank" rel="noopener noreferrer">
                <Button 
                  variant="outline" 
                  className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                  Instagram
                </Button>
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Если у вас остались вопросы, мы с радостью на них ответим. Просто напишите на WhatsApp или в Instagram.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}