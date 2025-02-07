import React, { useState, useEffect, useRef, forwardRef } from "react";
import { createPortal } from "react-dom";
import { FolderOpen } from "lucide-react";
import { Button } from "../Button";
import styles from "./CategoryPicker.module.css";

export const CategoryPicker = forwardRef(function CategoryPicker(
  { categories = [], selectedCategories = [], onSelectionChange, onError },
  ref
) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);
  const listRef = useRef(null);

  // Handle list scrolling
  const handleScroll = (event) => {
    const scrollTop = event.target.scrollTop;
    setIsScrolled(scrollTop > 0);
  };

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
    return "Categories";
  };

  const getTooltipText = () => {
    if (selectedCategories.length <= 1) return undefined;
    return selectedCategories.map((cat) => cat.name).join(", ");
  };

  const renderDropdown = () => {
    if (!showDropdown || categories.length === 0) return null;

    return createPortal(
      <div className={styles.categoryDropdown}>
        <div
          className={`${styles.header} ${
            isScrolled ? styles.headerScrolled : ""
          }`}
        >
          <h2 className={styles.heading}>Categories</h2>
          <Button
            variant="default"
            onClick={() => setShowDropdown(false)}
            className={styles.closeButton}
            title="Close categories"
          >
            Done
          </Button>
        </div>
        <div
          className={styles.categoryList}
          onScroll={handleScroll}
          ref={listRef}
        >
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
      >
        {getButtonText()}
      </Button>
      {selectedCategories.length > 1 && (
        <span className={styles.selectedCount}>
          {selectedCategories.length}
        </span>
      )}
      {renderDropdown()}
    </div>
  );
});
