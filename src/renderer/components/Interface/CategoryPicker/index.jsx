import React, { useState, useEffect, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { FolderOpen, Check, X } from "lucide-react";
import { Button } from "../Button";
import styles from "./CategoryPicker.module.css";

export const CategoryPicker = forwardRef(function CategoryPicker(
  { categories = [], selectedCategories = [], onSelectionChange, onError },
  ref
) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest(`.${styles.categoryDropdown}`)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const updateDropdownPosition = () => {
    if (buttonRef.current && showDropdown) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const dropdownHeight = 300; // max-height of dropdown

      // Calculate if dropdown would go below viewport
      const spaceBelow = viewportHeight - buttonRect.bottom;
      const shouldShowAbove =
        spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight;

      setDropdownPosition({
        top: shouldShowAbove
          ? buttonRect.top - dropdownHeight
          : buttonRect.bottom,
        left: Math.min(buttonRect.left, window.innerWidth - 200), // Ensure dropdown doesn't go off-screen horizontally
      });
    }
  };

  useEffect(() => {
    if (showDropdown) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
      return () => window.removeEventListener("resize", updateDropdownPosition);
    }
  }, [showDropdown]);

  const toggleCategory = (category) => {
    const newSelection = selectedCategories.some(
      (cat) => cat.id === category.id
    )
      ? selectedCategories.filter((cat) => cat.id !== category.id)
      : [...selectedCategories, category];
    onSelectionChange(newSelection);
  };

  const getButtonText = () => {
    if (selectedCategories.length === 0) {
      return "Categories";
    }
    if (selectedCategories.length === 1) {
      return selectedCategories[0].name;
    }
    return (
      <>
        Categories
        <span className={styles.selectedCount}>
          {selectedCategories.length}
        </span>
      </>
    );
  };

  const getTooltipText = () => {
    if (selectedCategories.length <= 1) return undefined;
    return selectedCategories.map((cat) => cat.name).join(", ");
  };

  const renderDropdown = () => {
    if (!showDropdown || categories.length === 0) return null;

    return createPortal(
      <div className={styles.categoryDropdown}>
        <Button
          variant="default"
          onClick={() => setShowDropdown(false)}
          className={styles.closeButton}
          icon={X}
          title="Close"
        />
        <div className={styles.categoryList}>
          {categories.map((category) => {
            const isSelected = selectedCategories.some(
              (cat) => cat.id === category.id
            );
            return (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  isSelected ? styles.selected : ""
                }`}
                onClick={() => toggleCategory(category)}
              >
                {category.name}
                {isSelected && <Check size={16} />}
              </div>
            );
          })}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <div className={styles.categorySelector} ref={ref}>
      <Button
        variant="default"
        icon={FolderOpen}
        onClick={() => {
          setShowDropdown(!showDropdown);
          setTimeout(updateDropdownPosition, 0);
        }}
        ref={buttonRef}
        title={getTooltipText() || "Categories"}
      />
      {renderDropdown()}
    </div>
  );
});
