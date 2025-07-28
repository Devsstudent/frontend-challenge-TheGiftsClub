import CustomBadge from "./CustomBadge";
import { FaEye } from "react-icons/fa";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { UploadFile } from "./UploadFile";

export const GameDesign = () => {
  const { setValue, watch } = useFormContext();
  const primaryColor = watch("configuration.colors.primary");
  const secondaryColor = watch("configuration.colors.secondary");
  const profile = watch("profile");
  const [selectedColors, setSelectedColors] = useState([
    primaryColor,
    secondaryColor,
  ]);

  const handleColorChange = (index: number, color: string) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
    setValue(
      `configuration.colors.${index === 0 ? "primary" : "secondary"}`,
      color,
    );
    setSelectedColors(newColors);
  };
  return (
    <div className="border rounded-lg border-gray-300">
      <div className="flex flex-row justify-between m-8 gap-20">
        <div className="w-1/2">
          <div className="flex">
            <CustomBadge color="blue" height="6" width="3" />
            <div className="text-gray-700">Glissez-déposez votre logo</div>
          </div>
          <div className="h-[100%] flex pb-7">
            <UploadFile />
          </div>
        </div>
        <div className="w-1/2 flex">
          <div className="w-2/3 flex flex-col">
            <div className="flex">
              <CustomBadge color="blue" height="6" width="3" />
              <div className="text-gray-700">Importer vos couleurs</div>
            </div>
            <div
              className={`flex flex-col items-center pt-[10vh] ${profile === "BASIC" ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex gap-4 mb-4">
                {selectedColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center pr-10">
                    <label
                      className={`${profile === "BASIC" ? "cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <input
                        type="color"
                        value={color}
                        disabled={profile === "BASIC"}
                        onChange={(e) =>
                          handleColorChange(index, e.target.value)
                        }
                        className="sr-only"
                      />
                      <div
                        className={`w-13 h-36 rounded-full shadow-sm`}
                        style={{
                          backgroundColor: color,
                          outline: `5px solid ${color}33`,
                          outlineOffset: "0px", // Pour garder l'outline à l'intérieur
                        }}
                      />
                    </label>
                    <input
                      type="text"
                      disabled={profile === "BASIC"}
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className={`${profile === "BASIC" ? "cursor-not-allowed" : ""} mt-6 w-20 text-center uppercase border border-gray-300 rounded-md p-2 text-xs`}
                    />
                  </div>
                ))}
              </div>

              <div className="flex text-sm text-gray-400 justify-start">
                Personnalisez votre jeu en ajoutant jusqu'à deux couleurs
              </div>
            </div>
          </div>
          <div className="w-1/3">
            <div className="flex items-center gap-2 text-blue-700 underline cursor-pointer justify-end">
              Voir l'aperçu
              <FaEye />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
