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

## Interface Components

Post Haste uses a component-based architecture with reusable interface elements designed for consistency and accessibility:

### Basic Inputs

A collection of foundational components that handle user interactions:

- Buttons with consistent styling and behavior patterns
- Text inputs with optional icon support
- Multi-line text areas for content
- Toggle switches for boolean settings
- Accessible labels integrated with form controls

### Form Organization

Higher-level components that provide structure and context:

- Fieldsets for grouping related form elements
- Combined field and switch components for settings
- Image handling with preview capabilities and multi-select support

## Editor Height Management

The editor implements an adaptive height system that provides a fluid user experience while maintaining consistent boundaries:

### Design Principles

- Window starts compact but expands naturally with content
- Maintains minimum height to prevent cramped interface
- Caps maximum height to ensure manageable window size
- Uses fixed width to maintain clean, focused interface

### Implementation Strategy

The system uses a three-layer approach:

1. **Window Layer** - Handles core window constraints and behavior
2. **Container Layer** - Manages layout and spacing requirements
3. **Content Layer** - Monitors and responds to content changes

The height adjustment process uses inter-process communication to ensure smooth coordination between the interface and window management systems.

## Settings System

Post Haste employs a dual-storage settings system that balances security with accessibility:

### Storage Strategy

- Regular settings stored locally for quick access
- Sensitive data (credentials) secured in system keychain
- Settings loaded on startup with smart defaults

### Settings Categories

1. **WordPress Connection**

   - Site configuration
   - User authentication
   - Secure credential management

2. **User Preferences**
   - Notification preferences
   - Interface customization
   - Content defaults

### Design Principles

- Settings changes apply immediately when possible
- Secure storage for sensitive information
- Persistent storage with fallback defaults
- Clear separation between UI and data storage

### Extending Settings

The settings system is designed for extensibility:

1. Define the setting's data structure
2. Add appropriate UI controls
3. Implement storage handling
4. Add any necessary IPC communication

## WordPress Service

A service-oriented architecture for WordPress integration:

### Design Philosophy

- Separation of concerns between UI and WordPress operations
- Consistent error handling and recovery
- Smart content formatting for WordPress blocks
- Efficient media handling

### Core Services

1. **Connection Management**

   - Smart URL handling and normalization
   - Credential validation and security
   - Connection state management

2. **Content Publishing**

   - Intelligent content formatting
   - Block-based content structure
   - Automatic tag management
   - Media integration

3. **Media Handling**
   - Support for single and multiple uploads
   - Preview generation
   - Gallery creation
   - Error recovery

### Error Management

The service implements a comprehensive error handling strategy:

- Authentication failures
- Network connectivity issues
- API compatibility problems
- User-friendly error messages

### Extensibility

The service layer is designed for extension through:

- Modular service architecture
- Consistent patterns for new features
- Standardized error handling
- Clear separation of concerns

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
