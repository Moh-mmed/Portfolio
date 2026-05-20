# Phase 1: Data Model & State

## Local Storage State

The user's theme selection is stored locally in the browser's storage to preserve preferences.

- **Storage Key**: `portfolio-theme`
- **Data Type**: `'dark' | 'light'`
- **Default Value**: `'dark'` (or derived from system settings via `prefers-color-scheme`)

## Theme State (React Context / Local State)

Managed within the theme custom hook:
- `theme`: `'dark' | 'light'` (the active theme applying styling variables)

## Scroll-Spy State

Determines which navigation link to highlight in the left sidebar as the user scrolls.

- **Active Section ID**: `string`
- **Allowed Values**: `'about' | 'experience' | 'projects' | 'skills' | 'contact'`
- **Trigger**: `IntersectionObserver` entry transition (updating when a section occupies > 30% of the upper half of the viewport).

## Mobile Navigation State

Tracks the open/closed state of the drawer navigation overlay on smaller displays.

- **`isOpen`**: `boolean`
- **Trigger**: Click events on the hamburger menu icon (open) and overlay/links (close).

## Physical Motion Tracker (Cursor Glow)

Positions the visual spotlight following the desktop cursor.

- **`mouseX`**: `MotionValue` (interpolated using `useSpring` with stiffness 50, damping 15)
- **`mouseY`**: `MotionValue` (interpolated using `useSpring` with stiffness 50, damping 15)
