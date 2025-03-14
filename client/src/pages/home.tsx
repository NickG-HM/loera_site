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

      <div className="container mx-auto px-4 pt-20">
        <img
          src="https://images.unsplash.com/photo-1455849318743-b2233052fcff"
          alt="Shop Banner"
          className="w-full h-[300px] object-cover rounded-lg mb-8"
        />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Welcome to LOERA</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Discover our curated collection of premium products
          </p>
          <Link href="/products">
            <Button 
              size="lg"
              className="transform transition-all duration-500 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
            >
              See Products
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}