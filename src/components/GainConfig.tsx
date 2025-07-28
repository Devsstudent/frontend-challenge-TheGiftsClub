import CustomButton from "./CustomButton";
import { PlusIcon } from "lucide-react";
import { PiTicketLight } from "react-icons/pi";
import { GiftTable } from "./GiftTable";
import { ToogleBadge } from "./ToogleBadge";
import { useFormContext } from "react-hook-form";
import type { Gift } from "../types/CampaignType";
import ConditionalTable from "./ConditionalTable";

export const GainConfig = () => {
  const { watch, setValue } = useFormContext();

  const currentGifts: Gift[] = watch("configuration.gifts") || [];

  const addLossGift = () => {
    const lossGiftExists = currentGifts.some((gift) => gift.type === "LOSS");

    if (!lossGiftExists) {
      const lossGift: Gift = {
        id: Date.now().toString(),
        name: "Perdu",
        type: "LOSS",
        limit: 1,
        initial_limit: -1,
        icon: "",
      };

      const updatedGifts = [...currentGifts, lossGift];
      setValue("configuration.gifts", updatedGifts);
    }
  };

  const removeLossGift = () => {
    const updatedGifts = currentGifts.filter((gift) => gift.type !== "LOSS");
    setValue("configuration.gifts", updatedGifts);
  };

  return (
    <div>
      <div className="flex justify-between">
        <ToogleBadge
          defaultValue={true}
          onChange={(checked) => {
            if (!checked) {
              addLossGift();
            } else {
              removeLossGift();
            }
          }}
          str="Jeux 100% Gagnant"
          description="Cochez cette option pour garantir un gain à chaque joueur. Si vous la décochez, une case 'Perdu' sera automatiquement ajoutée au jeu."
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
