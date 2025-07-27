import CustomBadge from "./CustomBadge";
import CustomButton from "./CustomButton";
import { MdUpload } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { useState } from "react";

export const GameDesign = () => {
  const [selectedColors, setSelectedColors] = useState(["#3F5EFB", "#F39C12"]);

  const handleColorChange = (index, color) => {
    const newColors = [...selectedColors];
    newColors[index] = color;
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
          <div className="h-[90%] flex flex-col px-[10vw] py-[10vh] mt-4 border-2 border-dashed border-gray-300 rounded-md justify-center items-center">
            <MdUpload
              color="white"
              className="h-10 w-10 p-1 bg-gray-300 rounded-full mb-4"
            />

            <CustomButton
              variant="primary"
              className="mt-4 text-sm"
              onClick={() => alert("Logo uploaded")}
            >
              SÉLECTIONNER UN FICHIER
            </CustomButton>
          </div>
        </div>
        <div className="w-1/2 flex">
          <div className="w-2/3 flex flex-col">
            <div className="flex">
              <CustomBadge color="blue" height="6" width="3" />
              <div className="text-gray-700">Importer vos couleurs</div>
            </div>
            <div className="flex flex-col items-center pt-[10vh]">
              <div className="flex gap-4 mb-4">
                {selectedColors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center pr-10">
                    <label className="cursor-pointer">
                      <input
                        type="color"
                        value={color}
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
                      value={color}
                      onChange={(e) => handleColorChange(index, e.target.value)}
                      className="mt-6 w-20 text-center border border-gray-300 rounded-md p-2 text-xs"
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
