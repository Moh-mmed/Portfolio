# Contract: Performance and Verification

## Purpose

Document the budgets, route checks, and manual validation required before the
advanced interactions phase can move from planning into implementation and
verification.

## Hard Performance Rules

- All Three.js and React Three Fiber code is dynamically imported with
  `ssr: false`.
- `BackgroundScene` must not block first render.
- `BackgroundScene` must use `Canvas frameloop="demand"`.
- Ambient background particles must never exceed `80`.
- Tilt must be disabled on touch/coarse-pointer devices.
- Slider motion must rely on Embla-managed transforms, not layout changes.
- Custom motion must animate `transform` and `opacity` only.
- Native mobile scroll must remain the default path.

## Lighthouse Contract

The existing Lighthouse runner must continue to pass:

- Performance: `>= 0.95`
- Accessibility: `>= 0.95`
- Best Practices: `>= 0.95`
- SEO: `= 1.0`

### Required Routes

- `/`
- `/about`
- `/projects`
- `/projects/lakesai`
- `/contact`

## Automated Verification Contract

Implementation is not complete until these succeed:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test:e2e`
- `pnpm test:a11y`
- `pnpm lighthouse`

## Manual Verification Contract

### Desktop Performance

- Run Chrome DevTools Performance on `/` with 4x CPU slowdown.
- Confirm:
  - no long-running layout thrash from hover/scroll effects
  - no always-on WebGL loop when the background is disabled
  - carousel interaction remains smooth while dragging and buttoning through slides

### Capability Gating

- Verify ambient 3D is absent when:
  - reduced motion is enabled
  - viewport is below `lg`
  - logical CPU core count is below `4`
- Verify tilt is absent on touch simulation and mobile devices.
- Verify Lenis is absent on touch/mobile and reduced-motion sessions.

### Accessibility

- Verify focus styles remain visible on:
  - carousel arrows
  - project links
  - contact form fields
- Verify reduced-motion mode still exposes all content immediately and keeps the
  site fully usable.

### Visual Stability

- Verify no CLS regression from:
  - background scene mount timing
  - project slider swap at desktop breakpoint
  - section divider insertion
  - about-section headshot layout

## Release Gate

The phase is blocked from implementation sign-off if any of the following are
true:

- Lighthouse thresholds regress below constitution minimums
- reduced-motion handling is incomplete
- desktop-only features leak onto mobile/touch
- a new animation depends on width/height/top/left changes
- WebGL or Lenis harms interaction responsiveness on the homepage
