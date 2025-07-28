import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { useFormContext } from "react-hook-form";
import type { Action } from "../types/CampaignType";
import { AlertTriangle, Trash2 } from "lucide-react";
import IntegratedBadge from "./IntegratedBadge";
import DropdownAction, { getStringType } from "./DropdownAction";
import { useEffect, useState } from "react";
import AlertMessage from "./AlertMessage";

const getPostionString = (priority: number, actions: Action[]): string => {
  switch (priority) {
    case actions.length:
      return "Dernière action";
    case 1:
      return "Première action";
    case 2:
      return "Deuxième action";
    case 3:
      return "Troisième action";
    case 4:
      return "Quatrième action";
    case 5:
      return "Cinquième action";
    case 6:
      return "Sixième action";
    default:
      return `Action ${priority}`;
  }
};

const Row = (
  {
    action,
  }: {
    action: Action;
  }, // Définition du type pour l'action
) => {
  const actions = useFormContext().getValues("configuration.actions");
  const watchActions = useFormContext().watch("configuration.actions");

  useEffect(() => {
    console.log("Action in Row:", actions, action);
  }, [watchActions]);
  const methods = useFormContext();

  const handleDelete = (action: Action) => {
    const updatedActions = actions.filter(
      (existingAction: Action) => existingAction.id !== action.id,
    );
    // Réorganiser les priorités après suppression
    const reorderedActions = updatedActions.map((existingAction: Action) =>
      existingAction.priority > action.priority
        ? { ...existingAction, priority: existingAction.priority - 1 }
        : existingAction,
    );
    methods.setValue("configuration.actions", reorderedActions);
  };

  return (
    <>
      <TableCell className="border-r border-gray-200">
        <span className="text-gray-600 text-sm">
          {/* function pour l'index */}
          {getPostionString(action.priority, actions)}
        </span>
      </TableCell>
      {action.type ? (
        <>
          {action.type === "SPONSORSHIP" ? (
            <TableCell colSpan={2} className="border-gray-200 align-middle">
              <div className="flex items-center justify-between w-full">
                <DropdownAction action={action} />
                <div className="text-blue-700 cursor-pointer">Modifier</div>
                <div className="text-blue-700 cursor-pointer flex items-center gap-2">
                  En savoir plus
                  <IoIosInformationCircleOutline className="h-5 w-5" />
                </div>
              </div>
            </TableCell>
          ) : (
            <>
              <TableCell className="border-r border-gray-200">
                <DropdownAction action={action} />
              </TableCell>
              <TableCell className={"border-r border-gray-200"}>
                <span className="text-gray-600 text-sm flex items-center justify-start gap-0.5">
                  <input
                    type="text"
                    className=""
                    {...methods.register(
                      `configuration.actions.${actions.findIndex((a: Action) => a.id === action.id)}.target`,
                    )}
                    value={
                      action.target === "" || !action.target
                        ? ""
                        : action.target
                    }
                    placeholder="Entrer cible"
                    onChange={(e) => {
                      const updatedActions = actions.map(
                        (existingAction: Action) =>
                          existingAction.id === action.id
                            ? { ...existingAction, target: e.target.value }
                            : existingAction,
                      );
                      methods.setValue("configuration.actions", updatedActions);
                    }}
                  />
                  {/* Afficher la cible ou "Modifier" si vide */}
                  {action.target !== "" && <IntegratedBadge />}
                </span>
              </TableCell>
              <TableCell className="border-r border-gray-200 w-1">
                {/* TODO: onclick delete*/}
                <span
                  className="text-gray-600 text-sm hover:cursor-pointer"
                  onClick={() => handleDelete(action)}
                >
                  <Trash2 className="text-gray-400 w-4 h-4" />
                </span>
              </TableCell>
            </>
          )}
        </>
      ) : (
        <TableCell className="">
          <DropdownAction action={action} />
        </TableCell>
      )}
    </>
  );
};

const ActionTable = () => {
  const methods = useFormContext();
  const actions: Action[] = methods.getValues("configuration.actions");
  
  const [hasDuplicates, setHasDuplicates] = useState(false);
  const [duplicateTypes, setDuplicateTypes] = useState<[string, number][]>([]);

  const watchActions = methods.watch("configuration.actions");

  useEffect(() => {
    // Calculer les doublons
    const typeCount = actions.reduce(
      (acc, action) => {
        if (action.type) {
          acc[action.type] = (acc[action.type] || 0) + 1;
        }
        return acc;
      },
      {} as Record<string, number>,
    );

    const duplicates = Object.entries(typeCount).filter(
      ([, count]) => count > 1,
    );
    
    setHasDuplicates(duplicates.length > 0);
    setDuplicateTypes(duplicates);
  }, [watchActions]);

  return (
    <div className="py-6">
      <TableContainer className="border border-gray-200 rounded-xl">
        <Table className="table-auto">
          <TableHead>
            <TableRow className="border border-gray-200">
              <TableCell className="font-semibold text-gray-700 border-r border-b border-gray-200">
                Ordre des actions
              </TableCell>
              <TableCell className="font-semibold text-gray-700 border-r border-b border-gray-200">
                Action
              </TableCell>
              <TableCell className="font-semibold text-gray-700 border-b border-gray-200">
                Cible
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actions.map((action, index) => (
              <TableRow key={index} className="border border-gray-200">
                <Row action={action} />
              </TableRow>
            ))}
            {/* First cell, c'est l'ordre (ca bouge pas) */}
            {/* Second cell, c'est l'action, ca dois ouvrir un dropdown */}
            {/* Third cell, c'est la cible, input modifiable, si empty affichier modifier*/}
          </TableBody>
        </Table>
      </TableContainer>
      {actions.length <= 3 && (
        <AlertMessage
          className="mt-4"
          type="warning"
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Une seule action = une seule participation"
          message="Vos clients ne joueront qu'une seule fois si vous ne proposez qu'une seule action."
        />
      )}
      {hasDuplicates && (
        <AlertMessage
          className="mt-4"
          type="error"
          icon={<AlertTriangle className="w-5 h-5" />}
          title="Actions en double détectées"
          message={
            <div className="space-y-2">
              <p>Vous avez plusieurs actions du même type :</p>
              <div className="flex flex-wrap gap-2">
                {duplicateTypes.map(([type]) => (
                  <div key={type} className="text-xs">
                    {getStringType(type)}
                  </div>
                ))}
              </div>
            </div>
          }
        />
      )}
    </div>
  );
};
export default ActionTable;
