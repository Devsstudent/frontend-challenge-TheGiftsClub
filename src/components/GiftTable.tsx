import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table,
  Switch,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import type { Gift, GiftType } from "../types/CampaignType";
import { Plus, Trash2 } from "lucide-react";

const Row = ({ gift }: { gift: Gift }) => {
  const getCategoryString = (category: GiftType): string => {
    switch (category) {
      case "EAT":
        return "Nourriture";
      case "DISCOUNT":
        return "Réduction";
      case "DRINK":
        return "Boisson";
      case "LOSS":
        return "Tirage au sort";
    }
  };
  return (
    <TableRow>
      <TableCell className="border-r border-gray-200">
        {/* Icon */}
        <div>{gift.name}</div>
      </TableCell>
      <TableCell className="border-r border-gray-200">
        {/* Dropdown */}
        <div>{getCategoryString(gift.type)}</div>
      </TableCell>
      <TableCell>
        <div className="flex justify-between items-center">
          {gift.initial_limit === -1 ? (
            <span className="text-gray-400 italic">Illimité</span>
          ) : (
            gift.limit
          )}
          <div>
            {/* enable ou disable = gray ou pas */}
            <span>Illimité</span>
            <Switch checked={gift.initial_limit === -1} />
          </div>
          <div className="absolute right-[20px] flex items-center">
            <Trash2 className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const GiftTable = () => {
  const methods = useFormContext();
  const gifts: Gift[] = methods.watch("configuration.gifts") || [];

  const getOrdinalNumber = (num: number): string => {
    if (num === 1) return "Premier";
    if (num === 2) return "Deuxième";
    if (num === 3) return "Troisième";
    if (num === 4) return "Quatrième";
    if (num === 5) return "cinquième";
    if (num === 6) return "Sixième";
    if (num === 7) return "Septième";
    if (num === 8) return "Huitième";
    if (num === 9) return "Neuvième";
    if (num === 10) return "Dixième";
    return `${num}ème`;
  };

  const handleAddGift = () => {
    const newGift: Gift = {
      id: Date.now().toString(),
      name: "New Element",
      type: "EAT",
      limit: 1,
      initial_limit: 1,
      icon: "",
    };
    const updatedGifts = [...gifts, newGift];
    methods.setValue("configuration.gifts", updatedGifts);
  };

  return (
    <div className="py-6">
      <TableContainer className="border border-gray-200 rounded-xl">
        <Table className="table-auto">
          <TableHead>
            <TableRow>
              <TableCell className="border-r border-gray-200">
                <span className="flex items-center gap-2">
                  Nom Du Gain
                  <IoMdInformationCircleOutline
                    color="blue"
                    className="w-4 h-4"
                  />
                </span>
              </TableCell>
              <TableCell className="border-r border-gray-200">
                <span className="flex items-center gap-2">
                  Catégorie
                  <IoMdInformationCircleOutline
                    color="blue"
                    className="w-4 h-4"
                  />
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  Nombre de stock
                  <IoMdInformationCircleOutline
                    color="blue"
                    className="w-4 h-4"
                  />
                </span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {gifts.map((gift, index) => (
              <Row key={index} gift={gift} />
            ))}
            <TableRow>
              <TableCell>
                <span
                  className="text-blue-700 text-sm flex items-center justify-start gap-2 cursor-pointer"
                  onClick={handleAddGift}
                >
                  <Plus className="w-5 h-5 mr-1 rounded-full border border-blue-700" />
                  <div className="flex items-center text-center">
                    Ajouter un {getOrdinalNumber(gifts.length + 1)} Gain
                  </div>
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
