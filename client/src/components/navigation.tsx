import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { CartItem } from "@shared/schema";

interface NavigationProps {
  logoClassName?: string;
}

function getLocalCart(): CartItem[] {
  try {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  } catch {
    return [];
  }
}

export function Navigation({ logoClassName }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [location, setLocation] = useLocation();

  // Get cart items to calculate total
  const { data: cartItems = [] } = useQuery<CartItem[]>({
    queryKey: ["/api/cart"],
    queryFn: () => {
      if (import.meta.env.PROD) {
        return Promise.resolve(getLocalCart());
      } else {
        return fetch("/api/cart").then(res => res.json());
      }
    }
  });

  const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background">
        <div className="container mx-auto px-4 h-24 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="menu-button md:hidden text-black hover:bg-transparent"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          <div className="flex-1 flex justify-center">
            <Link href="/">
              <img 
                src="/Logo_LOERA_final.png" 
                alt="LOERA"
                className={logoClassName || "h-10 w-auto hover:opacity-80 transition-opacity"}
              />
            </Link>
          </div>

          <div className="flex-1 max-w-sm mx-4 hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-9"
                onChange={(e) => {
                  const query = e.target.value;
                  if (query) {
                    setLocation(`/search/${query}`);
                  }
                }}
              />
            </div>
          </div>

          <Link href="/cart">
            <Button 
              variant="ghost" 
              size="icon"
              className="menu-button relative text-black hover:bg-transparent transform transition-transform duration-300 hover:scale-110 active:scale-95"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-6 w-6 text-black" />
              {total > 0 && (
                <span className="absolute -top-1 -right-1 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center transform transition-transform duration-300 hover:scale-110" style={{ backgroundColor: '#ec4899' }}>
                  {total}
                </span>
              )}
            </Button>
          </Link>
        </div>
        <div className="h-4 border-b"></div>
      </nav>

      {location === "/products" && (
        <div className="container mx-auto px-4 py-4 text-center">
          <h2 className="text-3xl font-light">COLLECTION</h2>
        </div>
      )}


      {/* Animated Overlay Menu */}
      <div 
        className={`fixed inset-0 z-50 transition-opacity duration-500 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        <div 
          className={`fixed top-0 left-0 z-50 w-64 h-auto bg-white shadow-lg transition-transform duration-500 ease-in-out transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-semibold text-black">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(false)}
                className="menu-button text-black hover:bg-transparent"
              >
                <X className="h-4 w-4 text-black" />
              </Button>
            </div>

            <div className="menu-container space-y-0">
              <div className="mb-6">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Главная
                  </Button>
                </Link>
              </div>
              
              <div className="mb-6">
                <Button
                  variant="ghost"
                  className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black"
                  onClick={() => {
                    setIsMenuOpen(false);
                    // If we're on the home page, scroll to the about section
                    if (location === "/") {
                      document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                    } else {
                      // If we're not on the home page, navigate to home and then scroll to about
                      setLocation("/");
                      // Use a timeout to ensure navigation completes before scrolling
                      setTimeout(() => {
                        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                >
                  О нас
                </Button>
              </div>

              <div className="mb-6">
                <Button
                  variant="ghost"
                  className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black"
                  onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                >
                  Каталог
                </Button>
                
                {isCatalogOpen && (
                  <div className="mt-3 space-y-3">
                    <Link href="/category/bags">
                      <Button
                        variant="ghost"
                        className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black pl-8"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Сумки
                      </Button>
                    </Link>
                    <Link href="/category/cosmetic bags">
                      <Button
                        variant="ghost"
                        className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black pl-8"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Косметички
                      </Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <Link href="/delivery">
                  <Button
                    variant="ghost"
                    className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Доставка
                  </Button>
                </Link>
              </div>

              <div className="mb-0">
                <Link href="/contact">
                  <Button
                    variant="ghost"
                    className="menu-button w-full justify-start text-sm font-normal text-black hover:bg-transparent hover:text-black"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Контакты
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}