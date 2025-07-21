// MyContext.tsx
import React, { createContext, useContext, useState, type ReactNode } from 'react';

// Define types
interface CampaignContextType {
  value: string;
  setValue: (value: string) => void;
}

interface CampaignProviderProps {
  children: ReactNode;
}

// Create context
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Provider component
export const CampaignContextProvider = ({ children }: CampaignProviderProps) => {
  const [value, setValue] = useState<string>('intial value');

  return (
    <CampaignContext.Provider value={{ value, setValue }}>
      {children}
    </CampaignContext.Provider>
  );
};

// Custom hook
export const useCampaignContext = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaignContext must be used within CampaignContextProvider');
  }
  return context;
};