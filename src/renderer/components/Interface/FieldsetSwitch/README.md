# FieldsetSwitch

A specialized fieldset component that combines a label and description with a toggle switch control. This component is ideal for boolean settings or toggleable options in forms.

## Props

| Prop              | Type     | Required | Description                                               |
| ----------------- | -------- | -------- | --------------------------------------------------------- |
| `id`              | string   | Yes      | Unique identifier for the fieldset and switch control     |
| `label`           | string   | Yes      | Label text displayed next to the switch                   |
| `description`     | string   | No       | Optional help text displayed below the label              |
| `checked`         | boolean  | Yes      | The current state of the switch                           |
| `onCheckedChange` | function | Yes      | Callback function triggered when the switch state changes |

## Usage

```jsx
import { FieldsetSwitch } from "../Interface/FieldsetSwitch";

function SettingsForm() {
  const [isEnabled, setIsEnabled] = React.useState(false);

  return (
    <FieldsetSwitch
      id="notifications"
      label="Enable Notifications"
      description="Receive notifications when new posts are published"
      checked={isEnabled}
      onCheckedChange={setIsEnabled}
    />
  );
}
```

## Styling

The component uses CSS modules for styling with three main classes:

- `.fieldsetSwitch`: Flex container that arranges the label and switch horizontally
- `.fieldsetSwitchText`: Container for label and description with vertical layout
- `.help`: Styles the optional description text with reduced opacity

## Notes

- Uses the `Label` component for consistent label styling
- Integrates with the `Switch` component for the toggle control
- The description is only rendered when provided
- The switch is always positioned to the right of the label and description
