# Feature Specification: Complete UI Overhaul

**Feature Branch**: `005-ui-overhaul`

**Created**: 2026-05-20

**Status**: Draft

**Input**: User description: "Complete UI overhaul — dark theme, two-column layout, scroll-spy navigation, Framer Motion animations, dark mode, Lighthouse 95+..."

<!--
  CONSTITUTION GUARDRAILS:
  - This document is for site visitors, recruiters, stakeholders, and the
    portfolio owner.
  - Keep it technology-agnostic: no frameworks, libraries, APIs, component
    names, architecture patterns, deployment targets, or file paths.
  - Describe user value, behavior, and measurable outcomes only.
-->

## User Scenarios & Testing

### User Story 1 - Desktop Two-Column Layout & Scroll-Spy (Priority: P1)

Mohammed's portfolio presents a sleek, professional two-column layout on desktop browsers. The left panel stays fixed and visible, presenting his name, professional title, a short bio tagline, navigation links, and social connections. The right panel scrolls smoothly through the content sections. As the visitor scrolls, the active section is highlighted in the navigation bar automatically.

**Why this priority**: This is the core structural design of the desktop experience. Recruiters scan developer portfolios very quickly, and having an intuitive, immediately understandable navigation alongside clear identity information above the fold is critical to the MVP.

**Independent Test**: Load the homepage on a desktop browser. Verify the left panel remains fixed while scrolling. Scroll down and confirm the navigation's active state updates automatically based on the visible content section (scroll-spy behavior).

**Acceptance Scenarios**:

1. **Given** a visitor lands on the homepage on a desktop viewport, **When** they view the screen, **Then** the left panel displays Mohammed's name, title, a short bio tagline, a navigation menu (About, Experience, Projects, Skills, Contact), and social links, and the right panel displays the detailed content.
2. **Given** the desktop homepage is loaded, **When** the visitor scrolls down through the content sections in the right panel, **Then** the corresponding navigation link in the left panel automatically highlights to reflect the currently viewed section.

---

### User Story 2 - Smooth Entrance Animations & Background Depth (Priority: P2)

When scrolling through the portfolio, each content section transitions into view with a smooth, subtle fade-in and slide-up animation. On desktop, a beautiful, non-intrusive glow effect follows the pointer across the background, enhancing the visual depth of the dark theme without interfering with standard interactions.

**Why this priority**: Focuses on premium micro-interactions and visual polish. While the site is structurally usable without them, these additions provide the "wow" factor that reflects high-quality frontend craftsmanship.

**Independent Test**: Scroll down the page and observe section entrances. Verify they fade in and slide up smoothly. Enable "prefers-reduced-motion" in system settings and verify animations are disabled or simplified. Move the cursor on desktop and verify the background glow is present and follows the mouse.

**Acceptance Scenarios**:

1. **Given** a visitor scrolls down the portfolio page, **When** a content section enters the viewport, **Then** that section smoothly fades in and slides up by a small amount.
2. **Given** a visitor has "prefers-reduced-motion" enabled in their system or browser settings, **When** they view the site, **Then** all entrance animations are disabled or simplified to respect their preference.
3. **Given** a visitor is on a desktop device, **When** they move their cursor across the background, **Then** a subtle radial glow gradient follows their mouse coordinates.

---

### User Story 3 - Mobile-First Optimization & Header Navigation (Priority: P1)

On mobile and tablet screens, the page collapses into a single-column layout. A sticky top header provides quick access to navigation via a clean hamburger menu, ensuring all sections are easily accessible even on smaller viewports.

**Why this priority**: Mobile optimization is critical because a significant portion of portfolio traffic originates from mobile devices, and recruiters frequently browse portfolios on the go.

**Independent Test**: Open the portfolio on a mobile device or responsive emulator. Scroll the page to verify it's a single column and there are no horizontal scrollbars. Tap the hamburger icon to open and close the navigation menu, and tap links to navigate.

**Acceptance Scenarios**:

1. **Given** a visitor is on a mobile device, **When** they load the website, **Then** they see a single-column layout with a sticky top header containing a hamburger menu button.
2. **Given** the mobile navigation menu is open, **When** the visitor taps a section link, **Then** the menu closes and the viewport scrolls smoothly to the selected section.

---

### User Story 4 - Light/Dark Theme Toggle (Priority: P2)

Visitors can switch between a sleek dark mode (the default deep navy theme) and a polished light mode (warm whites/grays) using a toggle switch in the navigation area. The active theme preference is saved in the visitor's browser local storage so it persists across page reloads.

