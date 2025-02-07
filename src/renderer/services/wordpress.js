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

      // Ensure URL has protocol
      const normalizedUrl =
        blogUrl.startsWith("http://") || blogUrl.startsWith("https://")
          ? blogUrl
          : `https://${blogUrl}`;

      console.log(
        "Initializing WordPress API with endpoint:",
        `${normalizedUrl}/wp-json`
      );

      const credentials = await ipcRenderer.invoke("get-credentials");
      if (!credentials?.username || !credentials?.password) {
        throw new Error("WordPress credentials not found");
      }

      // Create a new WPAPI instance
      this.wp = new WPAPI({
        endpoint: `${normalizedUrl}/wp-json`,
        username: credentials.username,
        password: credentials.password,
      });

      // Test the connection
      await this.wp.users().me();
      return true;
    } catch (error) {
      console.error("WordPress API initialization failed:", {
        error: error.message,
        stack: error.stack,
        response: error.response?.status,
        endpoint: this.wp?.toString(),
      });
      throw error;
    }
  }

  async uploadMedia(file) {
    if (!this.wp) {
      await this.initialize();
    }

    try {
      console.log("Starting media upload for file:", {
        name: file.name,
        type: file.type,
        size: file.size,
      });

      // Create FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("alt_text", file.name);

      // Get the WordPress site URL and credentials
      const blogUrl = store.get("blogUrl");
      const credentials = await ipcRenderer.invoke("get-credentials");

      // Ensure URL has protocol
      const normalizedUrl =
        blogUrl.startsWith("http://") || blogUrl.startsWith("https://")
          ? blogUrl
          : `https://${blogUrl}`;

      const endpoint = `${normalizedUrl}/wp-json/wp/v2/media`;
      console.log("Uploading to endpoint:", endpoint);

      // Create the authorization header
      const authString = `${credentials.username}:${credentials.password}`;
      const base64Auth = btoa(authString);

      // Make the request directly since WPAPI doesn't handle multipart/form-data well
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Basic ${base64Auth}`,
          Accept: "application/json",
        },
        body: formData,
      });

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        console.error("Media upload failed:", {
          status: response.status,
          statusText: response.statusText,
          response: responseText,
          headers: Object.fromEntries(response.headers.entries()),
          url: endpoint,
        });

        let errorMessage = `Upload failed (${response.status})`;
        try {
          const errorJson = JSON.parse(responseText);
          if (errorJson.message) {
            errorMessage += `: ${errorJson.message}`;
          }
        } catch (e) {
          errorMessage += `: ${responseText}`;
        }

        throw new Error(errorMessage);
      }

      const media = JSON.parse(responseText);
      console.log("Media upload successful:", media);
      return media;
    } catch (error) {
      console.error("Error uploading media:", {
        error: error.message,
        stack: error.stack,
      });
      throw this.handleApiError(error);
    }
  }

  async getOrCreateTag(tagName) {
    try {
      // First try to find the tag
      const existingTags = await this.wp.tags().search(tagName);
      const matchingTag = existingTags.find(
        (tag) => tag.name.toLowerCase() === tagName.toLowerCase()
      );

      if (matchingTag) {
        return matchingTag.id;
      }

      // If tag doesn't exist, create it
      const newTag = await this.wp.tags().create({
        name: tagName,
      });

      return newTag.id;
    } catch (error) {
      console.error(`Error handling tag "${tagName}":`, error);
      return null;
    }
  }

  async createPost(content, media = null, title = "", categories = []) {
    if (!this.wp) {
      await this.initialize();
    }

    try {
      console.log(
        "Attempting to create post with endpoint:",
        this.wp.toString()
      );
      console.log("Using blog URL:", store.get("blogUrl"));

      let postContent = content;

      // Preserve HTML content by not modifying the content directly
      postContent = `<!-- wp:paragraph -->
<p>${content}</p>
<!-- /wp:paragraph -->`;

      // Handle media attachments
      if (media && (Array.isArray(media) ? media.length > 0 : media.id)) {
        // If media is an array with multiple items, create a gallery block
        if (Array.isArray(media) && media.length > 1) {
          const imageIds = media.map((item) => item.id).filter(Boolean);
          const imageSrcs = media
            .map((item) => item.source_url)
            .filter(Boolean);
          const imageAlts = media.map((item) => item.alt_text || "");

          if (imageIds.length > 0) {
            const galleryBlock = `<!-- wp:gallery {"ids":[${imageIds.join(
              ","
            )}],"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped">
${media
  .map((item, index) =>
    item.id
      ? `
  <figure class="wp-block-image size-large">
    <img src="${imageSrcs[index]}" alt="${imageAlts[index]}" class="wp-image-${item.id}" />
  </figure>`
      : ""
  )
  .filter(Boolean)
  .join("")}
</figure>
<!-- /wp:gallery -->`;

            postContent = `${postContent}\n\n${galleryBlock}`;
          }
        }
        // If it's a single image or array with one item, use the original image block format
        else {
          const singleMedia = Array.isArray(media) ? media[0] : media;
          if (singleMedia && singleMedia.id) {
            const imageBlock = `<!-- wp:image {"id":${
              singleMedia.id
            },"sizeSlug":"large"} -->
<figure class="wp-block-image size-large"><img src="${
              singleMedia.source_url
            }" alt="${singleMedia.alt_text || ""}" class="wp-image-${
              singleMedia.id
            }"/></figure>
<!-- /wp:image -->`;
            postContent = `${postContent}\n\n${imageBlock}`;
          }
        }
      }

      // Get default tags from settings and convert to array
      const defaultTags = store
        .get("defaultTags", "")
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      // Get tag IDs (create tags if they don't exist)
      const tagIds = [];
      if (defaultTags.length > 0) {
        for (const tagName of defaultTags) {
          const tagId = await this.getOrCreateTag(tagName);
          if (tagId) {
            tagIds.push(tagId);
          }
        }
      }

      // Create post with tag IDs and categories
      const post = await this.wp.posts().create({
        title: title || content.substring(0, 50) + "...",
        content: postContent,
        status: "publish",
        tags: tagIds.length > 0 ? tagIds : undefined,
        categories: categories.length > 0 ? categories : undefined,
      });

      return post;
    } catch (error) {
      console.error("Error creating post:", error);
      console.error("Full error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        message: error.message,
        endpoint: this.wp?.toString(),
      });
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

  async getSiteIcon() {
    try {
      if (!this.wp) {
        await this.initialize();
      }

      const blogUrl = store.get("blogUrl");
      if (!blogUrl) {
        throw new Error("Blog URL not configured");
      }

      // First check if we have a cached icon
      const cachedIcon = store.get("siteIcon");
      if (cachedIcon) {
        // Verify the icon is still accessible
        try {
          const response = await fetch(cachedIcon);
          if (response.ok) {
            return cachedIcon;
          }
        } catch (e) {
          // Icon not accessible, continue to fetch new one
        }
      }

      // Ensure URL has protocol
      const normalizedUrl =
        blogUrl.startsWith("http://") || blogUrl.startsWith("https://")
          ? blogUrl
          : `https://${blogUrl}`;

      // First try to get the site icon from the REST API
      const response = await fetch(`${normalizedUrl}/wp-json/`);
      const siteData = await response.json();

      let iconUrl = null;
      if (siteData?.site_icon_url) {
        iconUrl = siteData.site_icon_url;
      } else {
        // If no site icon in REST API, try to fetch the favicon
        const faviconUrl = `${normalizedUrl}/favicon.ico`;
        const faviconResponse = await fetch(faviconUrl);
        if (faviconResponse.ok) {
          iconUrl = faviconUrl;
        }
      }

      // Store the icon URL if we found one
      if (iconUrl) {
        store.set("siteIcon", iconUrl);
      } else {
        store.delete("siteIcon");
      }

      return iconUrl;
    } catch (error) {
      console.error("Error fetching site icon:", error);
      return store.get("siteIcon", null); // Fall back to cached icon if fetch fails
    }
  }

  async getCategories() {
    try {
      if (!this.wp) {
        await this.initialize();
      }

      console.log("Fetching categories from WordPress");

      // Fetch all categories with their id, name, slug, and post count
      const categories = await this.wp
        .categories()
        .param("per_page", 100)
        .get();

      // Transform the response to a simpler format
      const formattedCategories = categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        count: category.count,
        parent: category.parent,
      }));

      console.log(`Found ${formattedCategories.length} categories`);
      return formattedCategories;
    } catch (error) {
      console.error("Error fetching categories:", error);
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
