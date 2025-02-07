import React, { forwardRef } from "react";
import styles from "./Button.module.css";

export const Button = forwardRef(function Button(
  {
    children,
    variant = "default",
    className = "",
    icon: Icon,
    iconSize,
    iconProps = { width: 16, height: 16 },
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

  // If iconSize is provided, use it for both width and height
  const finalIconProps = iconSize
    ? { ...iconProps, width: iconSize, height: iconSize }
    : iconProps;

  return (
    <button
      className={buttonClasses}
      title={isIconOnly ? props.title || children : undefined}
      ref={ref}
      {...props}
    >
      {Icon && <Icon {...finalIconProps} className={styles.icon} />}
      {!isIconOnly && children}
    </button>
  );
});
