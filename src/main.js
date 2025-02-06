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
let onboardingWindow = null;

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
        mainWindow.setSize(width, Math.max(180, height));
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

  // Add IPC handler for completing onboarding
  ipcMain.handle("complete-onboarding", async () => {
    if (onboardingWindow) {
      onboardingWindow.close();
    }
    store.set("onboardingComplete", true);
    if (!mainWindow) {
      createWindow();
    }
    createTray();
  });
}

function createWindow() {
  console.log("Creating main window...");
  mainWindow = new BrowserWindow({
    width: 480,
    height: 180,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: false,
    minHeight: 180,
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
    width: 400,
    height: 600,
    show: true,
    frame: true,
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

function createOnboardingWindow() {
  onboardingWindow = new BrowserWindow({
    width: 600,
    height: 500,
    show: true,
    frame: true,
    fullscreenable: false,
    resizable: false,
    title: "Welcome to Post Haste",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: process.env.NODE_ENV === "production",
    },
  });

  const loadURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/#/onboarding"
      : `file://${path.join(__dirname, "../dist/index.html")}#/onboarding`;

  onboardingWindow.loadURL(loadURL).catch((err) => {
    console.error("Failed to load onboarding window:", err);
  });

  onboardingWindow.on("closed", () => {
    onboardingWindow = null;
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

  // Check if onboarding is needed
  const onboardingComplete = store.get("onboardingComplete", false);
  const hasCredentials = store.has("username") && store.has("blogUrl");

  if (!onboardingComplete || !hasCredentials) {
    createOnboardingWindow();
  } else {
    createWindow();
    createTray();
    startReminderSystem();
  }

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      if (!onboardingComplete || !hasCredentials) {
        createOnboardingWindow();
      } else {
        createWindow();
      }
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
