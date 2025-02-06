import React, { useRef, useEffect, forwardRef } from "react";
import styles from "./Editor.module.css";

export const Canvas = forwardRef(
  ({ content, onChange, onSelectionChange }, ref) => {
    const localRef = useRef(null);
    const editorRef = ref || localRef;

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

    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const hasSelection = selection.rangeCount > 0 && !selection.isCollapsed;
      onSelectionChange(hasSelection);
    };

    useEffect(() => {
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, []);

    const isValidUrl = (string) => {
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    const handlePaste = (e) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      const selection = window.getSelection();

      // Check if we have selected text and the pasted content is a URL
      if (
        selection.rangeCount > 0 &&
        !selection.isCollapsed &&
        isValidUrl(text)
      ) {
        const range = selection.getRangeAt(0);
        const selectedText = range.toString();

        // Create a link element
        const link = document.createElement("a");
        link.href = text;
        link.textContent = selectedText;
        link.target = "_blank";
        link.rel = "noopener noreferrer";

        // Replace the selection with the link
        range.deleteContents();
        range.insertNode(link);

        // Move the cursor after the link
        selection.removeAllRanges();
        const newRange = document.createRange();
        newRange.setStartAfter(link);
        newRange.setEndAfter(link);
        selection.addRange(newRange);
      } else {
        // If no selection or not a URL, just paste the text normally
        document.execCommand("insertText", false, text);
      }

      // Trigger the onChange event
      handleInput({ target: editorRef.current });
    };

    const handleKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        document.execCommand("insertLineBreak");
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
);
