import { Plus } from "lucide-react";
import type { Action } from "../types/CampaignType";

const AddAction = ({
  action,
}: {
  action?: Action;
}) => {
  return (
    <span
      className="text-blue-700 text-sm flex items-center justify-start gap-2 hover:cursor-pointer caca"
    >
      <Plus className="w-5 h-5 mr-1 rounded-full border border-blue-700" />
      <div className="flex items-center text-center">Ajouter une action</div>
    </span>
  );
};

export default AddAction;