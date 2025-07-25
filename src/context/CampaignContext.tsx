// MyContext.tsx
import { createContext, useContext, useState, type ReactNode } from 'react';

// Define types
interface CampaignContextType {
  value: string;
  setValue: (value: string) => void;
  pin: string;
  setPin: (pin: string) => void;
}

interface CampaignProviderProps {
  children: ReactNode;
}

// Create context
const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

// Provider component
export const CampaignContextProvider = ({ children }: CampaignProviderProps) => {
  const [value, setValue] = useState<string>('intial value');

  const [pin, setPin] = useState<string>('');

  const values = {
    value,
    setValue,
    pin,
    setPin,
  }

  return (
    <CampaignContext.Provider value={{...values}}>
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