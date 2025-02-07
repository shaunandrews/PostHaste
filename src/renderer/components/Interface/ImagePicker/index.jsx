import React from "react";
import { MediaImage } from "iconoir-react";
import { Button } from "../Button";
import { SelectedImage } from "./SelectedImage";
import styles from "./ImagePicker.module.css";

export function ImagePicker({
  selectedImages = [],
  onImageSelect,
  onImageRemove,
  fileInputRef,
}) {
  const handleImageClick = (index) => {
    if (typeof index === "number") {
      onImageRemove(index);
      // Reset the file input value so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onImageSelect(files);
    }
  };

  return (
    <div className={styles.imagePicker}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageSelect}
        accept="image/jpeg,image/png,image/gif,image/webp"
        style={{ display: "none" }}
        multiple
      />

      {selectedImages.length > 0 && (
        <div className={styles.imageList}>
          {selectedImages.map((image, index) => (
            <SelectedImage
              key={index}
              image={image}
              onClick={() => handleImageClick(index)}
            />
          ))}
        </div>
      )}

      {selectedImages.length < 5 && (
        <Button
          variant="default"
          onClick={() => handleImageClick()}
          icon={MediaImage}
          title={
            selectedImages.length > 0 ? "Add more images" : "Select images"
          }
        />
      )}
    </div>
  );
}
