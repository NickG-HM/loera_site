import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export function BackButton() {
  const [location, setLocation] = useLocation();
  
  // Don't show back button on home page
  if (location === "/") {
    return null;
  }

  const handleBack = () => {
    // Try to go back in history, fallback to home
    if (window.history.length > 1) {
      window.history.back();
    } else {
      setLocation("/");
    }
  };

  return (
    <Button
      variant="ghost"
      className="fixed top-[122px] left-4 z-40 bg-transparent hover:bg-white/10 text-foreground backdrop-blur-sm"
      onClick={handleBack}
    >
      <ChevronLeft className="h-4 w-4 mr-1" />
      назад
    </Button>
  );
} 