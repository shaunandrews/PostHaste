# FormatButtons

A floating text formatting toolbar component that provides bold and italic formatting options. The component appears when text is selected and tracks the current formatting state of the selection.

## Props

| Prop           | Type     | Required | Description                                                                                                            |
| -------------- | -------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `hasSelection` | boolean  | Yes      | Indicates whether text is currently selected                                                                           |
| `onFormat`     | function | Yes      | Callback function triggered when a formatting button is clicked. Receives format type ('bold' or 'italic') as argument |

## Usage

```jsx
import { FormatButtons } from "../Interface/FormatButtons";

function Editor() {
  const [hasSelection, setHasSelection] = React.useState(false);

  const handleFormat = (formatType) => {
    document.execCommand(formatType);
  };

  const handleSelectionChange = () => {
    setHasSelection(window.getSelection().toString().length > 0);
  };

  return (
    <div onMouseUp={handleSelectionChange}>
      <FormatButtons hasSelection={hasSelection} onFormat={handleFormat} />
      <div contentEditable>Select some text to format it.</div>
    </div>
  );
}
```

## Styling

The component uses CSS modules for styling:

- `.container`: Flex container for the formatting buttons with a left border separator

## Features

- Automatically shows/hides based on text selection
- Real-time formatting state tracking
- Supports bold and italic text formatting
- Uses Lucide React icons for consistent styling
- Integrates with the `ButtonToggle` component for toggle state

## Notes

- Uses `document.queryCommandState` to track active formatting
- Updates formatting state every 100ms while text is selected
- Cleans up interval on component unmount
- Renders nothing when no text is selected
