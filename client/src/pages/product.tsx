import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { useCart } from "@/lib/cart";
import { Minus, Plus, ZoomIn, ZoomOut } from "lucide-react";
import { useState } from "react";
import { useCurrency } from "@/lib/currency";

interface ImageGalleryProps {
  mainImage: string;
  productName: string;
}

function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  // Generate dummy gallery images by adding query params to the main image
  const galleryImages = Array(4).fill(mainImage).map((img, i) => `${img}?v=${i}`);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square">
        <img
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover rounded-lg"
        />
        <Button
          size="icon"
          variant="outline"
          className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
          onClick={() => setIsEnlarged(true)}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

      {/* Thumbnail Gallery */}
      <div className="grid grid-cols-4 gap-2">
        {galleryImages.map((img, i) => (
          <div key={i} className="aspect-square">
            <img
              src={img}
              alt={`${productName} view ${i + 1}`}
              className="w-full h-full object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
            />
          </div>
        ))}
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full">
              <img
                src={mainImage}
                alt={productName}
                className="w-full h-full object-contain rounded-lg"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                onClick={() => setIsEnlarged(false)}
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`]
  });

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <div className="animate-pulse">
            <div className="bg-muted aspect-square rounded-lg mb-4" />
            <div className="bg-muted h-8 w-1/2 rounded mb-4" />
            <div className="bg-muted h-4 rounded mb-2" />
            <div className="bg-muted h-4 w-3/4 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 pt-20">
          <h1 className="text-2xl font-bold">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid md:grid-cols-2 gap-8">
          <ImageGallery mainImage={product.image} productName={product.name} />

          <div className="flex flex-col">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl font-bold mb-4">{formatPrice(product.price)}</p>
            <p className="text-muted-foreground mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              size="lg"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}