import { useState, useEffect } from "react";

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
  const [currentSrc, setCurrentSrc] = useState(src);

  // Generate WebP version path
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const hasWebPVersion = src.match(/\.(jpg|jpeg|png)$/i);

  useEffect(() => {
    // Reset states when src changes
    setImageLoaded(false);
    setImageError(false);
    setCurrentSrc(src);
  }, [src]);

  // Check if WebP is supported and if we have a WebP version
  useEffect(() => {
    if (!hasWebPVersion) return;

    const checkWebPSupport = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1;
      canvas.height = 1;
      return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    };

    const checkWebPExists = async (webpPath: string) => {
      try {
        const response = await fetch(webpPath, { method: 'HEAD' });
        return response.ok;
      } catch {
        return false;
      }
    };

    if (checkWebPSupport()) {
      checkWebPExists(webpSrc).then(exists => {
        if (exists) {
          setCurrentSrc(webpSrc);
        }
      });
    }
  }, [src, webpSrc, hasWebPVersion]);

  const handleLoad = () => {
    setImageLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    // If WebP failed, try original format
    if (currentSrc === webpSrc && currentSrc !== src) {
      setCurrentSrc(src);
      return;
    }
    
    setImageError(true);
    onError?.();
  };

  // Preload critical images
  useEffect(() => {
    if (priority || loading === "eager") {
      const img = new Image();
      img.src = currentSrc;
      img.onload = handleLoad;
      img.onerror = handleError;
    }
  }, [currentSrc, priority, loading]);

  return (
    <div className="relative">
      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error placeholder */}
      {imageError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Image unavailable</div>
        </div>
      )}
      
      <img
        src={currentSrc}
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
    </div>
  );
} 