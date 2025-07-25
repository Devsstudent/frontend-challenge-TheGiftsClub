import { Menu, MenuItem } from "@mui/material";
import { useEffect, useState, type JSX } from "react";
import type { Action, ActionType } from "../types/CampaignType";
import { FcGoogle } from "react-icons/fc";
import { GoPeople } from "react-icons/go";
import { FaTiktok, FaFacebookF, FaInstagram } from "react-icons/fa6";
import { useFormContext } from "react-hook-form";
import AddAction from "./AddAction";

export const CircleWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-10 h-10 rounded-full p-1 shadow-lg  bg-white border border-gray-100 flex items-center justify-center">
      {children}
    </div>
  );
};

export const getStringType = (type: string): JSX.Element => {
  switch (type) {
    case "INSTAGRAM":
      return (
        <div className="flex items-center gap-2 ">
          <CircleWrapper>
            <FaInstagram className="w-6 h-6" />
          </CircleWrapper>
          Instagram
        </div>
      );
    case "GOOGLE_REVIEW":
      return (
        <div className="flex items-center gap-2 ">
          <CircleWrapper>
            <FcGoogle className="w-6 h-6" />
          </CircleWrapper>
          Avis Google
        </div>
      );
    case "TIKTOK":
      return (
        <div className="flex items-center gap-2 ">
          <CircleWrapper>
            <FaTiktok className="w-6 h-6" />
          </CircleWrapper>
          TikTok
        </div>
      );
    case "FACEBOOK":
      return (
        <div className="flex items-center gap-2 ">
          <CircleWrapper>
            <FaFacebookF className="w-6 h-6" color="blue" />
          </CircleWrapper>
          Facebook
        </div>
      );
    case "SPONSORSHIP":
      return (
        <div className="flex items-center gap-2 ">
          <CircleWrapper>
            <GoPeople className="w-6 h-6" color="blue" />
          </CircleWrapper>
          <div>{"Parrainage (Par défaut)"}</div>
        </div>
      );
    default:
      return (
        <div className="hover:cursor-pointer">
          <AddAction />
        </div>
      );
  }
};
const DropdownAction = ({ action }: { action: Action }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const methods = useFormContext();
  const actions = methods.getValues("configuration.actions");
  // getStringPriority  pour la value du add
  const [selectedValue, setSelectedValue] = useState(action?.type);
  console.log("DropdownAction component", action, selectedValue);

  useEffect(() => {
    if (action?.type) {
      setSelectedValue(action.type);
    }
  }, [action?.type]);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (originalValue: string, value: string) => {
    if (!originalValue) {
      const newAction = {
        id: `action-${Date.now()}`,
        priority: action.priority + 1,
      };

      // Get current actions and increment priorities after current action
      const updatedActions = actions.map((existingAction: Action) =>
        existingAction.priority > action.priority
          ? { ...existingAction, priority: existingAction.priority + 1 }
          : existingAction,
      );

      // Insert new action at the correct position
      updatedActions.splice(action.priority, 0, newAction);

      // Update form values
      methods.setValue("configuration.actions", updatedActions);
      console.log("Adding action:", action);
    }
    // Update the existing action with new type
    // TO DO complexité dans l'ajout avec des valeurs par defaut pour target.
    const updatedActionsWithType = methods
      .getValues("configuration.actions")
      .map((existingAction: Action) =>
        existingAction.id === action.id
          ? { ...existingAction, type: value as ActionType, target: "" }
          : existingAction,
      );
    methods.setValue("configuration.actions", updatedActionsWithType);
    setSelectedValue(value as ActionType);
    handleClose();
  };

  const types: ActionType[] = [
    "INSTAGRAM",
    "GOOGLE_REVIEW",
    "TIKTOK",
    "FACEBOOK",
    "SPONSORSHIP",
  ];

  return (
    <>
      <div
        onClick={handleClick}
        className="justify-start normal-case text-gray-700 hover:cursor-pointer"
      >
        {getStringType(selectedValue)}
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="mt-1"
      >
        {/* 
          value va etre le type de l'action
          */}
        {types.map((type: ActionType | "") =>
          type !== "" ? (
            <MenuItem
              key={type}
              onClick={() => handleSelect(selectedValue, type)}
              className="hover:bg-gray-50"
            >
              {getStringType(type)}
            </MenuItem>
          ) : null,
        )}
      </Menu>
    </>
  );
};

export default DropdownAction;
