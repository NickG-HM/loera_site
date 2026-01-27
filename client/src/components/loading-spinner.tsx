interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function LoadingSpinner({ size = "md", className = "" }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-2",
    lg: "w-12 h-12 border-[3px]",
  };

  return (
    <div className={`flex items-center justify-center loading-spinner ${className}`}>
      <div className="relative loading-spinner">
        {/* Outer ring - explicitly circular */}
        <div
          className={`loading-spinner ${sizeClasses[size]} border-gray-200 animate-spin`}
          style={{
            borderTopColor: "#ec4899", // LOÉRA brand color
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        {/* Inner dot for more visual interest */}
        {size === "lg" && (
          <div className="absolute inset-0 flex items-center justify-center loading-spinner">
            <div 
              className="loading-spinner w-2 h-2 bg-pink-500 animate-pulse"
              style={{ borderRadius: "50%" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// Skeleton loader for product cards
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-200 aspect-[3/4] mb-4" />
      <div className="bg-gray-200 h-4 w-3/4 mb-2 mx-auto" />
      <div className="bg-gray-200 h-3 w-1/2 mx-auto" />
    </div>
  );
}

// Full page loader
export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-sm text-gray-500 font-light">Загрузка...</p>
      </div>
    </div>
  );
}
