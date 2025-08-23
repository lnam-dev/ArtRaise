"use client";

import React, { FC } from "react";
import styles from "./button-transparent.module.css";

interface ButtonTransparentProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const ButtonTransparent: FC<ButtonTransparentProps> = ({
  children,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles["button-transparent"]} ${className}`}
    >
      {children}
    </button>
  );
};

export default ButtonTransparent;
