import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useState } from "react";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { total } = useCart();
  const { currency, setCurrency } = useCurrency();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
        <div className="container mx-auto px-4 h-16 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>

          {/* Center logo on mobile, left-aligned on desktop */}
          <div className="flex-1 flex justify-center md:justify-start">
            <Link href="/">
              <img 
                src="/attached_assets/Logo_LOERA_final.png" 
                alt="LOERA"
                className="h-8"
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
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-6 w-6" />
              {total > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {total}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Compact Overlay Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)}>
          <div className="fixed top-0 right-0 z-50 w-64" onClick={e => e.stopPropagation()}>
            <div className="bg-background shadow-lg h-auto rounded-bl-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Menu</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-2">
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                  </Button>
                </Link>
                <Link href="/category/electronics">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Electronics
                  </Button>
                </Link>
                <Link href="/category/accessories">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Accessories
                  </Button>
                </Link>
                <Link href="/category/jewelry">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Jewelry
                  </Button>
                </Link>

                <div className="pt-2 border-t mt-2">
                  <h3 className="text-xs font-medium mb-2">Currency</h3>
                  <div className="grid grid-cols-3 gap-1">
                    {["USD", "BYN", "RUB"].map((curr) => (
                      <Button
                        key={curr}
                        size="sm"
                        variant={currency === curr ? "default" : "outline"}
                        onClick={() => {
                          setCurrency(curr as "USD" | "BYN" | "RUB");
                          setIsMenuOpen(false);
                        }}
                      >
                        {curr}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}