import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { useState, useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

export default function Home() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  // Use correct image path for GitHub Pages
  const mainImagePath = "/images/main_page.jpeg";

  // Preload the main image
  useEffect(() => {
    const img = new Image();
    img.src = mainImagePath;
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
  }, [mainImagePath]);

  return (
    <div className="min-h-screen pb-20">
      <Navigation />

      <div className="relative" style={{ marginTop: '112px' }}>
        <div className="relative w-full h-[calc(100vh-112px)] min-h-[450px] overflow-hidden">
          {/* Main photo - back layer */}
          <img
            src={mainImagePath}
            alt="LOERA"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            sizes="100vw"
            style={{ zIndex: 1 }}
          />
          
          {/* NEW Banner - front layer, overlaying at the top of main image */}
          {/* To change font size, modify the text-4xl class below (options: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl, text-3xl, text-4xl, etc.) */}
          <Link href="/category/нижнее белье">
            <div className="absolute top-0 left-0 right-0 z-20 bg-white hover:bg-gray-50 transition-colors cursor-pointer flex items-center justify-center text-pink-500 text-3xl font-medium" style={{ height: '1.5cm' }}>
              NEW: нижнее белье
            </div>
          </Link>
          
          {/* Loading placeholder - always centered */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center z-30">
              <div className="flex flex-col items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            </div>
          )}
          
          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-30">
              <div className="text-gray-400 text-xl">Image unavailable</div>
            </div>
          )}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Link href="/products">
              <Button 
                size="lg"
                variant="ghost"
                className="bg-transparent text-white hover:bg-transparent transform transition-all duration-500 ease-in-out hover:scale-[1.05] active:scale-[0.98] text-5xl py-8 px-12"
              >
                See Collection
              </Button>
            </Link>
          </div>
        </div>

        <div id="about" className="container mx-auto px-4 py-16 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-muted-foreground mb-8 text-left">
              Привет! Я Лиза, а это мой бренд сумочек и аксессуаров.  
              <br />
              Я всегда любила необычные и эксклюзивные аксессуары, которые задают образам стиль.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              В моём гардеробе постоянно были вещи, созданные мной: сумки, аксессуары, переделанные старые вещи.  
              <br />
              Желание создавать «для себя» постепенно переросло в желание создавать для друзей и знакомых, а позже в бренд LOÉRA, который означает «оно было», отсылая к бесконечности самовыражения.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              В начале своего пути всё отшивала сама. Сейчас у меня есть помощница, которая помогает мне отшивать ваши заказы быстро и в срок.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              LOÉRA, это про уникальность и элегантность. За каждой сумочкой стоят часы кропотливого ручного труда: от разработки лекал до ровных строчек и финальной сборки.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              Мы создаем эстетичные и функциональные аксессуары для тех, кто ценит уникальность и качество. Наши сумочки добавят характер вашему образу — ведь каждая из них создана, чтобы подчеркнуть вашу индивидуальность.
            </p>

            <p className="text-base text-muted-foreground mb-8 text-center">
              Добро пожаловать в LOÉRA!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}