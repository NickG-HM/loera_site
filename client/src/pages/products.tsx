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

      <div className="container mx-auto px-4 pt-20">
        <h1 className="text-3xl font-bold mb-8">Our Products</h1>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted aspect-square rounded-lg mb-4" />
                <div className="bg-muted h-4 rounded mb-2" />
                <div className="bg-muted h-4 w-2/3 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
