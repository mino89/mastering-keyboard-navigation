# JavaScript Architecture Documentation

This document explains the modular structure of the accessibility JavaScript code.

## File Structure

```
src/scripts/
├── main.js                              # Main entry point and application coordinator
├── components/                          # Individual UI component classes
│   ├── AccessibleMegaMenu.js           # Full-width mega menu navigation
│   ├── AccessibleDropdown.js           # Traditional dropdown navigation (legacy)
│   ├── AccessibleSearch.js             # Enhanced search functionality
│   └── AccessibleProductCard.js        # Product card accessibility features
└── utils/                               # Utility classes and helpers
    ├── FocusManager.js                  # Focus management utilities
    └── KeyboardShortcuts.js             # Global keyboard shortcuts handler
```

## Components Overview

### Main Application (`main.js`)

- **Purpose**: Central coordinator for all accessibility features
- **Responsibilities**:
  - Import and initialize all components
  - Coordinate application startup
  - Provide unified export interface

### Mega Menu (`AccessibleMegaMenu.js`)

- **Purpose**: Full-width mega menu with rich content sections
- **Features**:
  - Grid-based navigation
  - Section-aware keyboard navigation (left/right arrows)
  - Hover and click interactions
  - Full ARIA compliance

### Dropdown Navigation (`AccessibleDropdown.js`)

- **Purpose**: Traditional dropdown menus (fallback/legacy support)
- **Features**:
  - Simple list-based navigation
  - Standard keyboard navigation
  - ARIA menubar pattern

### Search Component (`AccessibleSearch.js`)

- **Purpose**: Enhanced search input with accessibility features
- **Features**:
  - Live region announcements
  - Input validation
  - Screen reader feedback

### Product Card (`AccessibleProductCard.js`)

- **Purpose**: Accessible product card interactions
- **Features**:
  - Add to cart functionality
  - Cart badge updates
  - Keyboard navigation support

### Focus Manager (`FocusManager.js`)

- **Purpose**: Focus management utilities
- **Features**:
  - Focus trapping
  - Focus element queries
  - Screen reader announcements

### Keyboard Shortcuts (`KeyboardShortcuts.js`)

- **Purpose**: Global keyboard shortcuts handling
- **Features**:
  - Alt+S: Focus search
  - Alt+M: Focus main navigation
  - Alt+C: Focus cart

## Usage

### Importing Components

```javascript
import { AccessibleMegaMenu } from "./components/AccessibleMegaMenu.js";
import { FocusManager } from "./utils/FocusManager.js";
```

### Manual Initialization

```javascript
// Initialize a specific mega menu
const button = document.querySelector('[data-megamenu="categories"]');
const menu = document.getElementById("categories-megamenu");
new AccessibleMegaMenu(button, menu);
```

### Adding New Components

1. Create new file in appropriate directory (`components/` or `utils/`)
2. Export class using ES6 modules
3. Import and initialize in `main.js`
4. Update this documentation

## Benefits of This Structure

### Maintainability

- **Single Responsibility**: Each file has one clear purpose
- **Modular**: Components can be modified independently
- **Testable**: Individual components can be unit tested

### Performance

- **Lazy Loading**: Components can be loaded on demand
- **Tree Shaking**: Unused components can be excluded from builds
- **Code Splitting**: Components can be split into separate bundles

### Developer Experience

- **Clarity**: Easy to find and understand specific functionality
- **Reusability**: Components can be used in different contexts
- **Scalability**: New features can be added without affecting existing code

## Development Guidelines

### File Naming

- Use PascalCase for class names and file names
- Be descriptive and specific
- Prefix utility classes with purpose (e.g., `FocusManager`)

### Code Organization

- Keep classes focused on single responsibilities
- Use ES6 modules for imports/exports
- Document public methods and complex logic
- Follow consistent error handling patterns

### Accessibility Standards

- Maintain ARIA compliance
- Support keyboard navigation
- Provide screen reader feedback
- Test with assistive technologies
