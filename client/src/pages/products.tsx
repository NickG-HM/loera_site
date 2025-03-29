import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";
import { useParams } from "wouter";

export default function ProductsPage() {
  const params = useParams();
  const category = params?.category;
  const searchQuery = params?.query;
  
  const queryKey = category 
    ? [`/api/products/category/${category}`]
    : searchQuery 
    ? [`/api/products/search/${searchQuery}`]
    : ["/api/products"];
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: queryKey
  });
  
  // Set page title based on current view
  let pageTitle = "COLLECTION";
  if (category) {
    pageTitle = category === "bags" 
      ? "BAGS" 
      : category === "cosmetic bags" 
      ? "COSMETIC BAGS" 
      : category.toUpperCase();
  } else if (searchQuery) {
    pageTitle = `SEARCH: ${searchQuery}`;
  }

  return (
    <div className="min-h-screen">
      <Navigation logoClassName="h-12 transform scale-130" />
      <div className="container mx-auto px-4 pt-36 max-w-4xl">
        <h1 className="text-2xl tracking-wider text-center mb-4 font-light">{pageTitle}</h1>
        <p className="text-sm text-center mb-10 text-muted-foreground font-light">
          ({products?.length || 0} items)
        </p>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-[3/4] mb-4 rounded-none" />
                <div className="bg-muted h-4 w-3/4 mb-3 rounded-none" />
                <div className="bg-muted h-4 w-1/2 rounded-none" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-12">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}