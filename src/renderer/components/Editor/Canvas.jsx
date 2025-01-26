import React, { useRef, useEffect } from 'react';
import styles from './Editor.module.css';

export function Canvas({ content, onChange }) {
  const editorRef = useRef(null);

  useEffect(() => {
    // Keep the editor content in sync with the content prop
    if (editorRef.current && editorRef.current.textContent !== content) {
      editorRef.current.textContent = content;
    }
  }, [content]);

  const handleInput = (e) => {
    const newContent = e.target.textContent;
    onChange({ target: { value: newContent } });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const text = e.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      document.execCommand('insertLineBreak');
    }
  };

  return (
      <div
        ref={editorRef}
        className={styles.canvas}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        role="textbox"
        aria-multiline="true"
        aria-label="Post content"
        data-placeholder="What's on your mind?"
      />
  );
} 