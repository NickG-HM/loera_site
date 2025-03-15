import { createContext, useContext, useState, ReactNode } from "react";

type Currency = "USD" | "BYN" | "RUB";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: string) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const EXCHANGE_RATES = {
  USD: 1,
  BYN: 3.2,
  RUB: 90,
};

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const formatPrice = (priceUSD: string) => {
    const value = parseFloat(priceUSD) * EXCHANGE_RATES[currency];
    // Remove decimal places by rounding to nearest integer
    return `${currency} ${Math.round(value)}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice }}>
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