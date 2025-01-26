const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
  screen,
  Notification,
  systemPreferences,
} = require("electron");
const path = require("path");
const Store = require("electron-store");
const keytar = require("keytar");
const notifier = require("node-notifier");

// Disable security warnings in development
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

// Initialize store for app settings
const store = new Store();

let tray = null;
let mainWindow = null;
let settingsWindow = null;
let reminderInterval = null;

// Service name for keytar
const SERVICE_NAME = "post-haste-wp";

// Register IPC handlers
function registerIpcHandlers() {
  // IPC handlers for credentials
  ipcMain.handle("save-credentials", async (event, { username, password }) => {
    try {
      await keytar.setPassword(SERVICE_NAME, username, password);
      return true;
    } catch (error) {
      console.error("Error saving credentials:", error);
      throw error;
    }
  });

  ipcMain.handle("get-credentials", async () => {
    try {
      const username = store.get("username");
      if (!username) {
        throw new Error("Username not found");
      }
      const password = await keytar.getPassword(SERVICE_NAME, username);
      if (!password) {
        throw new Error("Password not found");
      }
      return { username, password };
    } catch (error) {
      console.error("Error getting credentials:", error);
      throw error;
    }
  });

  ipcMain.handle("delete-credentials", async (event, username) => {
    try {
      await keytar.deletePassword(SERVICE_NAME, username);
      return true;
    } catch (error) {
      console.error("Error deleting credentials:", error);
      throw error;
    }
  });

  // IPC handler for opening settings window
  ipcMain.handle("open-settings", () => {
    if (settingsWindow) {
      settingsWindow.focus();
    } else {
      createSettingsWindow();
    }
  });

  // IPC handler for closing settings window
  ipcMain.handle("close-settings", () => {
    if (settingsWindow) {
      settingsWindow.close();
    }
  });

  // IPC handler for setting window always-on-top
  ipcMain.handle("set-always-on-top", async (event, shouldBeOnTop) => {
    try {
      if (mainWindow) {
        mainWindow.setAlwaysOnTop(shouldBeOnTop);
        store.set("keepOnTop", shouldBeOnTop);

        // If turning off always-on-top and window isn't focused, hide it
        if (!shouldBeOnTop && !mainWindow.isFocused()) {
          mainWindow.hide();
        }

        return true;
      }
      return false;
    } catch (error) {
      console.error("Error setting always-on-top:", error);
      throw error;
    }
  });

  // IPC handler for updating window height
  ipcMain.handle("update-window-height", async (event, height) => {
    try {
      if (mainWindow) {
        const [width] = mainWindow.getSize();
        mainWindow.setSize(width, Math.max(240, height));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error updating window height:", error);
      throw error;
    }
  });

  // Add IPC handler for reminder settings changes
  ipcMain.handle("update-reminder-settings", async () => {
    startReminderSystem();
  });

  // Add IPC handler for notification permission request
  ipcMain.handle("request-notification-permission", async () => {
    // On macOS, we need to check if the app has notification permissions
    if (process.platform === "darwin") {
      // Create a test notification to trigger the permission request
      const notification = new Notification({
        title: "PostHaste",
        body: "Thanks for enabling notifications!",
      });
      notification.show();
      return true;
    }

    // On Windows and Linux, notifications are enabled by default
    return true;
  });
}

function createWindow() {
  console.log("Creating main window...");
  mainWindow = new BrowserWindow({
    width: 480,
    height: 220,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    minHeight: 220,
    maxHeight: 800,
    enableLargerThanScreen: false,
    skipTaskbar: true,
    movable: true,
    alwaysOnTop: store.get("keepOnTop", false),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === "production",
    },
  });

  console.log("Development mode:", process.env.NODE_ENV);

  const loadURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../dist/index.html")}`;

  console.log("Loading URL:", loadURL);

  // Wait a bit in development to ensure webpack server is ready
  if (process.env.NODE_ENV === "development") {
    setTimeout(() => {
      mainWindow.loadURL(loadURL).catch((err) => {
        console.error("Failed to load development URL:", err);
        console.log("Falling back to production build...");
        mainWindow
          .loadFile(path.join(__dirname, "../dist/index.html"))
          .catch((err) => {
            console.error("Failed to load fallback:", err);
          });
      });
    }, 2000); // Wait 2 seconds for webpack server
  } else {
    mainWindow
      .loadFile(path.join(__dirname, "../dist/index.html"))
      .catch((err) => {
        console.error("Failed to load production build:", err);
      });
  }

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("Window loaded successfully");
  });

  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription) => {
      console.error("Failed to load window:", { errorCode, errorDescription });
    }
  );

  // Add error handler for window creation
  mainWindow.on("error", (error) => {
    console.error("Window error:", error);
  });

  // Log any console messages from the renderer
  mainWindow.webContents.on(
    "console-message",
    (event, level, message, line, sourceId) => {
      console.log("Renderer Console:", { level, message, line, sourceId });
    }
  );

  // Handle window blur
  mainWindow.on("blur", () => {
    if (!store.get("keepOnTop", false) && mainWindow?.isVisible()) {
      mainWindow.hide();
    }
  });

  // Handle window close
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function createTray() {
  const icon = nativeImage
    .createFromPath(path.join(__dirname, "assets", "icon.png"))
    .resize({ width: 16, height: 16 });

  // For dark mode support
  icon.setTemplateImage(true);

  tray = new Tray(icon);
  tray.setToolTip("Post Haste");

  tray.on("click", (event, bounds) => {
    if (!mainWindow) {
      createWindow();
    }

    const { x, y } = bounds;
    const { height: windowHeight } = mainWindow.getBounds();
    const yPosition = process.platform === "darwin" ? y + 20 : y - windowHeight;

    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.setPosition(Math.round(x - 220), Math.round(yPosition));
      mainWindow.show();
    }
  });
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: false,
    fullscreenable: false,
    resizable: false,
    title: "Post Haste Settings",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === "production",
    },
  });

  const loadURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/#/settings"
      : `file://${path.join(__dirname, "../dist/index.html")}#/settings`;

  settingsWindow.loadURL(loadURL).catch((err) => {
    console.error("Failed to load settings window:", err);
  });

  settingsWindow.on("closed", () => {
    settingsWindow = null;
  });
}

