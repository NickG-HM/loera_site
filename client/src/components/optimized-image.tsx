import { useState, useEffect } from "react";
import { LoadingSpinner } from "./loading-spinner";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
  sizes?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

export function OptimizedImage({
  src,
  alt,
  className = "",
  loading = "lazy",
  sizes,
  onLoad,
  onError,
  priority = false
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Generate WebP version path (assumes WebP files exist at build time)
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebPVersion = src.match(/\.(jpg|jpeg|png)$/i);

  useEffect(() => {
    // Reset states when src changes
    setImageLoaded(false);
    setImageError(false);
  }, [src]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setImageError(true);
    onError?.();
  };

  // Preload critical images
  useEffect(() => {
    if (priority || loading === "eager") {
      const img = new Image();
      img.src = hasWebPVersion ? webpSrc : src;
      img.onload = handleLoad;
      img.onerror = () => {
        // If WebP fails, try original
        if (hasWebPVersion) {
          const fallbackImg = new Image();
          fallbackImg.src = src;
          fallbackImg.onload = handleLoad;
          fallbackImg.onerror = handleError;
        } else {
          handleError();
        }
      };
    }
  }, [src, webpSrc, hasWebPVersion, priority, loading]);

  return (
    <div className="relative">
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center">
          <LoadingSpinner size="md" />
        </div>
      )}
      
      {/* Error placeholder */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Image unavailable</div>
        </div>
      )}
      
      {/* Use picture element for WebP with fallback - more efficient than HEAD requests */}
      {hasWebPVersion ? (
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img
            src={src}
            alt={alt}
            className={`transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            } ${className}`}
            loading={loading}
            decoding="async"
            sizes={sizes}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      ) : (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          loading={loading}
          decoding="async"
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
} 