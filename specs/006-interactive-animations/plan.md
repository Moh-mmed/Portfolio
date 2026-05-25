# Implementation Plan: Advanced Interactions Phase

**Branch**: `006-interactive-animations` | **Date**: 2026-05-25 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-interactive-animations/spec.md`

## Summary

Add a performance-guarded interaction layer for the portfolio's UI polish phase: a subtle desktop-only ambient 3D background, tilt-enhanced project cards, a desktop featured-project slider, richer scroll/entrance motion, smoother section transitions, and optional smooth scrolling. The implementation stays inside the current Next.js App Router and Framer Motion stack, dynamically loads all Three.js work, preserves the existing local content model, and treats reduced-motion, touch devices, and low-power hardware as first-class constraints rather than fallback afterthoughts.

## Technical Context

**Language/Version**: TypeScript 5.6.3 (strict mode)

**Primary Dependencies**: Next.js 15 App Router, React 19, Tailwind CSS 3.4, Framer Motion 12, `@react-three/fiber`, `@react-three/drei`, `three`, `embla-carousel-react`, `vanilla-tilt`, `lenis`, `zod`

**Storage**: Existing local JSON/Markdown content under `content/`; browser `sessionStorage` for one-time homepage intro playback; no database

**Testing**: `pnpm lint`, `pnpm typecheck`, `pnpm build`, Playwright e2e and accessibility suites, Lighthouse script in `tests/performance/lighthouse.config.cjs`, manual Chrome DevTools performance profiling with 4x CPU slowdown

**Target Platform**: Static-first web application for modern desktop and mobile browsers, with advanced interaction features enabled only on capable desktop-class devices

**Project Type**: Portfolio website

**Content Source**: Existing Git-tracked content loaded from `lib/content.ts`; no new content schema required

**Media Strategy**: Existing optimized `next/image` usage, including `public/images/headshot.jpg` for the animated about layout split

**Deployment Targets**: Vercel, Netlify, Cloudflare Pages, self-hosted VPS

**Performance Goals**: Lighthouse 95+ Performance, 95+ Accessibility, 95+ Best Practices, 100 SEO; LCP < 2.5s; interaction responsiveness < 100ms; CLS < 0.1; maintain smooth pointer/slider interactions on desktop without degrading mobile responsiveness

**Constraints**: Dynamic-import all Three.js code with `ssr: false`; `BackgroundScene` must never block page load; disable 3D on mobile, reduced-motion, and `navigator.hardwareConcurrency < 4`; disable tilt on touch devices; use transform/opacity-based animations only; do not animate Embla container transforms directly; no content hardcoding; no database; no external CMS; no `any`; no unjustified `@ts-ignore`

**Scale/Scope**: UI polish phase slice spanning homepage, `/projects`, `/projects/[slug]`, and `/contact`, with the homepage receiving the new ambient 3D scene, intro sequence, section dividers, slider swap, and the broadest motion updates

## Constitution Check

- [x] `spec.md` remains technology-agnostic and contains no frameworks, libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active UI polish delivery phase and does not promise or scaffold future admin, analytics, or content-management work.
- [x] Content changes remain sourced from local files under `content/`, and no schema or `content/README.md` updates are required because this phase changes presentation and interaction only.
- [x] Type-safety work is explicit: strict TypeScript is preserved, new hooks/components receive explicit props and return types, and no content-loader contract changes are introduced.
- [x] Performance, accessibility, SEO, and metadata work are accounted for, including Lighthouse targets, keyboard navigation, reduced-motion behavior, and preservation of existing structured data outputs.
- [x] Image handling, deployment compatibility, and environment-variable needs are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/006-interactive-animations/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── contracts/
    ├── interaction-runtime-contract.md
    └── performance-verification-contract.md
```

### Source Code (repository root)

