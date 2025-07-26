import wheel from "../assets/wheel.jpg";
import cardd from "../assets/card.png";
import mystery from "../assets/mystery.png";
import slot from "../assets/slot.png";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import type { GameType } from "../types/CampaignType";
const GameSelection = () => {
  const methods = useFormContext();
  const [selected, setSelected] = useState<GameType>(
    methods.getValues("configuration.game_type") || null,
  );

  const watchProfile = methods.watch("profile");

  useEffect(() => {

  }, [watchProfile]);

  const games = [
    { id: "WHEEL", image: wheel, alt: "Wheel" },
    { id: "MYSTERY", image: mystery, alt: "Mystery" },
    { id: "SLOT_MACHINE", image: slot, alt: "Slot" },
    { id: "CARD", image: cardd, alt: "Card" },
  ] as const;

  const onGameSelect = (game: GameType) => {
    if (watchProfile != "PREMIUM" && game !== "WHEEL") {
      return;
    }
    setSelected(game);
    methods.setValue("configuration.game_type", game);
  };

  return (
<>
    <div className="flex flex-row justify-between items-center p-2">
      {games.map((game) => (
        <img
          key={game.id}
          src={game.image}
          alt={game.alt}
          className={`h-64 w-64 ${
            selected === game.id ? "border-4 rounded-lg border-blue-600" : ""
          } ${watchProfile !== "PREMIUM" && game.id !== "WHEEL" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} hover:scale-105 transition-transform duration-300`}
          onClick={() => onGameSelect(game.id)}
        />
      ))}
    </div>
    {/*
      <button onClick={() => methods.setValue("profile", watchProfile === "PREMIUM" ? "BASIC" : "PREMIUM")}>
        {watchProfile === "PREMIUM" ? "Switch to Basic" : "Switch to Premium"}
      </button>
    */}
    </>
  );
};

export default GameSelection;
