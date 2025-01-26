import React from 'react';
import { Label } from '../Label';
import { Switch } from '../Switch';
import styles from './FieldsetSwitch.module.css';

export function FieldsetSwitch({ id, label, description, checked, onCheckedChange }) {
  return (
    <div className={styles.fieldsetSwitch}>
      <div className={styles.fieldsetSwitchText}>
        <Label htmlFor={id} className={styles.switchLabel}>{label}</Label>
        {description && <div className={styles.help}>{description}</div>}
      </div>
      <Switch
        id={id}
        name={id}
        checked={checked}
        onCheckedChange={onCheckedChange}
      />
    </div>
  );
} 