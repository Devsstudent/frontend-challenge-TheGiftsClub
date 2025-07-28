import { TextField } from "@mui/material";
import { ToogleBadge } from "./ToogleBadge";
import ConditionalTable from "./ConditionalTable";
import { useState, useRef } from "react";

export const GiftCondition = () => {
  const [condition, setCondition] = useState<boolean>(true);
  const conditionalContentRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="flex flex-col gap-4">
        <ToogleBadge
          defaultValue={condition}
          onChange={(checked) => {
            setCondition(checked);
            if (checked) {
              setTimeout(() => {
                conditionalContentRef.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }, 200);
            }
          }}
          str="Pas de condition"
          description="
          Les clients peuvent choisir n'importe quel gain sans aucun achat."
        />
        {condition && (
          <div ref={conditionalContentRef}>
            <ToogleBadge
              str="Sous condition d'achat minimale"
              description="
        Exigez un montant minimum d'achat en boutique pour permettre à la récupération du gain."
            />
            <TextField
              className="flex max-w-md mt-4 ml-4"
              type="number"
              id="outlined-helperText"
              label="Montant à atteindre"
              placeholder="Ex: 10€ d'achat minimum pour récupérer le gain"
              defaultValue="10"
            />
            <div className="mt-8 ml-4">
              <span className="front-semibold text-md">
                Conditions personnalisées par gain
              </span>
              <p className="text-sm text-gray-400 mt-2">
                Vous pouvez définir une condition spécifique pour un ou
                plusieurs gains.
              </p>
            </div>
            <ConditionalTable />
          </div>
        )}
      </div>
    </>
  );
};
