import { Switch } from "@mui/material";
import CustomBadge from "./CustomBadge";

export const ToogleBadge = ({
  str,
  description,
}: {
  str: string;
  description: string;
}) => {
  return (
    <div className="flex-row gap-4 items-center">
      <div className="flex max-w-md justify-between">
        <div className="flex items-center gap-2">

        <CustomBadge color="orange" width="3" height="6" />
        <div>
          <span className="text-md font-semibold">{str}</span>
        </div>
        </div>
        <Switch defaultChecked color="warning" className="flex"/>
      </div>
      <span className="flex text-sm text-gray-500 max-w-md ml-4">{description}</span>
    </div>
  );
};
