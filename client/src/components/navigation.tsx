import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, ShoppingCart, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useLocation } from "wouter";
import { useCart } from "@/lib/cart";

export function Navigation() {
  const [location, setLocation] = useLocation();
  const { total } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col gap-4 mt-8">
                <Link href="/">
                  <Button variant="ghost" className="w-full justify-start">
                    Home
                  </Button>
                </Link>
                <Link href="/category/electronics">
                  <Button variant="ghost" className="w-full justify-start">
                    Electronics
                  </Button>
                </Link>
                <Link href="/category/accessories">
                  <Button variant="ghost" className="w-full justify-start">
                    Accessories
                  </Button>
                </Link>
                <Link href="/category/jewelry">
                  <Button variant="ghost" className="w-full justify-start">
                    Jewelry
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/">
            <h1 className="text-xl font-bold">ShopApp</h1>
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
  );
}