**Why this priority**: Allows user customization. Dark mode is modern and developer-focused, but a readable, high-contrast light mode is essential for accessibility and users with different visual preferences.

**Independent Test**: Click the theme toggle button in the header/nav. Verify the background and text colors change instantly to a polished light or dark palette while keeping the teal accent. Reload the page and verify the selected theme is preserved.

**Acceptance Scenarios**:

1. **Given** the default dark mode is active, **When** a visitor clicks the theme toggle button, **Then** the site colors smoothly transition to light mode (warm white background, dark gray text, keeping teal accents).
2. **Given** a visitor selects light mode, **When** they refresh the page or return to the site later, **Then** the site loads in light mode automatically using the saved preference.

---

### User Story 5 - Exceptional Page Performance & SEO (Priority: P2)

The entire website is highly optimized for search engines, accessibility, and fast load times. All pages score outstanding marks on standard browser performance and best practice audits, ensuring a seamless user experience for everyone.

**Why this priority**: High performance, strong accessibility compliance, and strict SEO compliance are critical to making a great impression on recruiters and ensuring the site is discoverable and usable by everyone.

**Independent Test**: Run a standard browser performance and accessibility audit (e.g., Lighthouse). Verify that all scores are outstanding.

**Acceptance Scenarios**:

1. **Given** the website is deployed, **When** a performance audit is run on the homepage, **Then** the Performance, Accessibility, and Best Practices categories score 95 or above, and SEO scores exactly 100.

---

### Edge Cases

- **Fast Scrolling**: If a user scrolls extremely fast, the scroll-spy navigation highlights must keep pace and correctly identify the final resting section without visual stutter or getting stuck on intermediate sections.
- **Off-screen Cursor**: When the mouse cursor leaves the browser window on desktop, the radial background glow must fade out smoothly rather than freezing at the screen edge.
- **Touch & Pointer Coexistence**: On devices supporting both touch and mouse inputs (like hybrid laptops), mouse glow must work when using the trackpad, but must not trigger awkwardly during touch gestures.

## Requirements

### Functional Requirements

- **FR-001**: The system MUST implement a two-column desktop layout where the left column (containing name, subtitle, nav menu, and social links) remains sticky/fixed while the right column scrolls.
- **FR-002**: The left navigation menu MUST automatically highlight the active section as the user scrolls the right panel (scroll-spy).
- **FR-003**: The system MUST implement a single-column layout on mobile devices with a sticky top navigation header and a hamburger menu.
- **FR-004**: The system MUST support a dark mode (default) and a light mode. Dark mode MUST use a deep navy background (#0f172a), and light mode MUST use a polished warm white/light gray background. Both modes MUST use a teal (#2dd4bf) accent color.
- **FR-005**: The theme preference MUST be saved in the client's local storage and persist across visits.
- **FR-006**: The system MUST implement subtle fade-in and slide-up entrance animations for content sections when they enter the viewport.
- **FR-007**: Animations MUST respect the user's OS preference for reduced motion by disabling or greatly simplifying transitions.
- **FR-008**: The desktop layout MUST display a radial glow gradient following the cursor movement on the background.
- **FR-009**: The UI overhaul and styling MUST be applied consistently across all main portfolio pages (homepage, project pages, and contact page).
- **FR-010**: All user-facing pages MUST include proper metadata, semantic HTML, and accessibility features to ensure high audit scores.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Desktop layout splits cleanly into a sticky left information column and a scrollable right content column at viewport widths above 1024px.
- **SC-002**: Mobile layout folds to a single-column list with a fully functional sticky top bar and mobile navigation menu.
- **SC-003**: Active section indicator in the navigation menu changes within 100ms of the corresponding section header crossing the top threshold of the viewport.
- **SC-004**: Theme toggle transitions colors within 150ms and saves the state in local storage.
- **SC-005**: Standard browser audit scores for the main pages are 95+ for Performance, Accessibility, and Best Practices, and 100 for SEO.
- **SC-006**: Entrance animations fade in and slide up smoothly on supported devices, but immediately fallback to static layouts when reduced motion preferences are active.

## Assumptions

- **AS-001**: The visitor's browser supports modern CSS features (Grid, Flexbox, variables) and local storage for theme persistence.
- **AS-002**: Desktop cursor glow is disabled or hidden on touch-first devices to avoid distracting hover states on tap.
- **AS-003**: The existing site structure and portfolio data (About, Experience, Projects, Skills) are already available and will be integrated into the new layout without requiring content additions.
