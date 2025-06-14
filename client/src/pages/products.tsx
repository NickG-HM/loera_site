import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { useParams } from "wouter";
import { useEffect } from "react";
import { getStaticProducts, getStaticProductsByCategory, searchStaticProducts } from "@/lib/staticData";

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
  let pageTitle = "СУМКИ";
  if (category) {
    pageTitle = category === "bags" 
      ? "СУМКИ" 
      : category === "cosmetic bags" 
      ? "КОСМЕТИЧКИ" 
      : category.toUpperCase();
  } else if (searchQuery) {
    pageTitle = `ПОИСК: ${searchQuery}`;
  }

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
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-[3/4] mb-4" />
                <div className="bg-gray-200 h-4 w-3/4 mb-2" />
                <div className="bg-gray-200 h-3 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}