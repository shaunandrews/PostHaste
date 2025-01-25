# Post Haste

A macOS menu bar application for quickly publishing posts to your WordPress blog.

## Features

- Quick post publishing from the menu bar
- Secure WordPress credentials storage using macOS Keychain
- Configurable reminders to encourage consistent blogging
- Simple and intuitive interface

## Prerequisites

- macOS 10.13 or later
- Node.js 14 or later
- A WordPress site with REST API enabled
- WordPress Application Password (not your regular login password)

## Installation

1. Clone this repository:

```bash
git clone https://github.com/yourusername/post-haste.git
cd post-haste
```

2. Install dependencies:

```bash
npm install
```

3. Start the application:

```bash
npm start
```

## Setup

1. Click the Post Haste icon in your menu bar
2. Click "Settings"
3. Enter your WordPress site URL (e.g., https://yourblog.com)
4. Enter your WordPress username
5. Enter your WordPress Application Password
6. Optionally enable and configure reminders
7. Click "Save Settings"

## Creating an Application Password

1. Log in to your WordPress admin panel
2. Go to Users → Profile
3. Scroll down to "Application Passwords"
4. Enter a name for the application (e.g., "Post Haste")
5. Click "Add New Application Password"
6. Copy the generated password and use it in Post Haste's settings

## Development

To build the application for distribution:

```bash
npm run make
```

## License

MIT License - see LICENSE file for details
