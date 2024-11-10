import React from "react";

import { twMerge } from "tailwind-merge";

import "./styles.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: (ev: React.MouseEvent) => void;
  width?: string;
  color?: string;
  type?: "submit" | "reset" | "button" | undefined;
}

const Button: React.FC<ButtonProps> = ({
  children,
  disabled,
  onClick,
  width = "",
  color = "default",
  type,
}) => {
  const handleClick = (ev: React.MouseEvent) => {
    if (disabled) return;
    onClick(ev);
  };

  let classColor = "button-color-default button-border";
  switch (color) {
    case "primary":
      classColor = "button-color-primary";
      break;
  }

  return (
    <button
      className={twMerge(
        "container-button button-text button-transition button-disabled",
        classColor
      )}
      type={type}
      onClick={handleClick}
      style={{ width: width }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
