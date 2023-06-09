import React, { FC } from "react";
import { Base } from "../../types/component";
import { cn } from "../../utils/utils";
import buttonVariants from "./styles";
import { ButtonShape, ButtonSize, ButtonVariant } from "./types";
import useTheme from "../../provider/useTheme";

export interface ButtonProps extends Base {
  /**
   * Button type
   */
  variant?: ButtonVariant;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button state
   */
  disabled?: boolean;
  /**
   * Element placed before the children
   */
  startIcon?: React.ReactNode;
  /**
   * Element placed after the children
   */
  endIcon?: React.ReactNode;

  icon?: React.ReactNode;

  size: ButtonSize;

  shape?: ButtonShape;

  children?: React.ReactNode;
}

export const Button = ({
  size = "large",
  disabled = false,
  variant = "primary",
  children,
  startIcon,
  endIcon,
  icon,
  onClick,
  shape = "normal",
  className = "",
  theme: mode,
  ...props
}: ButtonProps) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const { theme } = useTheme();

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`${cn(
        buttonVariants({ variant, size, theme: mode ? mode : theme, shape, disabled })
      )} ${className}`}
      disabled={disabled}
      {...props}>
      {startIcon && <span className="bu-mr-[9.5px]">{startIcon}</span>}
      {children}
      {endIcon && <span className="bu-ml-[9.5px]">{endIcon}</span>}
      {icon}
    </button>
  );
};

const WhiteButton: FC<ButtonProps> = (props) => {
  const { theme } = useTheme();
  return (
    <Button
      {...props}
      variant="ghost"
      className={`bu-border-light-background bu-text-light-background ${
        theme === "light" ? "hover:!bu-text-light-primary" : "hover:!bu-text-dark-primary"
      }  bu-font-medium hover:!bu-bg-light-background`}></Button>
  );
};

Button.WhiteButton = WhiteButton;
