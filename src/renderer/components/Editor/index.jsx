import React, { useState, useEffect, useRef } from "react";
import { Button } from "../Interface/Button";
import { ButtonToggle } from "../Interface/ButtonToggle";
import { ImagePicker } from "../Interface/ImagePicker";
import { Settings, Bold, Italic } from "lucide-react";
import { wordPressService } from "../../services/wordpress";
import { Canvas } from "./Canvas";
import { PostTitle } from "./PostTitle";
import styles from "./Editor.module.css";

const { ipcRenderer } = window.require("electron");
const Store = window.require("electron-store");
const store = new Store();

export function Editor({ onError, onSuccess, onCredentialsReset }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [showTitleField, setShowTitleField] = useState(
    store.get("showTitleField", true)
  );
  const [errorMessage, setErrorMessage] = useState("");
  const [hasSelection, setHasSelection] = useState(false);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Watch for changes to the showTitleField setting
    const handleSettingsChange = () => {
      setShowTitleField(store.get("showTitleField", true));
    };

    // Set up an interval to check for settings changes
    const interval = setInterval(handleSettingsChange, 1000);

    return () => clearInterval(interval);
  }, []);

  // Monitor container height and update window size
  useEffect(() => {
    const updateWindowHeight = () => {
      if (containerRef.current) {
        const height = containerRef.current.getBoundingClientRect().height;
        ipcRenderer.invoke("update-window-height", Math.ceil(height));
      }
    };

    // Create a ResizeObserver to watch for content changes
    const resizeObserver = new ResizeObserver(updateWindowHeight);

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial height update
    updateWindowHeight();

    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Add paste event listener to the window
    const handlePaste = async (e) => {
      const items = Array.from(e.clipboardData.items);
      const imageItems = items.filter((item) => item.type.startsWith("image/"));

      if (imageItems.length > 0) {
        e.preventDefault(); // Prevent the default paste behavior for images

        // Convert clipboard items to files and add them to the image picker
        const files = await Promise.all(
          imageItems.map(async (item) => {
            const blob = item.getAsFile();
            // Create a new file with a meaningful name
            return new File(
              [blob],
              `pasted-image-${Date.now()}.${item.type.split("/")[1]}`,
              { type: item.type }
            );
          })
        );

        handleImageSelect(files);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, []); // Empty dependency array since we don't use any state in the handler

  // Clear error message when content or title changes
  useEffect(() => {
    if (errorMessage && (content.trim() || title.trim())) {
      setErrorMessage("");
    }
  }, [content, title, errorMessage]);

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectionChange = (hasSelection) => {
    setHasSelection(hasSelection);
  };

  const isFormatActive = (command) => {
    try {
      return document.queryCommandState(command);
    } catch (e) {
      return false;
    }
  };

  const formatText = (command) => {
    document.execCommand(command, false, null);
  };

  const FormatButtons = () => {
    const [, forceUpdate] = useState({});

    useEffect(() => {
      // Set up an interval to check formatting state
      const interval = setInterval(() => {
        if (hasSelection) {
          forceUpdate({});
        }
      }, 100);

      return () => clearInterval(interval);
    }, [hasSelection]);

    if (!hasSelection) return null;

    return (
      <>
        <ButtonToggle
          icon={Bold}
          onClick={() => formatText("bold")}
          isActive={isFormatActive("bold")}
        >
          Bold
        </ButtonToggle>
        <ButtonToggle
          icon={Italic}
          onClick={() => formatText("italic")}
          isActive={isFormatActive("italic")}
        >
          Italic
        </ButtonToggle>
      </>
    );
  };

  const handleImageSelect = (files) => {
    setSelectedImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...newPreviews]);
  };

  const handleImageRemove = (index) => {
    if (imagePreviews[index]) {
      URL.revokeObjectURL(imagePreviews[index]);
    }
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSettingsClick = async () => {
    try {
      await ipcRenderer.invoke("open-settings");
    } catch (error) {
      console.error("Error opening settings:", error);
      onError("Failed to open settings");
    }
  };

  const handlePublish = async () => {
    try {
      if (!content.trim() && !title.trim()) {
        setErrorMessage("You need to write something first, silly.");
        return;
      }

      setIsPublishing(true);
      setErrorMessage("");

      let uploadedMedia = [];
      if (selectedImages.length > 0) {
        // Upload all images in parallel
        uploadedMedia = await Promise.all(
          selectedImages.map((image) => wordPressService.uploadMedia(image))
        );
      }

      await wordPressService.createPost(content, uploadedMedia, title);

      setContent("");
      setTitle("");
      // Clean up all image previews
      imagePreviews.forEach((preview) => {
        URL.revokeObjectURL(preview);
      });
      setSelectedImages([]);
      setImagePreviews([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onSuccess("Post published successfully!");
    } catch (error) {
      console.error("Publishing error:", error);
      onError("Error publishing post: " + error.message);
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {showTitleField && (
        <PostTitle title={title} onChange={handleTitleChange} />
      )}

      <Canvas
        ref={canvasRef}
        content={content}
        onChange={handleContentChange}
        onSelectionChange={handleSelectionChange}
      />

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <div className={styles.actions}>
        <div className={styles.leftActions}>
          <ImagePicker
            selectedImages={imagePreviews}
            onImageSelect={handleImageSelect}
            onImageRemove={handleImageRemove}
            fileInputRef={fileInputRef}
          />
          <FormatButtons />
        </div>

        <div className={styles.rightActions}>
          <Button
            variant="default"
            icon={Settings}
            onClick={handleSettingsClick}
            className={styles.settingsButton}
          >
            Settings
          </Button>

          <Button
            variant="primary"
            onClick={handlePublish}
            className={styles.publishButton}
          >
            {isPublishing ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>
    </div>
  );
}
