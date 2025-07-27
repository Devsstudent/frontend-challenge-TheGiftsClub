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
import { Plus } from "lucide-react";

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
          <span>{gift.limit}</span>
          <div>
            {/* enable ou disable = gray ou pas */}
            <span>Illimité</span>
            <Switch />
          </div>
          <div className="absolute right-[50px] flex items-center">
            <IoMdInformationCircleOutline className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

export const GiftTable = () => {
  const methods = useFormContext();
  const gifts: Gift[] = methods.getValues("configuration.gifts") || [];

  return (
    <div className="p-6">
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
              <TableCell >
                <span className="text-blue-700 text-sm flex items-center justify-start gap-2 hover:cursor-pointer caca">
                  <Plus className="w-5 h-5 mr-1 rounded-full border border-blue-700" />
                  <div className="flex items-center text-center">
                    Ajouter un {}xeme gain
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
