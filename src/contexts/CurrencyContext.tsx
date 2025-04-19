
import React, { createContext, useContext, useState } from 'react';

type Currency = 'CAD' | 'USD';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Using a fixed exchange rate for demo. In production, you'd want to fetch real-time rates
const USD_TO_CAD_RATE = 1.35;

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('CAD');

  const convertPrice = (priceCAD: number) => {
    if (currency === 'CAD') return priceCAD;
    return Number((priceCAD / USD_TO_CAD_RATE).toFixed(2));
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convertPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
