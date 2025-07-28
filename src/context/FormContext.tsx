import React, { createContext, useContext } from "react";
import { useForm, FormProvider } from "react-hook-form";
import type { Action, Colors, Conditions, GameType, Gift, Profile } from "../types/CampaignType";

// Définition du type pour les données du formulaire
export interface CampaignFormData {
  id: string;
  profile: Profile;
  configuration: {
    actions: Action[]; // ou un type plus spécifique selon vos besoins
    colors: Colors;
    disabled: boolean;
    game_type: GameType; // ou autres types de jeux
    gifts: Gift[]; // ou un type plus spécifique
    retrievalConditions: Conditions[]; // ou un type plus spécifique
    logo_uri: string;
  };
  created_at: string;
  created_by: string;
  enabled: boolean;
  label: string;
  placeId: string;
  updated_at: string;
  updated_by: string;
}

// Type pour le contexte (toutes les méthodes de React Hook Form)
type FormMethodsContextType = UseFormReturn<CampaignFormData>;

const FormMethodsContext = createContext<FormMethodsContextType | undefined>(undefined);

export const useFormMethods = (): FormMethodsContextType => {
  const context = useContext(FormMethodsContext);
  if (!context) {
    throw new Error("useFormMethods must be used within a FormMethodsProvider");
  }
  return context;
};

interface FormMethodsProviderProps {
  children: React.ReactNode;
}

export const FormMethodsProvider: React.FC<FormMethodsProviderProps> = ({
  children,
}) => {
  const methods = useForm<CampaignFormData>({
    defaultValues: {
      id: "",
      profile: "BASIC",
      configuration: {
        actions: [{
            id: "first-action",
            priority: 1,
            target: "https://google.com/fr",
            type: "GOOGLE_REVIEW"
        }, {
            id: "second-action",
            priority: 2,
        }, {
            id: "last-action",
            priority: 3,
            target: "",
            type: "SPONSORSHIP"
        }],
        colors: {
          primary: "#3f5efb",
          secondary: "#F39C12",
        },
        disabled: false,
        game_type: "WHEEL",
        gifts: [{
          id: "gift-1",
          icon: "EAT",
          initial_limit: 15,
          limit: 15,
          name: "Frite",
          type: "EAT",
        }, {
          id: "gift-2",
          icon: "LOSS",
          initial_limit: 10,
          limit: 10,
          name: "Sac Jacquemus",
          type: "LOSS",

        }],
        retrievalConditions: [],
        logo_uri: "",
      },
      created_at: new Date().toISOString(),
      created_by: "",
      enabled: false,
      label: "",
      placeId: "",
      updated_at: new Date().toISOString(),
      updated_by: "",
    },
  });

  return (
    <FormMethodsContext.Provider value={methods}>
      <FormProvider {...methods}>{children}</FormProvider>
    </FormMethodsContext.Provider>
  );
};