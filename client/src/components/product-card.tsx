import { Card } from "@/components/ui/card";
import { Product } from "@shared/schema";
import { Link } from "wouter";
import { useCurrency } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { formatPrice } = useCurrency();

  return (
    <Card className="overflow-hidden border-none shadow-none">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transform transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      <div className="pt-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-base text-foreground/90 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-base text-foreground/90 mt-1">{formatPrice(product.price)}</p>
      </div>
    </Card>
  );
}