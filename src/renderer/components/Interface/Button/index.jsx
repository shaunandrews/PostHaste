import React, { forwardRef } from "react";
import styles from "./Button.module.css";

export const Button = forwardRef(function Button(
  {
    children,
    variant = "default",
    className = "",
    icon: Icon,
    iconProps = { width: 20, height: 20 },
    ...props
  },
  ref
) {
  if (!["default", "primary"].includes(variant)) {
    console.warn(`Unknown button variant: ${variant}. Using default.`);
    variant = "default";
  }

  // A button is icon-only if it has an icon and either no children or a title prop
  const isIconOnly = Icon && (!children || props.title);
  const buttonClasses = [
    styles.button,
    styles[variant],
    isIconOnly ? styles.iconOnly : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button
      className={buttonClasses}
      title={isIconOnly ? props.title || children : undefined}
      ref={ref}
      {...props}
    >
      {Icon && <Icon {...iconProps} className={styles.icon} />}
      {!isIconOnly && children}
    </button>
  );
});
