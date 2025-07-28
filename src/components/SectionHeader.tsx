import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import CustomButton, { type CustomButtonVariant } from "./CustomButton";
import CustomBadge from "./CustomBadge";

interface SectionHeaderProps {
  title: string;
  description: string;
  hideArrow?: boolean;
  width?: "full" | "medium";
  defaultExpanded?: boolean;
  children: React.ReactNode;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
    variant?: CustomButtonVariant;
  };
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  width = "full",
  hideArrow = false,
  children,
  actionButton,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    if (!hideArrow) {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <>
      <div className="py-6">
        {/* Header */}
        <div
          className={`relative  text-black ${
            !hideArrow ? "cursor-pointer" : ""
          } `}
          onClick={toggleExpanded}
        >
          {/* Background Effects */}

          <div className="relative z-10 flex justify-between">
            <div className="flex hoverflow-hidden">
              <CustomBadge color="blue" width="3" />
              <div className="flex-1 ml-4">
                <h2 className="text-2xl font-bold mb-1 text-black drop-shadow-sm">
                  {title}
                </h2>
                <p
                  className={`text-black text-sm font-medium leading-relaxed ${width === "full" ? "" : "max-w-[560px]"}`}
                >
                  {description}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <div
                className={`${!hideArrow ? "visible" : "invisible"} bg-white/20 rounded-xl backdrop-blur-sm transition-all duration-200 hover:bg-white/30 border border-white/20`}
              >
                {isExpanded ? (
                  <ChevronUp className="w-6 h-6 text-blue-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-blue-500" />
                )}
              </div>

              <div className="flex">
                {actionButton && (
                  <CustomButton
                    onClick={(e) => {
                      e.stopPropagation();
                      actionButton.onClick();
                    }}
                    variant={actionButton.variant}
                  >
                    {actionButton.icon && (
                      <span className="mr-2">{actionButton.icon}</span>
                    )}
                    {actionButton.label}
                  </CustomButton>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            isExpanded ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-6 bg-gray-50/30">{children}</div>
        </div>
      </div>
      <div className="w-full border border-gray-100 mb-4"></div>
    </>
  );
};

export default SectionHeader;
