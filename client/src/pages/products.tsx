import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { ProductCard } from "@/components/product-card";
import { Navigation } from "@/components/navigation";

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"]
  });

  return (
    <div className="min-h-screen">
      <Navigation logoClassName="h-12 transform scale-150" />
      <div className="container mx-auto px-4 pt-24 max-w-4xl">
        <h1 className="text-xl tracking-wider text-center mb-24">COLLECTION</h1>

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