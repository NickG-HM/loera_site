import { Product } from "@shared/schema";
import { Link } from "wouter";
import { useState, useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { getStaticProduct } from "@/lib/staticData";
import { LoadingSpinner } from "@/components/loading-spinner";

interface ProductCardProps {
  product: Product;
  priority?: boolean; // For above-the-fold images
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const hasImage = product.image && product.image.trim() !== "";
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(!hasImage);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || !containerRef.current) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: "100px" } // Start loading 100px before entering viewport
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [priority]);

  // Prefetch product data on hover
  const handleMouseEnter = () => {
    if (import.meta.env.PROD) {
      queryClient.prefetchQuery({
        queryKey: [`/api/products/${product.id}`],
        queryFn: () => getStaticProduct(product.id),
      });
    } else {
      queryClient.prefetchQuery({
        queryKey: [`/api/products/${product.id}`],
        queryFn: () => fetch(`/api/products/${product.id}`).then(res => res.json()),
      });
    }
    // Also preload the product page images (only if they exist)
    if (hasImage) {
      const galleryImages = [product.image, ...(product.gallery || [])].filter(img => img && img.trim() !== "");
      galleryImages.forEach((imgSrc) => {
        const img = new Image();
        img.src = imgSrc;
      });
    }
  };

  return (
    <div className="group" onMouseEnter={handleMouseEnter} ref={containerRef}>
      <Link href={`/product/${product.id}`}>
        <div className="relative cursor-pointer mb-4" style={{ aspectRatio: "3/4" }}>
          {/* Loading placeholder */}
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <LoadingSpinner size="md" />
            </div>
          )}
          
          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Image unavailable</div>
            </div>
          )}
          
          {isInView && hasImage && !imageError && (
            <img
              src={product.image}
              alt={product.CatalogueName || "Product image"}
              className={`object-cover w-full h-full transition-all duration-300 group-hover:opacity-90 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={priority ? "high" : "auto"}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          )}
        </div>
      </Link>
      <div className="text-center space-y-2 min-h-[60px]">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-normal text-gray-900 leading-tight hover:text-gray-600 transition-colors cursor-pointer">
            {product.CatalogueName || "\u00A0"}
          </h3>
        </Link>
        <p className="text-sm text-gray-900 font-light">
          {product.priceBYN || "0"} BYN / {product.priceRUB || "0"} RUB
        </p>
      </div>
    </div>
  );
}