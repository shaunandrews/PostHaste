const { ipcRenderer } = require("electron");
const Store = require("electron-store");
const store = new Store();

// DOM Elements
const postContent = document.getElementById("post-content");
const publishButton = document.getElementById("publish-button");
const toggleSettings = document.getElementById("toggle-settings");
const settingsForm = document.getElementById("settings-form");
const blogUrl = document.getElementById("blog-url");
const username = document.getElementById("username");
const appPassword = document.getElementById("app-password");
const enableReminders = document.getElementById("enable-reminders");
const reminderTime = document.getElementById("reminder-time");
const saveSettings = document.getElementById("save-settings");
const statusMessage = document.getElementById("status-message");

// Onboarding Elements
const onboardingOverlay = document.getElementById("onboarding");
const step1Next = document.getElementById("step-1-next");
const step2Next = document.getElementById("step-2-next");
const finishOnboarding = document.getElementById("finish-onboarding");
const onboardingBlogUrl = document.getElementById("onboarding-blog-url");
const onboardingUsername = document.getElementById("onboarding-username");
const onboardingPassword = document.getElementById("onboarding-password");
const onboardingReminders = document.getElementById("onboarding-reminders");
const onboardingReminderTime = document.getElementById(
  "onboarding-reminder-time"
);

// Check if onboarding is needed
async function checkOnboarding() {
  try {
    console.log("Checking onboarding status...");
    const savedBlogUrl = store.get("blogUrl");
    console.log("Saved blog URL:", savedBlogUrl);

    let credentials = null;
    try {
      credentials = await ipcRenderer.invoke("get-credentials");
    } catch (error) {
      console.log("No credentials found:", error.message);
    }

    console.log(
      "Credentials check:",
      credentials?.username ? "found" : "not found"
    );

    if (!savedBlogUrl || !credentials?.username) {
      console.log("Showing onboarding overlay");
      showOnboarding();
    } else {
      console.log("No onboarding needed");
    }
  } catch (error) {
    console.error("Error in checkOnboarding:", error);
    // Show onboarding anyway if there's an error
    showOnboarding();
  }
}

function showOnboarding() {
  onboardingOverlay.classList.add("visible");
}

function hideOnboarding() {
  onboardingOverlay.classList.remove("visible");
}

function showOnboardingStep(stepNumber) {
  document.querySelectorAll(".onboarding-step").forEach((step) => {
    step.classList.remove("active");
  });
  document.getElementById(`step-${stepNumber}`).classList.add("active");
}

// Onboarding navigation
step1Next.addEventListener("click", () => {
  const url = onboardingBlogUrl.value.trim();
  if (!url) {
    showStatus("Please enter your WordPress URL", "error");
    return;
  }
  store.set("blogUrl", url);
  showOnboardingStep(2);
});

step2Next.addEventListener("click", async () => {
  const username = onboardingUsername.value.trim();
  const password = onboardingPassword.value.trim();

  if (!username || !password) {
    showStatus("Please enter both username and password", "error");
    return;
  }

  try {
    store.set("username", username);
    await ipcRenderer.invoke("save-credentials", { username, password });
    showOnboardingStep(3);
  } catch (error) {
    showStatus("Error saving credentials: " + error.message, "error");
  }
});

finishOnboarding.addEventListener("click", () => {
  store.set("enableReminders", onboardingReminders.checked);
  store.set("reminderTime", onboardingReminderTime.value);
  hideOnboarding();
  loadSettings();
  showStatus("Setup completed successfully!", "success");
});

// Load saved settings
function loadSettings() {
  blogUrl.value = store.get("blogUrl", "");
  username.value = store.get("username", "");
  enableReminders.checked = store.get("enableReminders", false);
  reminderTime.value = store.get("reminderTime", "09:00");
}

// Save settings
async function saveSettingsHandler() {
  try {
    store.set("blogUrl", blogUrl.value);
    store.set("username", username.value);
    store.set("enableReminders", enableReminders.checked);
    store.set("reminderTime", reminderTime.value);

    // Save app password securely
    if (appPassword.value) {
      await ipcRenderer.invoke("save-credentials", {
        username: username.value,
        password: appPassword.value,
      });
      appPassword.value = "";
    }

    showStatus("Settings saved successfully!", "success");
  } catch (error) {
    showStatus("Error saving settings: " + error.message, "error");
  }
}

// Publish post
async function publishPost() {
  try {
    const content = postContent.value.trim();
    if (!content) {
      showStatus("Please write something before publishing.", "error");
      return;
    }

    publishButton.disabled = true;
    const credentials = await ipcRenderer.invoke("get-credentials");

    const response = await fetch(
      `${store.get("blogUrl")}/wp-json/wp/v2/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " + btoa(`${credentials.username}:${credentials.password}`),
        },
        body: JSON.stringify({
          title: content.substring(0, 50) + "...",
          content: content,
          status: "publish",
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to publish post");
    }

    postContent.value = "";
    showStatus("Post published successfully!", "success");
  } catch (error) {
    showStatus("Error publishing post: " + error.message, "error");
  } finally {
    publishButton.disabled = false;
  }
}

// Show status message
function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status ${type}`;
  setTimeout(() => {
    statusMessage.className = "status";
  }, 3000);
}

// Event Listeners
toggleSettings.addEventListener("click", () => {
  settingsForm.classList.toggle("visible");
});

saveSettings.addEventListener("click", saveSettingsHandler);
publishButton.addEventListener("click", publishPost);

// Initialize
document.addEventListener("DOMContentLoaded", async () => {
  loadSettings();
  await checkOnboarding();
});
