import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { useCart } from "@/lib/cart";
import { Minus, Plus, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useCurrency } from "@/lib/currency";
import useEmblaCarousel from 'embla-carousel-react';
import { getStaticProduct } from "@/lib/staticData";

interface ImageGalleryProps {
  product: Product;
}

function ImageGallery({ product }: ImageGalleryProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  // Create gallery images array with main image first
  const galleryImages = [product.image, ...(product.gallery || [])];

  // Embla carousel setup for main images
  const [mainCarouselRef, mainCarouselApi] = useEmblaCarousel();
  const [thumbnailCarouselRef, thumbnailCarouselApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (mainCarouselApi) mainCarouselApi.scrollPrev();
  }, [mainCarouselApi]);

  const scrollNext = useCallback(() => {
    if (mainCarouselApi) mainCarouselApi.scrollNext();
  }, [mainCarouselApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (mainCarouselApi) mainCarouselApi.scrollTo(index);
    },
    [mainCarouselApi]
  );

  const onSelect = useCallback(() => {
    if (!mainCarouselApi || !thumbnailCarouselApi) return;
    setSelectedIndex(mainCarouselApi.selectedScrollSnap());
    setCanScrollPrev(mainCarouselApi.canScrollPrev());
    setCanScrollNext(mainCarouselApi.canScrollNext());
  }, [mainCarouselApi, thumbnailCarouselApi]);

  useEffect(() => {
    if (!mainCarouselApi) return;
    onSelect();
    mainCarouselApi.on("select", onSelect);
    mainCarouselApi.on("reInit", onSelect);
  }, [mainCarouselApi, onSelect]);

  // Sync thumbnail carousel with main carousel
  useEffect(() => {
    if (!thumbnailCarouselApi) return;
    thumbnailCarouselApi.scrollTo(selectedIndex);
  }, [selectedIndex, thumbnailCarouselApi]);

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Main Product Image Carousel */}
      <div className="relative overflow-hidden rounded-lg will-change-transform" ref={mainCarouselRef}>
        <div className="flex aspect-[5/7]"> {/* This line is changed */}
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              <img
                src={img}
                alt={`${product.name} view ${i + 1}`}
                className="w-full h-full object-cover"
                loading={i === 0 ? "eager" : "lazy"}
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                onClick={() => {
                  setCurrentImage(img);
                  setIsEnlarged(true);
                }}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-y-0 left-0 hidden md:flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm -ml-4 hover:bg-white transform transition-transform hover:scale-105"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="absolute inset-y-0 right-0 hidden md:flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm -mr-4 hover:bg-white transform transition-transform hover:scale-105"
            onClick={scrollNext}
            disabled={!canScrollNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Dots indicator for mobile */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="flex space-x-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === selectedIndex ? "bg-white" : "bg-white/40"
                }`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Thumbnail Navigation - Hidden on mobile, visible on tablet+ */}
      {galleryImages.length > 1 && (
        <div className="hidden sm:block overflow-hidden" ref={thumbnailCarouselRef}>
          <div className="flex space-x-2">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className={`flex-[0_0_20%] min-w-0 aspect-square border-2 rounded transition-all ${
                  i === selectedIndex
                    ? "border-primary opacity-100"
                    : "border-transparent opacity-60 hover:opacity-80"
                }`}
                onClick={() => scrollTo(i)}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover rounded"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <Button
              size="icon"
              variant="outline"
              className="absolute top-4 right-4 bg-white z-10"
              onClick={() => setIsEnlarged(false)}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <img
              src={currentImage}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
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

  // Use static data in production, API in development
  const queryFn = () => {
    if (import.meta.env.PROD) {
      return getStaticProduct(Number(id));
    } else {
      return fetch(`/api/products/${id}`).then(res => res.json());
    }
  };

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: [`/api/products/${id}`],
    queryFn: queryFn
  });

  // Add effect to scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity
    });
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="order-1">
            <ImageGallery product={product} />
          </div>

          {/* Product Details */}
          <div className="order-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <p className="text-2xl font-semibold text-primary">
                {formatPrice(product.price)}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Description</h3>
              <div className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quantity</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button 
              className="w-full py-6 text-lg font-semibold"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}