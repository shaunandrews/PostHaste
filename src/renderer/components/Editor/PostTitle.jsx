import React, { useRef, useEffect } from 'react';
import styles from './Editor.module.css';

export function PostTitle({ title, onChange }) {
  const titleRef = useRef(null);

  useEffect(() => {
    // Keep the title in sync with state
    if (titleRef.current && titleRef.current.textContent !== title) {
      titleRef.current.textContent = title;
    }
  }, [title]);

  const handleTitleInput = (e) => {
    const newTitle = e.target.textContent;
    onChange({ target: { value: newTitle } });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  return (
    <div
      ref={titleRef}
      className={styles.title}
      contentEditable
      onInput={handleTitleInput}
      onPaste={handlePaste}
      role="textbox"
      aria-label="Post title"
      data-placeholder="Untitled post"
    />
  );
} 