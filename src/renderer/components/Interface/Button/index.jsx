import React from 'react';
import styles from './Button.module.css';

export function Button({ 
  children, 
  variant = 'default',
  className = '',
  icon: Icon,
  iconProps = { width: 20, height: 20 },
  ...props 
}) {
  if (!['default', 'primary'].includes(variant)) {
    console.warn(`Unknown button variant: ${variant}. Using default.`);
    variant = 'default';
  }

  const isIconOnly = !!Icon;
  const buttonClasses = [
    styles.button,
    styles[variant],
    isIconOnly ? styles.iconOnly : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      title={isIconOnly ? children : undefined}
      {...props}
    >
      {Icon && <Icon {...iconProps} className={styles.icon} />}
      <span className={isIconOnly ? styles.visuallyHidden : undefined}>
        {children}
      </span>
    </button>
  );
}