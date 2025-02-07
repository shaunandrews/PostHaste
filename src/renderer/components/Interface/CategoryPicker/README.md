# CategoryPicker

A dropdown component for selecting multiple categories from a list. Designed for use with WordPress categories but can be used with any category-like data structure.

## Usage

The CategoryPicker component provides a button that opens a dropdown menu of selectable categories. Users can select multiple categories, and the button text updates to show the current selection state.

```jsx
<CategoryPicker
  categories={categories}
  selectedCategories={selectedCategories}
  onSelectionChange={handleCategoryChange}
  onError={handleError}
/>
```

## Props

- `categories`: Array of category objects with `id` and `name` properties
- `selectedCategories`: Array of currently selected category objects
- `onSelectionChange`: Callback function that receives the new array of selected categories
- `onError`: Optional callback function for handling error states

## Features

- Multiple category selection
- Smart dropdown positioning (adjusts based on viewport space)
- Visual feedback for selected items
- Responsive to window resizing
- Keyboard accessible
- Uses system theme variables for consistent styling
