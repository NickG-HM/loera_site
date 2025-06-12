import { Product } from "@shared/schema";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer mb-4" style={{ aspectRatio: "3/4" }}>
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full transition-opacity duration-300 group-hover:opacity-90"
          />
        </div>
      </Link>
      <div className="text-center space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-normal text-gray-900 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-900 font-light">
          {product.priceBYN} BYN / {product.priceRUB} RUB
        </p>
      </div>
    </div>
  );
}