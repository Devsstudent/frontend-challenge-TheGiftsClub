import { Button, type ButtonProps } from "@mui/material";
import { yellow } from "@mui/material/colors";
import React from "react";

export type CustomButtonVariant = 'primary' | 'secondary' | 'accent' | 'danger' | 'success' | 'outline' | 'yellow';
type CustomButtonSize = 'small' | 'medium' | 'large';
type IconPosition = 'left' | 'right';

interface CustomButtonProps extends Omit<ButtonProps, 'variant' | 'size' | 'color'> {
  variant?: CustomButtonVariant;
  size?: CustomButtonSize;
  icon?: React.ReactNode;
  iconPosition?: IconPosition;
  loading?: boolean;
  fullWidth?: boolean;
}

const CustomButton = React.forwardRef<HTMLButtonElement, CustomButtonProps>(({ 
  variant = 'primary',
  size = 'medium',
  children, 
  icon, 
  iconPosition = 'left',
  type = 'button',
  onClick,
  className = '',
  loading = false,
  disabled = false,
  fullWidth = false,
  ...props 
}, ref) => {
  // Define variant styles
  const variantStyles = {
    primary: 'text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-300',
    secondary: 'text-black bg-white hover:bg-gray-50 border border-gray-300 disabled:bg-gray-100',
    accent: 'bg-amber-500 text-white hover:bg-amber-600 disabled:bg-amber-300',
    danger: 'text-white bg-red-600 hover:bg-red-500 disabled:bg-red-300',
    success: 'text-white bg-green-600 hover:bg-green-500 disabled:bg-green-300',
    outline: 'text-blue-600 bg-transparent border-2 border-blue-600 hover:bg-blue-50 disabled:text-blue-300 disabled:border-blue-300',
    yellow: `text-black bg-yellow-300 hover:bg-yellow-400 disabled:bg-yellow-200`,
  };

  // Define size styles
  const sizeStyles = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // Base classes that apply to all buttons
  const baseClasses = 'hover:cursor-pointer rounded-lg normal-case transition-colors duration-200';
  
  // Width classes
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combine classes
  const buttonClasses = `${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${widthClasses} ${className}`;

  const renderContent = () => {
    const iconElement = loading ? (
      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
    ) : icon;

    if (iconPosition === 'right') {
      return (
        <div className="flex items-center gap-2">
          {children}
          {iconElement && <span>{iconElement}</span>}
        </div>
      );
    }

    return (
      <div className="flex items-center gap-2">
        {iconElement && <span>{iconElement}</span>}
        {children}
      </div>
    );
  };

  return (
    <Button
      ref={ref}
      sx={{ textTransform: 'none' }}
      className={buttonClasses}
      type={type as 'button' | 'submit' | 'reset'}
      onClick={onClick}
      disabled={disabled || loading}
      fullWidth={fullWidth}
      {...props}
    >
      {renderContent()}
    </Button>
  );
});

CustomButton.displayName = 'CustomButton';

export default CustomButton;
