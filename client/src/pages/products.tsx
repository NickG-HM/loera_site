import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { useParams } from "wouter";
import { useEffect, useMemo } from "react";
import { getStaticProducts, getStaticProductsByCategory, searchStaticProducts } from "@/lib/staticData";
import { FixedSizeGrid as Grid } from "react-window";
import { ProductCardSkeleton } from "@/components/loading-spinner";

export default function ProductsPage() {
  const params = useParams();
  const category = params?.category;
  const searchQuery = params?.query;
  
  // Prevent autoscroll by scrolling to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const queryKey = category 
    ? [`/api/products/category/${category}`]
    : searchQuery 
    ? [`/api/products/search/${searchQuery}`]
    : ["/api/products"];
    
  // Use static data in production (GitHub Pages), API in development
  const queryFn = () => {
    if (import.meta.env.PROD) {
      if (category) {
        return getStaticProductsByCategory(category);
      } else if (searchQuery) {
        return searchStaticProducts(searchQuery);
      } else {
        return getStaticProducts();
      }
    } else {
      // Development - use API
      const endpoint = category 
        ? `/api/products/category/${category}`
        : searchQuery 
        ? `/api/products/search/${searchQuery}`
        : "/api/products";
      return fetch(endpoint).then(res => res.json());
    }
  };
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: queryKey,
    queryFn: queryFn
  });
  
  // Set page title based on current view
  let pageTitle = "ВСЯ КОЛЛЕКЦИЯ";
  if (category) {
    pageTitle = category === "bags" 
      ? "СУМКИ" 
      : category === "cosmetic bags" 
      ? "КОСМЕТИЧКИ" 
      : category === "нижнее белье"
      ? "НИЖНЕЕ БЕЛЬЕ"
      : category.toUpperCase();
  } else if (searchQuery) {
    pageTitle = `ПОИСК: ${searchQuery}`;
  }

  // Virtualization setup - only use if we have many products
  const useVirtualization = (products?.length || 0) > 20;
  const containerWidth = 384; // max-w-md = 384px
  const columnCount = 2;
  const columnWidth = (containerWidth - 48) / columnCount; // 48px for padding
  const rowHeight = 400; // Approximate height per product card
  const rowCount = useVirtualization && products 
    ? Math.ceil(products.length / columnCount)
    : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <BackButton />
      <div className="container mx-auto px-6 pt-60 pb-16 max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-xl font-normal tracking-[0.2em] text-gray-900 mb-3">
            {pageTitle}
          </h1>
          <p className="text-sm text-gray-500 font-light">
            ({products?.length || 0} Items)
          </p>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : useVirtualization && products ? (
          <div style={{ height: rowCount * rowHeight, width: containerWidth }}>
            <Grid
              columnCount={columnCount}
              columnWidth={columnWidth}
              height={rowCount * rowHeight}
              rowCount={rowCount}
              rowHeight={rowHeight}
              width={containerWidth}
              style={{ overflowX: 'hidden' }}
            >
              {({ columnIndex, rowIndex, style }) => {
                const index = rowIndex * columnCount + columnIndex;
                const product = products[index];
                if (!product) return null;
                return (
                  <div style={{ ...style, padding: '12px' }}>
                    <ProductCard product={product} priority={index < 4} />
                  </div>
                );
              }}
            </Grid>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {products?.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                priority={index < 4} // Prioritize first 4 images (above fold)
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}