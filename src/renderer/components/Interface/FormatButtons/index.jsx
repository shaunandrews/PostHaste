import React, { useState, useEffect } from "react";
import { ButtonToggle } from "../ButtonToggle";
import { Bold, Italic } from "lucide-react";
import styles from "./FormatButtons.module.css";

export function FormatButtons({ hasSelection, onFormat }) {
  const [, forceUpdate] = useState({});

  useEffect(() => {
    // Set up an interval to check formatting state
    const interval = setInterval(() => {
      if (hasSelection) {
        forceUpdate({});
      }
    }, 100);

    return () => clearInterval(interval);
  }, [hasSelection]);

  const isFormatActive = (command) => {
    try {
      return document.queryCommandState(command);
    } catch (e) {
      return false;
    }
  };

  if (!hasSelection) return null;

  return (
    <div className={styles.container}>
      <ButtonToggle
        icon={Bold}
        iconSize={14}
        onClick={() => onFormat("bold")}
        isActive={isFormatActive("bold")}
        title="Bold"
      />
      <ButtonToggle
        icon={Italic}
        iconSize={14}
        onClick={() => onFormat("italic")}
        isActive={isFormatActive("italic")}
        title="Italic"
      />
    </div>
  );
}
