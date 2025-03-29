import { createContext, useContext, useState, ReactNode } from "react";
import { fixedPrices } from "./prices";

// Change type to only support BYN and RUB
type Currency = "BYN" | "RUB";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (productId: string) => string;
  getFixedPrice: (productId: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  // Set default currency to BYN
  const [currency, setCurrency] = useState<Currency>("BYN");

  // Format the price based on product ID and selected currency
  const formatPrice = (productId: string) => {
    const id = parseInt(productId, 10);
    if (fixedPrices[id] && fixedPrices[id][currency]) {
      return `${currency} ${fixedPrices[id][currency]}`;
    }
    return `${currency} 0`; // Fallback
  };

  // Get the fixed price for a product in the current currency
  const getFixedPrice = (productId: number) => {
    if (fixedPrices[productId] && fixedPrices[productId][currency]) {
      return fixedPrices[productId][currency];
    }
    return "0"; // Fallback
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, getFixedPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}