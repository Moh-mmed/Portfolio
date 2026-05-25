# Phase 0: Research & Decisions

## Capability Gating For Motion-Heavy Features

- **Decision**: Centralize runtime gating in `lib/use-performance-check.ts` and compute desktop eligibility from `prefers-reduced-motion`, `navigator.hardwareConcurrency`, viewport width, and pointer/touch capability.
- **Rationale**: The feature set mixes optional enhancements with strict accessibility and performance constraints. A single gate prevents drift where 3D, tilt, and smooth scrolling each apply different disablement rules.
- **Alternatives considered**: Independent checks inside every component. Rejected because it duplicates logic, increases hydration branching, and makes it easier for one motion feature to violate reduced-motion expectations.

## Ambient 3D Background With On-Demand Rendering

- **Decision**: Implement the constellation background with `@react-three/fiber` using `Canvas frameloop="demand"` plus explicit `invalidate()` calls for idle drift and mouse-parallax updates.
- **Rationale**: React Three Fiber documents `frameloop="demand"` as the supported way to avoid a permanent 60fps render loop. That matters here because the background is decorative, always behind content, and must stay easy to disable on low-capability devices.
- **Alternatives considered**: A default continuous render loop. Rejected because it keeps WebGL busy even when the scene is barely moving and conflicts with the requirement that the background stay extremely subtle and inexpensive.

## Dynamic Loading Strategy For WebGL

- **Decision**: Load all Three.js code through `next/dynamic(() => import(...), { ssr: false })` and wrap the usage site in `<Suspense fallback={null}>`.
- **Rationale**: Next.js supports `ssr: false` for browser-only components, which is appropriate for WebGL and browser API access. Separately, React `Suspense` gives a null fallback boundary so the scene never blocks the main page content. Keeping these separate avoids Next.js's documented `suspense: true` and `ssr: false` conflict.
- **Alternatives considered**: Statically importing the scene into the homepage or enabling `next/dynamic` suspense mode. Rejected because static import grows initial JS cost, while suspense mode with `ssr: false` is an unsupported combination in Next.js.

## Project Card Tilt Implementation

- **Decision**: Use `vanilla-tilt` for project cards only, with `max: 8`, `speed: 400`, `glare: true`, and `"max-glare": 0.15`, while styling the glare layer through CSS to match the teal accent.
- **Rationale**: `vanilla-tilt` already provides the required tilt math, transition handling, and glare support with minimal wrapper code. The generated glare DOM can be themed without introducing a heavier abstraction or re-implementing pointer geometry from scratch.
- **Alternatives considered**: Building a custom pointer-tracked transform hook in Framer Motion. Rejected because it would cost more code, more tuning, and more maintenance for a behavior the phase does not need to own at a low level.

## Desktop Slider Architecture

- **Decision**: Use `embla-carousel-react` only for the homepage featured-project section on `lg+`, with arrows, dots, drag, and manual keyboard handling, while leaving the `/projects` page as a dense grid.
- **Rationale**: Embla's docs emphasize that it owns the carousel transforms and expects slide sizing to come from CSS, which fits the "one slide with next-card peek" requirement well. Keeping the full listing page as a grid preserves fast scanning and avoids forcing a carousel on the route whose job is comprehensive browsing.
- **Alternatives considered**: Replacing all project grids with a slider, or layering CSS transitions directly on Embla slide/container nodes. Rejected because the first hurts information density on `/projects`, and the second conflicts with Embla's documented transform ownership.

## Motion Orchestration

- **Decision**: Extend `AnimateIn` for reusable viewport/load variants, then use Framer Motion `useAnimate` only for the homepage's one-time intro sequence.
- **Rationale**: `useAnimate` is well-suited for a scoped, manually sequenced entrance timeline with automatic cleanup, while `AnimateIn` remains the simpler tool for section-level reveals throughout the rest of the site. This keeps orchestration explicit without rewriting the whole motion layer.
- **Alternatives considered**: Driving all animations through one large `useAnimate` timeline or only through declarative `motion` props. Rejected because the first becomes brittle across responsive layouts, and the second makes the staged once-per-session intro harder to express cleanly.

## Smooth Scrolling Integration

- **Decision**: Use the core `lenis` package inside a small `SmoothScroll` client component with one RAF loop and desktop-only activation.
- **Rationale**: Lenis documents both installation and RAF-driven lifecycle management directly. A tiny wrapper keeps the dependency isolated, easy to disable, and compatible with the repo's current layout structure without adopting an extra provider package.
- **Alternatives considered**: Always-on Lenis across every device or no smooth scroll layer at all. Rejected because touch devices already have strong native scrolling behavior, and always-on smoothing would add risk to accessibility and performance.

## Transform-Only Hover Treatments

- **Decision**: Implement all new hover motion with `transform` and `opacity`, including the left-nav line "width" growth via `scaleX` rather than real width animation.
- **Rationale**: The feature request asks for richer hover feedback, but the performance rules forbid layout-affecting animation properties. Using transforms satisfies the visual intent without introducing layout thrash.
- **Alternatives considered**: Literal `width` transitions for nav rules or `left/right/top` movement for icons and arrows. Rejected because they violate the explicit non-negotiable animation constraints for this phase.

## Content Model Impact

- **Decision**: Make no changes to `content/`, `lib/content.ts`, `lib/types.ts`, or `content/README.md`.
- **Rationale**: This phase is presentation-only. Existing project, experience, skills, and about content already support the required routes, and the headshot asset already exists under `public/images/headshot.jpg`.
- **Alternatives considered**: Adding animation-specific flags to content records. Rejected because interaction behavior is purely structural and would create unnecessary content complexity.
