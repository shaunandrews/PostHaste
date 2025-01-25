const {
  app,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
  screen,
} = require("electron");
const path = require("path");
const Store = require("electron-store");
const keytar = require("keytar");
const notifier = require("node-notifier");

// Initialize store for app settings
const store = new Store();

let tray = null;
let mainWindow = null;
let settingsWindow = null;

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

  // IPC handler for opening settings window
  ipcMain.handle("open-settings", () => {
    if (settingsWindow) {
      settingsWindow.focus();
    } else {
      createSettingsWindow();
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
}

function createWindow() {
  console.log("Creating main window...");
  mainWindow = new BrowserWindow({
    width: 480,
    height: 200,
    show: false,
    frame: false,
    fullscreenable: false,
    resizable: true,
    skipTaskbar: true,
    minHeight: 200,
    maxHeight: Math.round(screen.getPrimaryDisplay().workAreaSize.height * 0.8),
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
      mainWindow.setPosition(Math.round(x - 240), Math.round(yPosition));
      mainWindow.show();
    }
  });
}

function createSettingsWindow() {
  settingsWindow = new BrowserWindow({
    width: 800,
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

// Reminder notification
function scheduleReminder() {
  const enabled = store.get("enableReminders", false);
  const time = store.get("reminderTime", "09:00");

  if (enabled) {
    const [hours, minutes] = time.split(":");
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(parseInt(hours), parseInt(minutes), 0);

    if (reminderTime < now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const delay = reminderTime - now;
    setTimeout(() => {
      notifier.notify({
        title: "Post Haste",
        message: "Time to write a new post!",
        sound: true,
        wait: true,
      });
      scheduleReminder(); // Schedule next reminder
    }, delay);
  }
}

// Initialize app
app.whenReady().then(() => {
  registerIpcHandlers();
  createWindow();
  createTray();
  scheduleReminder();

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

// IPC handlers for WordPress interactions will go here
