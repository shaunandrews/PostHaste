import React from 'react';
import { Label } from '../Label';
import styles from './Fieldset.module.css';

export function Fieldset({ id, label, children, description }) {
  return (
    <div className={styles.fieldset}>
      <Label htmlFor={id}>{label}</Label>
      {children}
      {description && <div className={styles.help}>{description}</div>}
    </div>
  );
} 