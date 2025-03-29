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
                variant="ghost"
                className="bg-transparent text-white hover:bg-transparent transform transition-all duration-500 ease-in-out hover:scale-[1.05] active:scale-[0.98] text-5xl py-8 px-12 font-ravenholm"
              >
                See Collection
              </Button>
            </Link>
          </div>
        </div>

        <div id="about" className="container mx-auto px-4 py-16 scroll-mt-24">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl mb-6 text-center font-ravenholm">ABOUT US</h1>
            <p className="text-base text-muted-foreground mb-8 text-left">
              Привет! Я Лиза, а это мой бренд сумочек и аксессуаров.  
              <br />
              Я всегда любила необычные и эксклюзивные аксессуары, которые задают образам стиль.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              В моём гардеробе постоянно были вещи, созданные мной: сумки, аксессуары, переделанные старые вещи.  
              <br />
              Желание создавать «для себя» постепенно переросло в желание создавать для друзей и знакомых, а позже — в бренд LOÉRA, который означает «оно было», отсылая к бесконечности самовыражения.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              В начале своего пути всё отшивала сама. Сейчас у меня есть помощница, которая помогает мне отшивать ваши заказы быстро и в срок.  
            </p>

            <p className="text-base text-muted-foreground mb-8 text-left">
              LOÉRA — это про уникальность и элегантность. За каждой сумочкой стоят часы кропотливого ручного труда: от разработки лекал до ровных строчек и финальной сборки.  
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