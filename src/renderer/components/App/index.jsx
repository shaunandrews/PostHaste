import React from 'react';
import { Editor } from '../Editor';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.container}>
      <Editor
        onError={(msg) => console.error("Error:", msg)}
        onSuccess={(msg) => console.log("Success:", msg)}
      />
    </div>
  );
} 