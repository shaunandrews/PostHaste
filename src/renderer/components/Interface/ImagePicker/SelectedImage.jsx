import React from 'react';
import { XmarkCircleSolid } from 'iconoir-react';
import { Button } from '../Button';
import styles from './ImagePicker.module.css';

export function SelectedImage({ image, onClick }) {
  return (
    <div className={styles.imagePreview}>
      <Button 
        onClick={onClick}
        className={styles.removeButton}
        icon={XmarkCircleSolid}
        aria-label="Remove image"
      />
      <img src={image} alt="Selected" />
    </div>
  );
} 