function startReminderSystem() {
  // Clear any existing interval
  if (reminderInterval) {
    clearInterval(reminderInterval);
  }

  const isEnabled = store.get("enableReminders", false);
  const frequency = store.get("reminderFrequency", 30);

  if (!isEnabled) {
    return;
  }

  // Convert minutes to milliseconds
  const interval = frequency * 60 * 1000;

  reminderInterval = setInterval(() => {
    // Don't show notification if the editor is already open
    if (mainWindow && mainWindow.isVisible()) {
      return;
    }

    notifier.notify(
      {
        title: "Time to Write!",
        message: "Click here to start writing a new post",
        icon: path.join(__dirname, "assets", "icon.png"),
        timeout: 30,
        wait: true,
        appID: "PostHaste", // Set the app identifier
        sound: true, // Enable notification sound
      },
      function (err, response, metadata) {
        // If user clicked the notification, show the editor
        if (response === "activate") {
          if (!mainWindow) {
            createWindow();
          }
          // Position window in the center of the screen
          const { width, height } = screen.getPrimaryDisplay().workAreaSize;
          const [winWidth, winHeight] = mainWindow.getSize();
          mainWindow.setPosition(
            Math.round((width - winWidth) / 2),
            Math.round((height - winHeight) / 2)
          );
          mainWindow.show();
        }
      }
    );
  }, interval);
}

// Initialize app
app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();
  createTray();
  startReminderSystem(); // Start the reminder system when app is ready

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
