# Contract: Interaction Runtime and Route Behavior

## Purpose

Define the route-level interaction behavior, accessibility rules, and component
contracts for the advanced interactions phase.

## Route Contract

| Route | Required Interaction Behavior |
|-------|-------------------------------|
| `/` | Desktop-only ambient background, one-time intro sequence, section dividers, desktop featured-project slider, tilt-enabled project cards |
| `/projects` | Dense project grid on all breakpoints, tilt-enabled project cards, enhanced hover motion, no homepage intro sequence |
| `/projects/[slug]` | Preserve case-study layout and metadata while applying only compatible reveal/hover polish |
| `/contact` | Preserve form behavior and metadata while applying compatible reveal/divider polish |

## Capability Gating Contract

Advanced effects must obey these gates:

- `prefers-reduced-motion: reduce` disables:
  - ambient 3D background
  - tilt effect
  - Lenis smooth scroll
  - directional translation and scale-heavy animation variants
- Touch/coarse pointer devices disable:
  - tilt effect
  - Lenis smooth scroll
- Viewports below `lg` disable:
  - ambient 3D background display
  - homepage desktop slider
- `navigator.hardwareConcurrency < 4` disables:
  - ambient 3D background

## Component Contract

### `BackgroundScene`

- Must be dynamically imported with `ssr: false`.
- Must never block initial page content.
- Must mount behind all content with no pointer capture.
- Must render zero particles when capability checks fail.
- Must keep its Canvas on `frameloop="demand"`.

### `TiltCard`

- Accepts arbitrary child content and enhances it only on eligible devices.
- Must clean up the `VanillaTilt` instance on unmount.
- Must leave card semantics, links, and focusability intact.

### `ProjectSlider`

- Uses Embla on homepage desktop only.
- Must support:
  - pointer drag
  - arrow-button navigation
  - dot navigation
  - keyboard left/right navigation
- Must not autoplay.
- Must render full `ProjectCard` content inside each slide.

### `AnimateIn`

- Supports reusable variants for directional, scale, staggered, and load-time
  animation.
- Reduced-motion mode must render content immediately or with opacity-only
  treatment.

### `SmoothScroll`

- Initializes Lenis only on eligible desktop sessions.
- Must destroy the instance on unmount.
- Must be safe to remove without changing page markup or route contracts.

### `SectionDivider`

- Decorative only.
- Must not alter heading hierarchy or section semantics.
- Dot pulse should happen once per reveal, not continuously.

## Homepage Intro Contract

- The staged intro runs once per browser session using
  `sessionStorage['portfolio-intro-played']`.
- The animation sequence must not delay link clickability.
- If `sessionStorage` is unavailable, fail open and render the final visible
  state without blocking.

## Hover Contract

- Project cards gain:
  - image overlay gradient
  - accent-shifted tech pills
  - CTA arrow translation
- Left navigation gains a visually expanding line indicator, implemented via
  transform rather than width animation.
- Social links gain hover translate/glow plus homepage staggered entrance.
- Experience timeline items gain brighter border and logo scale.
- Skill badges gain subtle scale in addition to the existing glow language.

## Accessibility Contract

- Carousel controls must have accessible names.
- Keyboard users must be able to:
  - reach and activate project links
  - use carousel arrow controls
  - move through the page without hidden focus traps
- Decorative WebGL and divider layers must be `aria-hidden`.
- Reduced-motion users must never receive mandatory 3D, tilt, or smooth-scroll
  behavior.

## Non-Goals

This phase must not introduce:

- new content fields
- autoplaying sliders
- full-screen WebGL showcases
- shader-driven hero scenes
- video backgrounds
- loading screens
