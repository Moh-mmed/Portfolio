# Phase 0: Research & Decisions

## Design Tokens & Variable-Based Theming
- **Decision**: Define core design constants in `/lib/design-tokens.ts` and map them to CSS custom properties inside `app/globals.css`. Configure `tailwind.config.ts` to extend the theme colors using the CSS variables.
- **Rationale**: Using CSS variables inside Tailwind config enables dynamic, real-time theme switching at the document root without bloating markup with double the Tailwind utility classes (e.g. omitting standard `dark:text-slate-200` prefixes on every element).
- **Alternatives considered**: Inline dark-mode classes (`dark:...`). Rejected as it makes code maintenance difficult and compromises clean consistency across multiple custom visual states.

## Dynamic Client-Side Theme System
- **Decision**: Build a custom `useTheme` hook in `/lib/theme.ts` that manages the `data-theme` attribute on the `<html>` root. Persist settings in `localStorage` under `portfolio-theme`, defaulting to dark mode with a fallback check of `prefers-color-scheme` for first-time visitors. Implement `ThemeToggle` with Sun and Moon icons transitioning smoothly via Framer Motion's `AnimatePresence`.
- **Rationale**: Keeps implementation light, explicit, and easy to maintain without third-party library overhead. `data-theme` selectors work cleanly with CSS custom properties.
- **Alternatives considered**: `next-themes` npm package. Rejected because a custom hook is highly robust, fits perfectly in a static-first setup, and prevents flash-of-unstyled-content (FOUC) when styled directly.

## Cursor Glow Effect
- **Decision**: Create `/components/ui/CursorGlow.tsx` that renders a fixed `div` featuring a radial gradient background. Track mouse coordinates via `mousemove` event listeners and pass them to Framer Motion's `useSpring` for buttery-smooth visual physical tracking. Hide this component entirely on mobile/touch devices using media queries (`(pointer: coarse)` or `(pointer: none)`).
- **Rationale**: Satisfies US-2 and adds substantial visual depth to the dark layout without interfering with pointer events. `useSpring` ensures interpolation is smooth, preventing lag or jumpiness.
- **Alternatives considered**: Standard CSS absolute hover states. Rejected because standard hover states do not follow pointer movements on the background of multiple elements.

## Scroll-Spy Highlights
- **Decision**: Implement a `/lib/use-scroll-spy.ts` hook utilizing the browser's `IntersectionObserver` API to track the visible content sections. Use a `threshold` of 0.3 and check which section is currently primary in the viewport.
- **Rationale**: `IntersectionObserver` runs asynchronously in the browser and avoids expensive, main-thread-blocking event scroll listeners, maintaining outstanding scrolling performance.
- **Alternatives considered**: Native scroll event handler polling. Rejected as it is highly inefficient and causes significant rendering thread lag (layout thrashing) on high-DPI displays.
