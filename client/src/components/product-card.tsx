import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@shared/schema";
import { Link } from "wouter";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <Card className="overflow-hidden">
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square relative cursor-pointer">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full hover:scale-105 transition-transform"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground line-clamp-2 text-sm mt-2">
          {product.description}
        </p>
        <p className="text-lg font-bold mt-2">{formatPrice(product.price)}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          onClick={() => addToCart(product, 1)}
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}