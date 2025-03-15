import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  return (
    <div className="min-h-screen pb-8">
      <Navigation />

      <div className="container mx-auto px-4 pt-20 max-w-4xl">
        <h1 className="text-lg mb-6">Our Products</h1>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-[3/4] mb-3" />
                <div className="bg-muted h-4 w-3/4 mb-2" />
                <div className="bg-muted h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}