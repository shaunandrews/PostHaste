import React from "react";
import { Button } from "../Button";
import styles from "./ButtonToggle.module.css";

export function ButtonToggle({ children, icon, isActive, onClick, ...props }) {
  return (
    <Button
      icon={icon}
      variant={isActive ? "primary" : "default"}
      onClick={onClick}
      className={`${styles.toggle} ${isActive ? styles.active : ""}`}
      {...props}
    />
  );
}
