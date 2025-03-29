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
    <Card className="overflow-hidden border-none shadow-none rounded-none">
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer" style={{ aspectRatio: "5/6.3" }}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full rounded-none"
          />
        </div>
      </Link>
      <div className="mt-3 space-y-1">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm text-foreground/90 hover:text-primary/90 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-foreground/90">{formatPrice(product.id.toString())}</p>
      </div>
    </Card>
  );
}