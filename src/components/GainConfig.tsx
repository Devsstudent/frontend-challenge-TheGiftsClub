import CustomButton from "./CustomButton";
import { PlusIcon } from "lucide-react";
import { PiTicketLight } from "react-icons/pi";
import { GiftTable } from "./GiftTable";
import { ToogleBadge } from "./ToogleBadge";

export const GainConfig = () => {
  return (
    <div>
      <div className="flex justify-between">
        <ToogleBadge
          str="Jeux 100% Gagnant"
          description="
          Cochez cette option pour garantir un gain à chaque joueur. Si vous la
          décohez, une case 'Perdu' sera automatiquement ajoutée au jeu.
            "
        />
        <div className="flex justify-end">
          <div className="flex items-center gap-2">
            <CustomButton
              variant="accent"
              icon={<PiTicketLight className="w-4 h-4 font-bold" />}
            >
              <span className="text-sm">Lancer le tirage au sort</span>
            </CustomButton>
            <CustomButton
              variant="primary"
              icon={<PlusIcon className="w-4 h-4" />}
            >
              <span className="text-sm">Ajouter un gain</span>
            </CustomButton>
          </div>
        </div>
      </div>
      <GiftTable />
    </div>
  );
};
