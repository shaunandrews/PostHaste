# Fieldset

A reusable form fieldset component that provides a consistent layout for form fields with labels and optional descriptions.

## Props

| Prop          | Type            | Required | Description                                                                        |
| ------------- | --------------- | -------- | ---------------------------------------------------------------------------------- |
| `id`          | string          | Yes      | Unique identifier for the fieldset, used to associate the label with form controls |
| `label`       | string          | Yes      | Label text displayed above the form field                                          |
| `children`    | React.ReactNode | Yes      | Content to be rendered within the fieldset (typically form controls)               |
| `description` | string          | No       | Optional help text displayed below the form field                                  |

## Usage

```jsx
import { Fieldset } from "../Interface/Fieldset";

function MyForm() {
  return (
    <Fieldset
      id="title"
      label="Post Title"
      description="Enter a descriptive title for your post"
    >
      <input type="text" id="title" placeholder="Enter title..." />
    </Fieldset>
  );
}
```

## Styling

The component uses CSS modules for styling with two main classes:

- `.fieldset`: Provides a flex container with column direction and consistent spacing
- `.help`: Styles the optional description text with reduced opacity for visual hierarchy

## Notes

- The component uses the `Label` component internally to maintain consistent label styling
- Form fields should be passed as children to maintain flexibility
- The description is only rendered when provided
