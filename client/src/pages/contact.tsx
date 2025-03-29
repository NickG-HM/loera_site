import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Instagram } from "lucide-react";

export default function ContactPage() {
  const instagramLink = "https://www.instagram.com/loera.brand?igsh=MWJxbHA0Y3owbWR0bA==";
  const whatsappLink = "https://api.whatsapp.com/send/?phone=375255059703&type=phone_number&app_absent=0";

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-36">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-light mb-10 text-center">Contact Us</h1>
          
          <div className="space-y-8 max-w-md mx-auto">
            <div className="space-y-4 text-center">
              <p className="text-base text-muted-foreground">
                Our team is here to help with any questions about products, orders, or collaboration opportunities.
              </p>
              
              <div className="space-y-2 text-muted-foreground">
                <p>Phone: +375 25 505 97 03</p>
                <p>Location: Minsk, Belarus</p>
              </div>
            </div>
            
            <div className="flex flex-col space-y-4 pt-6">
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
                  Follow Us on Instagram
                </Button>
              </a>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Follow us on social media for the latest updates, new product announcements, and style inspirations.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}