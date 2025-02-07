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

      // Only trigger if the selection is within our canvas element
      if (hasSelection) {
        const range = selection.getRangeAt(0);
        const isWithinCanvas = editorRef.current.contains(
          range.commonAncestorContainer
        );
        onSelectionChange(hasSelection && isWithinCanvas);
      } else {
        onSelectionChange(false);
      }
    };

    useEffect(() => {
      document.addEventListener("selectionchange", handleSelectionChange);
      return () => {
        document.removeEventListener("selectionchange", handleSelectionChange);
      };
    }, []);

    const isValidUrl = (string) => {
      // First, check if it's already a valid URL
      try {
        new URL(string);
        return true;
      } catch (_) {
        // If not a valid URL, check if it looks like a domain
        const domainPattern =
          /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
        return domainPattern.test(string);
      }
    };

    const formatUrl = (url) => {
      // If the URL doesn't start with a protocol, add https://
      if (!url.match(/^[a-zA-Z]+:\/\//)) {
        return `https://${url}`;
      }
      return url;
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
        const formattedUrl = formatUrl(text);
        link.href = formattedUrl;
        link.textContent = selectedText;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("data-tooltip", formattedUrl);

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
