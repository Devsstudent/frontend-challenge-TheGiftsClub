import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useFormContext } from "react-hook-form";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Plus } from "lucide-react";
import type { Gift } from "../types/CampaignType";

const Row = ({ gift }: { gift: Gift }) => {
  return (
    <TableRow>
      <TableCell className="border-r border-gray-200">
        {gift.name}
      </TableCell>
      <TableCell className="border-r border-gray-200">
        <input
          type="text"
          placeholder="Aucune"
          className="w-full border-none outline-none bg-transparent"
          defaultValue=""
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-blue-500 cursor-pointer">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Ajouter une condition</span>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
};

const ConditionalTable = () => {
  const methods = useFormContext();
  const gifts: Gift[] = methods.getValues("configuration.gifts") || [];

  return (
    <div className="py-6">
      <TableContainer className="border border-gray-200 rounded-xl">
        <Table className="table-auto">
          <TableHead>
            <TableRow>
              <TableCell className="border-r border-gray-200">
                <span className="flex">
                  Gain
                </span>
              </TableCell>
              <TableCell className="border-r border-gray-200">
                <span className="flex items-center gap-2">
                  Condition
                  <IoMdInformationCircleOutline
                    color="blue"
                    className="w-4 h-4"
                  />
                </span>
              </TableCell>
              <TableCell>
                <span className="flex items-center gap-2">
                  Action
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
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ConditionalTable;