```text
app/
├── layout.tsx                          # MODIFY: mount SmoothScroll and background loading boundary
├── page.tsx                            # MODIFY: home route data handoff and structured data preservation
├── contact/page.tsx                    # MODIFY: entrance motion and divider alignment
└── projects/
    ├── page.tsx                        # MODIFY: tilt-enabled project listing grid
    └── [slug]/
        └── page.tsx                    # MODIFY: section motion refinements without changing content contracts

components/
├── sections/
│   ├── PortfolioHome.tsx               # MODIFY: intro sequence, section dividers, desktop slider swap
│   ├── AboutSection.tsx                # MODIFY: two-column text/headshot reveal layout
│   ├── ProjectCard.tsx                 # MODIFY: overlay, badge, arrow, tilt-ready inner structure
│   ├── ProjectGrid.tsx                 # MODIFY: grid can opt into tilt cards and scale reveals
│   ├── ProjectSlider.tsx               # NEW: Embla-powered featured-project slider for lg+
│   ├── ExperienceTimeline.tsx          # MODIFY: staggered reveal, hover polish, no tilt
│   ├── SkillsGrid.tsx                  # MODIFY: staggered motion and hover scale upgrades
│   └── ContactForm.tsx                 # MODIFY: fade-up entrance compatibility
└── ui/
    ├── AnimateIn.tsx                   # MODIFY: variant expansion, load-mode support, stagger parent mode
    ├── BackgroundScene.tsx             # NEW: ambient 3D particle constellation
    ├── SectionDivider.tsx              # NEW: animated divider with pulsing accent dot
    ├── SmoothScroll.tsx                # NEW: Lenis lifecycle wrapper
    └── TiltCard.tsx                    # NEW: VanillaTilt wrapper with desktop-only activation

lib/
├── use-performance-check.ts            # NEW: reduced-motion / hardware / viewport gating
└── utils.ts                            # MODIFY only if small shared helpers are needed for interaction classes
```

**Structure Decision**:
- Keep all interaction logic in small, client-only UI wrappers so the existing server-side content loaders and route metadata remain untouched.
- Limit route-level edits to composition changes while concentrating interaction behavior in `components/ui/` and `components/sections/`.
- Treat the homepage as the orchestration surface for staged intro motion, section dividers, and the desktop slider, while `/projects` keeps its dense listing layout and gains only tilt/hover upgrades.

## Proposed Changes

### 1. Performance Capability Gate

- Add `lib/use-performance-check.ts` as the single client hook for feature gating.
- The hook computes once on mount and returns at minimum:
  - `canRender3D`
  - `prefersReducedMotion`
  - `isTouchLike`
  - `isDesktop`
- `canRender3D` requires all of:
  - `prefers-reduced-motion: no-preference`
  - `navigator.hardwareConcurrency >= 4`
  - viewport at or above the `lg` breakpoint
- `TiltCard` and `SmoothScroll` will reuse the same capability decisions so motion disablement stays consistent across the site.

### 2. Ambient 3D Background

- Introduce `components/ui/BackgroundScene.tsx` as a client-only component loaded with `dynamic(() => import(...), { ssr: false })`.
- Mount it behind all content with `pointer-events-none fixed inset-0 z-0 hidden lg:block`.
- Render a teal constellation-style particle field with a maximum of 80 particles and very low visual weight:
  - base color `#2dd4bf`
  - effective opacity target around 0.15
  - slow drifting rotation and pointer-driven tilt
- Use `Canvas frameloop="demand"` and manual `invalidate()` scheduling:
  - low-frequency idle invalidation for the subtle drift
  - extra invalidation on pointer movement for parallax response
  - pause invalidation when the tab is hidden
- Wrap the rendered scene in `<Suspense fallback={null}>`, but do not use `next/dynamic` suspense mode because it conflicts with `ssr: false`.

### 3. Tilt-Enabled Project Cards

- Add `components/ui/TiltCard.tsx` as a thin wrapper around `vanilla-tilt`.
- Configure:
  - `max: 8`
  - `speed: 400`
  - `glare: true`
  - `"max-glare": 0.15`
- Style the generated glare layer with a teal-tinted white gradient so the effect matches the portfolio accent.
- Apply `TiltCard` only to project cards on:
  - homepage featured projects
  - `/projects` listing
- Explicitly exclude experience timeline cards to avoid compounding motion.
- Disable tilt on coarse pointers, small viewports, and reduced-motion sessions, leaving the same visual card styles minus the transform effect.

### 4. Desktop Featured Project Slider

- Add `components/sections/ProjectSlider.tsx` using `embla-carousel-react`.
- Scope the slider to the homepage featured-project section on `lg` and above:
  - mobile and tablet continue using the existing grid
  - `/projects` remains a grid on all breakpoints for dense browsing
- Desktop interaction requirements are explicit:
  - desktop (`lg+`) uses drag plus keyboard navigation
  - mobile (`< lg`) uses the standard grid only
  - no touch-swipe requirement exists for the slider because the slider does not render on touch/mobile layouts
- Use one slide per view with centered alignment and a visual peek of the next card.
- Navigation behavior:
  - previous/next buttons outside the draggable viewport
  - dot indicators bound to Embla selected index
  - keyboard support for left/right arrows
  - no autoplay
