# Button Component

A flexible and reusable button component that supports both text and icon-only variants.

## Features

- Multiple variants (default, primary)
- Icon support with optional text
- Icon-only mode with tooltip
- Customizable icon size
- Forward ref support
- Custom class name support

## Usage

```jsx
import { Button } from './Button';
import { IconName } from '../path-to-icons';

// Basic text button
<Button>Click me</Button>

// Primary variant
<Button variant="primary">Submit</Button>

// Button with icon and text
<Button icon={IconName}>
  With Icon
</Button>

// Icon-only button with tooltip
<Button
  icon={IconName}
  title="Tooltip text"
/>

// Custom icon size
<Button
  icon={IconName}
  iconProps={{ width: 24, height: 24 }}
>
  Larger Icon
</Button>
```

## Props

| Prop        | Type                     | Default                     | Description                                   |
| ----------- | ------------------------ | --------------------------- | --------------------------------------------- |
| `variant`   | `'default' \| 'primary'` | `'default'`                 | The visual style variant of the button        |
| `icon`      | `Component`              | `undefined`                 | Optional icon component to display            |
| `iconProps` | `object`                 | `{ width: 20, height: 20 }` | Props passed to the icon component            |
| `className` | `string`                 | `''`                        | Additional CSS class names                    |
| `title`     | `string`                 | `undefined`                 | Tooltip text (required for icon-only buttons) |
| `children`  | `ReactNode`              | `undefined`                 | Button content                                |

All other props are passed directly to the underlying `<button>` element.

## Notes

- When providing both an icon and no children (or only a title), the button will render in icon-only mode
- Icon-only buttons will use either the `title` prop or `children` as tooltip text
- Invalid variants will fall back to the default variant with a console warning
- The component uses CSS modules for styling
