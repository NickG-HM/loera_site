import { useQuery } from "@tanstack/react-query";
import { Product } from "@shared/schema";
import { useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { BackButton } from "@/components/back-button";
import { useCart } from "@/lib/cart";
import { Minus, Plus, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from 'embla-carousel-react';
import { getStaticProduct } from "@/lib/staticData";
import { LoadingSpinner } from "@/components/loading-spinner";

interface ImageGalleryProps {
  product: Product;
}

function ImageGallery({ product }: ImageGalleryProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [imageLoadStates, setImageLoadStates] = useState<Record<number, boolean>>({});
  const [imageErrorStates, setImageErrorStates] = useState<Record<number, boolean>>({});

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
      if (mainCarouselApi) {
        mainCarouselApi.scrollTo(index);
        // Immediately update selectedIndex for instant visual feedback
        setSelectedIndex(index);
      }
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

  const handleImageLoad = (index: number) => {
    setImageLoadStates(prev => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setImageErrorStates(prev => ({ ...prev, [index]: true }));
  };

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Main Product Image Carousel */}
      <div className="relative overflow-hidden will-change-transform" ref={mainCarouselRef}>
        <div className="flex aspect-[5/7]">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              {/* Loading placeholder */}
              {!imageLoadStates[i] && !imageErrorStates[i] && (
                <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              )}
              
              {/* Error placeholder */}
              {imageErrorStates[i] && (
                <div className="absolute inset-0 bg-transparent flex items-center justify-center">
                  <div className="text-gray-400">Image unavailable</div>
                </div>
              )}
              
              <img
                src={img}
                alt={`${product.ProductName} view ${i + 1}`}
                className={`w-full h-full object-cover transition-opacity duration-300 ${
                  imageLoadStates[i] ? 'opacity-100' : 'opacity-0'
                }`}
                loading={i === 0 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={i === 0 ? "high" : "auto"}
                onLoad={() => handleImageLoad(i)}
                onError={() => handleImageError(i)}
                sizes="(max-width: 768px) 100vw, 50vw"
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
      </div>

      {/* Image Gallery - Centered scrollable row for all */}
      {galleryImages.length > 1 && (
        <div className="flex justify-center">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                className={`aspect-square border-2 transition-all overflow-hidden flex-shrink-0 w-24 ${
                  i === selectedIndex
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                style={{ borderRadius: 0, backgroundColor: 'transparent' }}
                onClick={() => scrollTo(i)}
              >
                <img
                  src={img}
                  alt={`${product.ProductName} thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                  style={{ borderRadius: 0 }}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                  sizes="96px"
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
              alt={product.ProductName}
              className="max-w-full max-h-full object-contain"
              loading="eager"
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
        <BackButton />
        <div className="container mx-auto px-4 pt-60 pb-32">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <LoadingSpinner size="lg" />
              <p className="mt-4 text-sm text-gray-500 font-light">Загрузка товара...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <BackButton />
        <div className="container mx-auto px-4 pt-60 pb-32">
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
      <BackButton />
      <div className="container mx-auto px-4 pt-60 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Product Images */}
          <div className="order-1">
            <ImageGallery product={product} />
          </div>

          {/* Product Details */}
          <div className="order-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.ProductName}</h1>
              <p className="text-2xl font-semibold text-primary">
                BYN {product.priceBYN} / RUB {product.priceRUB}
              </p>
            </div>

            <div className="space-y-4">
              <div className="text-muted-foreground whitespace-pre-line">
                {product.description}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-2">
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
              className="w-full py-6 text-lg font-semibold text-white border-0"
              style={{ backgroundColor: '#ec4899' }}
              onClick={handleAddToCart}
            >
              Добавить в корзину
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}