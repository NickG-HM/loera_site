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
      
      {/* Perfect centering container - accounting for fixed navigation */}
      <div className="flex justify-center items-center" style={{ minHeight: 'calc(100vh - 112px)', marginTop: '112px' }}>
        <div className="w-full max-w-md mx-auto px-4">
          <div className="text-center space-y-8">
            <h1 className="text-3xl font-light mb-10">Контакты</h1>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg mb-6">
                  Если у вас есть вопросы,<br />просто напишите нам.
                  <br />
                  Мы с радостью на них ответим!
                </p>
                
                <div className="space-y-2">
                  <p>+375 25 505 97 03</p>
                  <p>Minsk, Belarus</p>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4 pt-6">
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button 
                    className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-green-500 hover:bg-green-600 text-white border-0"
                  >
                    Заказать WhatsApp
                  </Button>
                </a>
                
                <a href={instagramLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button 
                    className="w-full transform transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 hover:from-purple-600 hover:via-pink-600 hover:to-orange-500 text-white border-0"
                  >
                    Заказать Instagram
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}