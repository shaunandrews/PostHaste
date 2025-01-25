import WPAPI from "wpapi";
import { ipcRenderer } from "electron";
import Store from "electron-store";

const store = new Store();

class WordPressService {
  constructor() {
    this.wp = null;
  }

  async initialize() {
    try {
      const blogUrl = store.get("blogUrl");
      if (!blogUrl) {
        throw new Error("Blog URL not configured");
      }

      const credentials = await ipcRenderer.invoke("get-credentials");
      if (!credentials?.username || !credentials?.password) {
        throw new Error("WordPress credentials not found");
      }

      // Create a new WPAPI instance
      this.wp = new WPAPI({
        endpoint: `${blogUrl}/wp-json`,
        username: credentials.username,
        password: credentials.password,
      });

      // Test the connection
      await this.wp.users().me();
      return true;
    } catch (error) {
      console.error("WordPress API initialization failed:", error);
      throw error;
    }
  }

  async createPost(content) {
    if (!this.wp) {
      await this.initialize();
    }

    try {
      const post = await this.wp.posts().create({
        title: content.substring(0, 50) + "...",
        content: content,
        status: "publish",
      });

      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      throw this.handleApiError(error);
    }
  }

  async testConnection() {
    try {
      await this.initialize();
      const user = await this.wp.users().me();
      return user;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  handleApiError(error) {
    if (error.response?.status === 401) {
      return new Error(
        "Authentication failed. Please check your credentials in settings."
      );
    } else if (error.response?.status === 404) {
      return new Error(
        "WordPress API not found. Please check your blog URL in settings."
      );
    } else if (
      error.message.includes("Failed to fetch") ||
      error.code === "ENOTFOUND"
    ) {
      return new Error(
        "Could not connect to the WordPress site. Please check the URL and make sure the site is accessible."
      );
    }

    return error;
  }
}

export const wordPressService = new WordPressService();
