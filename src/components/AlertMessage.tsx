import React from "react";

interface AlertMessageProps {
  type: "success" | "warning" | "error" | "info";
  icon?: React.ReactNode;
  title: string;
  message: string | React.ReactNode;
  className?: string;
}

const AlertMessage: React.FC<AlertMessageProps> = ({
  type,
  icon,
  title,
  message,
  className = "",
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "warning":
        return "bg-amber-50 border-amber-200 text-amber-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "info":
        return "bg-blue-50 border-blue-200 text-blue-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  const getIconColor = () => {
    switch (type) {
      case "success":
        return "text-green-600";
      case "warning":
        return "text-amber-600";
      case "error":
        return "text-red-600";
      case "info":
        return "text-blue-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className={`border rounded-xl p-4 shadow-sm ${getAlertStyles()} ${className}`}>
      <div className="flex items-start space-x-3">
        {icon && (
          <div className={`flex-shrink-0 ${getIconColor()} mt-0.5`}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <div className="text-sm">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default AlertMessage;
