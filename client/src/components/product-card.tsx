import { Product } from "@shared/schema";
import { Link } from "wouter";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <div className="group">
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer mb-4" style={{ aspectRatio: "3/4" }}>
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-transparent animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 animate-spin" style={{ borderRadius: 0 }}></div>
            </div>
          )}
          
          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-0 bg-transparent flex items-center justify-center">
              <div className="text-gray-400 text-sm">Image unavailable</div>
            </div>
          )}
          
          <img
            src={product.image}
            alt={product.CatalogueName}
            className={`object-cover w-full h-full transition-all duration-300 group-hover:opacity-90 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        </div>
      </Link>
      <div className="text-center space-y-2">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-normal text-gray-900 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
            {product.CatalogueName}
          </h3>
        </Link>
        <p className="text-sm text-gray-900 font-light">
          {product.priceBYN} BYN / {product.priceRUB} RUB
        </p>
      </div>
    </div>
  );
}