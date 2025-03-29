import { useEffect, useState } from 'react';
import { productsData } from '@/lib/staticData';

export function ImagePreloader() {
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  useEffect(() => {
    const imagePaths = productsData.map(product => product.image);
    const imageLoadStates: Record<string, boolean> = {};
    
    // Initialize all images as not loaded
    imagePaths.forEach(path => {
      imageLoadStates[path] = false;
    });
    
    setLoadedImages(imageLoadStates);
    
    // Preload all images
    const preloadImages = async () => {
      const imagePromises = imagePaths.map(imagePath => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          
          img.onload = () => {
            setLoadedImages(prev => ({ ...prev, [imagePath]: true }));
            resolve();
          };
          
          img.onerror = () => {
            console.error(`Failed to load image: ${imagePath}`);
            setLoadedImages(prev => ({ ...prev, [imagePath]: false }));
            resolve();
          };
          
          // Use absolute or relative path as needed
          img.src = imagePath;
        });
      });
      
      await Promise.all(imagePromises);
      setLoadingComplete(true);
    };
    
    preloadImages();
  }, []);
  
  if (!loadingComplete) {
    return null; // Don't show anything while loading
  }
  
  // Count number of loaded and failed images
  const loadedCount = Object.values(loadedImages).filter(loaded => loaded).length;
  const failedCount = Object.values(loadedImages).filter(loaded => !loaded).length;
  
  // If all images loaded correctly, don't show anything
  if (failedCount === 0) {
    return null;
  }
  
  // Only show if there are some failed images
  return (
    <div className="fixed bottom-4 right-4 bg-red-100 p-3 rounded-md text-red-800 shadow-lg z-50 text-sm">
      <h3 className="font-bold">Image Loading Status</h3>
      <p>Loaded: {loadedCount} images</p>
      <p>Failed: {failedCount} images</p>
      
      {failedCount > 0 && (
        <div className="mt-2 max-h-40 overflow-y-auto">
          <p className="font-bold">Failed images:</p>
          <ul className="text-xs">
            {Object.entries(loadedImages)
              .filter(([_, loaded]) => !loaded)
              .map(([path]) => (
                <li key={path} className="truncate">{path}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}