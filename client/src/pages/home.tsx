import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="min-h-screen pb-8">
      <Navigation />

      <div className="pt-20 relative">
        <div className="relative w-full h-[calc(100vh-80px)] min-h-[450px] overflow-hidden">
          <img
            src="/images/main_page.png"
            alt="LOERA"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Link href="/products">
              <Button 
                size="lg"
                variant="default"
                className="bg-black text-white hover:bg-black/90 transform transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                See Products
              </Button>
            </Link>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 text-center">ABOUT US</h1>
            <p className="text-lg text-muted-foreground mb-8 text-center">
              Everything started when...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}