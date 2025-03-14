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

interface ImageGalleryProps {
  mainImage: string;
  productName: string;
}

function ImageGallery({ mainImage, productName }: ImageGalleryProps) {
  const [isEnlarged, setIsEnlarged] = useState(false);
  const [currentImage, setCurrentImage] = useState(mainImage);
  const galleryImages = [
    mainImage,
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1596460107916-430662021049",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
  ];

  const [mainCarouselRef, mainEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: true,
  });

  const [thumbCarouselRef, thumbEmblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    dragFree: true,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollPrev();
  }, [mainEmblaApi]);

  const scrollNext = useCallback(() => {
    if (mainEmblaApi) mainEmblaApi.scrollNext();
  }, [mainEmblaApi]);

  const onSelect = useCallback(() => {
    if (!mainEmblaApi || !thumbEmblaApi) return;

    setSelectedIndex(mainEmblaApi.selectedScrollSnap());
    thumbEmblaApi.scrollTo(mainEmblaApi.selectedScrollSnap());

    setCanScrollPrev(mainEmblaApi.canScrollPrev());
    setCanScrollNext(mainEmblaApi.canScrollNext());
  }, [mainEmblaApi, thumbEmblaApi]);

  useEffect(() => {
    if (!mainEmblaApi || !thumbEmblaApi) return;

    onSelect();
    mainEmblaApi.on('select', onSelect);
    thumbEmblaApi.on('select', onSelect);
  }, [mainEmblaApi, thumbEmblaApi, onSelect]);

  return (
    <div className="space-y-4 overflow-hidden">
      {/* Main Product Image Carousel */}
      <div className="relative overflow-hidden rounded-lg will-change-transform" ref={mainCarouselRef}>
        <div className="flex aspect-[4/3] md:aspect-[16/9]">
          {galleryImages.map((img, i) => (
            <div 
              key={i}
              className="flex-[0_0_100%] min-w-0 relative"
            >
              <img
                src={img}
                alt={`${productName} view ${i + 1}`}
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
      </div>

      {/* Thumbnail Carousel */}
      <div className="h-24 px-2 will-change-transform" ref={thumbCarouselRef}>
        <div className="flex gap-2">
          {galleryImages.map((img, i) => (
            <div 
              key={i} 
              className="flex-[0_0_20%] min-w-0 relative aspect-square cursor-pointer"
              onClick={() => {
                if (mainEmblaApi) mainEmblaApi.scrollTo(i);
                setCurrentImage(img);
              }}
            >
              <img
                src={img}
                alt={`${productName} view ${i + 1}`}
                className={`w-full h-full object-cover rounded-sm transition-all duration-300 transform ${
                  selectedIndex === i 
                    ? 'ring-2 ring-primary scale-95' 
                    : 'opacity-60 hover:opacity-100 hover:scale-95'
                }`}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Enlarged Image Modal */}
      {isEnlarged && (
        <div 
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-500"
          onClick={() => setIsEnlarged(false)}
        >
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div 
              className="relative max-w-4xl w-full transform transition-transform duration-500 ease-in-out"
              style={{ 
                transform: isEnlarged ? 'scale(1)' : 'scale(0.9)',
                opacity: isEnlarged ? 1 : 0 
              }}
            >
              <img
                src={currentImage}
                alt={productName}
                className="w-full h-full object-contain rounded-lg"
              />
              <Button
                size="icon"
                variant="outline"
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEnlarged(false);
                }}
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
        <div className="max-w-5xl mx-auto">
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
    </div>
  );
}