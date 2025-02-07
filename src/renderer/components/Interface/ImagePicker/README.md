# ImagePicker

A flexible image selection component that allows users to pick multiple images with preview functionality. The component supports up to three images and provides a clean interface for adding and removing images.

## Props

| Prop             | Type            | Required | Description                                                                                |
| ---------------- | --------------- | -------- | ------------------------------------------------------------------------------------------ |
| `selectedImages` | array           | No       | Array of image URLs or file paths currently selected. Defaults to empty array              |
| `onImageSelect`  | function        | Yes      | Callback function triggered when new images are selected. Receives array of selected files |
| `onImageRemove`  | function        | Yes      | Callback function triggered when an image is removed. Receives index of removed image      |
| `fileInputRef`   | React.RefObject | Yes      | Ref object for the file input element to control file selection                            |

## Usage

```jsx
import { ImagePicker } from "../Interface/ImagePicker";
import { useRef, useState } from "react";

function PostEditor() {
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageSelect = (files) => {
    const newImages = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
  };

  const handleImageRemove = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <ImagePicker
      selectedImages={images}
      onImageSelect={handleImageSelect}
      onImageRemove={handleImageRemove}
      fileInputRef={fileInputRef}
    />
  );
}
```

## Features

- Support for multiple image selection
- Maximum of 3 images allowed
- Image preview thumbnails
- Hover-to-remove functionality
- Accepts JPEG, PNG, GIF, and WebP formats
- Responsive layout with consistent spacing
- Clean and intuitive user interface

## Styling

The component uses CSS modules for styling:

- `.imagePicker`: Main container with flex layout
- `.imageList`: Horizontal layout for selected image previews
- `.imagePreview`: Container for individual image previews with hover effects
- `.removeButton`: Overlay button for removing images with fade animation

## Notes

- Uses the `Button` component for add and remove actions
- Integrates with `iconoir-react` for consistent iconography
- Automatically resets file input after removal to allow re-selection
- Maintains aspect ratio of images in previews using object-fit
- Provides hover feedback for image removal
- Handles file type validation through input accept attribute
