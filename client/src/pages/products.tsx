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
      <Navigation logoClassName="h-12 transform scale-130" />
      <div className="container mx-auto px-4 pt-36 max-w-4xl">
        <h1 className="text-2xl tracking-wider text-center mb-4 font-light">COLLECTION</h1>
        <p className="text-sm text-center mb-24 text-muted-foreground font-light">
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