- Because Embla owns slide transforms, hover/scale transitions must live on inner slide wrappers rather than the Embla container or slide nodes.
- Tune Embla options for a perceived ~300ms settle without layering conflicting CSS transitions onto the carousel engine.

### 5. Expanded Motion System

- Upgrade `components/ui/AnimateIn.tsx` to support:
  - `fade-up`
  - `fade-left`
  - `fade-right`
  - `scale`
  - `stagger-children`
  - load-time mode for hero/intro elements that should not wait for scroll
- Set the reveal trigger threshold to `0.2` so sections animate once 20% of the element has entered the viewport.
- Preserve the current reduced-motion short-circuit so users get immediate static content or opacity-only fallbacks.
- Apply motion variants as follows:
  - homepage name/title/tagline/nav/socials: load-sequenced
  - about text: `fade-right`
  - about headshot: `fade-left`
  - experience list: parent stagger plus item `fade-up`
  - featured projects and `/projects` cards: `scale`
  - skill categories: staggered `fade-up`
  - contact form and contact cards: `fade-up`

### 6. Homepage Entrance Sequence

- Use Framer Motion `useAnimate` inside `PortfolioHome.tsx` to orchestrate the one-time desktop intro sequence.
- Persist a `portfolio-intro-played` session flag in `sessionStorage`.
- Sequence timing:
  - `0ms`: background layer opacity fade-in
  - `200ms`: name block slide/fade in
  - `400ms`: title fade in
  - `600ms`: tagline fade in
  - `800ms`: nav links stagger in at 80ms
  - `1000ms`: social/resume row fade in
- Keep links interactive during the sequence by animating opacity/transform only and never gating pointer events.

### 7. Hover and Divider Polish

- `ProjectCard` upgrades:
  - bottom image overlay gradient on hover
  - tech pills shift toward accent styling when the parent card is hovered
  - CTA arrow translates using `translateX`, not `left`
- Left navigation line indicator:
  - preserve the visual `32px -> 64px` expansion using `scaleX` on a fixed-width line instead of animating width directly
- Social links:
  - slight upward translate
  - teal glow
  - staggered intro reveal on the homepage
- Experience timeline:
  - brighter left border on hover
  - company logo scale to `1.05`
- Skills:
  - existing glow plus subtle scale
- Add `components/ui/SectionDivider.tsx` between major homepage sections to create rhythm without introducing heavy layout shifts.
- Use divider-led transitions plus optional Lenis scroll momentum as the section-change treatment instead of explicit background color transitions between sections.

### 8. Lenis Smooth Scrolling

- Add `components/ui/SmoothScroll.tsx` as a client wrapper mounted near the root layout.
- Initialize Lenis only when:
  - viewport is desktop-class
  - reduced motion is off
  - touch/coarse pointer mode is off
- Use one RAF loop to call `lenis.raf(time)` and destroy the instance on unmount.
- Keep this feature optional and easy to disable if it threatens Lighthouse or native-browser behavior on route transitions.
- Verify that scroll-triggered Motion effects continue to fire correctly with the smoothed scroll container.

## Verification Plan

### Automated Checks

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test:e2e`
- `pnpm test:a11y`
- `pnpm lighthouse`

### Manual Checks

- Desktop homepage:
  - verify intro sequence runs once per session and never blocks clicks
  - verify background scene remains subtle and disappears under reduced-motion or low-core conditions
  - verify Embla arrows, dots, drag, and keyboard navigation
- Mobile and tablet:
  - verify no background scene, no tilt, native-feeling scroll, and original grid behavior
- Reduced motion:
  - verify 3D, tilt, Lenis, and directional translations are disabled or reduced to minimal opacity changes
- Performance:
  - measure page load plus intro animation completion in Chrome DevTools Performance with Fast 3G throttling; target all above-the-fold content visible and intro complete within 1.5s
  - record Chrome DevTools profile on the homepage with 4x CPU slowdown
  - confirm no animation uses layout-affecting properties
  - confirm Lighthouse stays at or above constitution thresholds after adding new dependencies
- Accessibility:
  - verify keyboard access to carousel controls and project links
  - verify focus states remain visible over new overlays and glows

## Post-Design Constitution Check

- [x] No new user-facing content model was introduced, so `content/README.md` and zod schemas remain valid without amendment.
- [x] Dynamic imports and route composition keep the feature inside the current static-first deployment model.
- [x] Reduced-motion, touch-device disablement, and desktop-only gating are designed in from the start rather than deferred to implementation cleanup.
- [x] Metadata, structured data, and existing content loaders remain intact; only visual composition and interaction layers change.

## Complexity Tracking

No constitution violations require justification at planning time.
