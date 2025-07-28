import { Switch } from "@mui/material";
import CustomBadge from "./CustomBadge";
import { useState } from "react";

export const ToogleBadge = ({
  str,
  description,
  defaultValue = false,
  onChange,
}: {
  str: string;
  description: string;
  defaultValue?: boolean;
  onChange?: (checked: boolean) => void;
}) => {
  const [isChecked, setIsChecked] = useState<boolean>(defaultValue);

  const handleChange = (checked: boolean) => {
    setIsChecked(checked);
    onChange?.(checked); // Appeler la callback si fournie
  };

  return (
    <div className="flex-row gap-4 items-center">
      <div className="flex max-w-md justify-between">
        <div className="flex items-center gap-2">
          <CustomBadge color={isChecked ? "orange" : "gray"} width="3" height="6" />
          <div>
            <span className={`text-md font-semibold ${isChecked ? "text-gray-700" : "text-gray-500"}`}>{str}</span>
          </div>
        </div>
        <Switch
          checked={isChecked}
          onChange={(e) => handleChange(e.target.checked)}
          color="warning"
          className="flex"
        />
      </div>
      <span className="flex text-sm text-gray-400 max-w-md ml-4">
        {description}
      </span>
    </div>
  );
};
