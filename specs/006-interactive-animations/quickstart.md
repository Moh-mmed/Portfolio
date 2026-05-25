# Quickstart: Advanced Interactions Phase

## 1. Install Dependencies

```bash
pnpm add @react-three/fiber @react-three/drei three
pnpm add @types/three
pnpm add embla-carousel-react
pnpm add vanilla-tilt
pnpm add @types/vanilla-tilt
pnpm add lenis
```

## 2. Implement In This Order

1. Add `lib/use-performance-check.ts`.
2. Add dynamically imported `BackgroundScene`.
3. Add `TiltCard` and integrate it into homepage and `/projects` project cards only.
4. Expand `AnimateIn` variants and load-mode support.
5. Add the one-time homepage intro sequence in `PortfolioHome.tsx`.
6. Add `ProjectSlider` and swap it into the homepage desktop projects section.
7. Apply hover upgrades and `SectionDivider`.
8. Add `SmoothScroll` in `app/layout.tsx`, gated to desktop non-reduced-motion sessions.
9. Roll the motion polish through `/projects/[slug]` and `/contact` without changing content contracts.

## 3. Route Targets

- `/`
  - background scene
  - intro sequence
  - desktop project slider
  - section dividers
  - directional/staggered section reveals
- `/projects`
  - project grid remains
  - project cards gain tilt and hover polish
- `/projects/[slug]`
  - reveal/hover polish only
- `/contact`
  - reveal/divider polish only

## 4. Core Implementation Notes

- Keep all Three.js code behind `next/dynamic(..., { ssr: false })`.
- Use `<Suspense fallback={null}>` around the background scene usage site.
- Do not apply CSS transforms or transitions directly to Embla's container or
  slide nodes; place those on inner wrappers.
- Use transform-based tricks for any visual "width expansion" requirements.
- Reuse `use-performance-check` instead of scattering reduced-motion and device
  detection across components.

## 5. Verification Commands

```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm test:e2e
pnpm test:a11y
pnpm lighthouse
```

## 6. Manual Verification Checklist

- Check desktop homepage with normal CPU.
- Check desktop homepage with Chrome DevTools Performance and 4x CPU slowdown.
- Check reduced-motion mode.
- Check touch/mobile simulation.
- Check keyboard navigation for the slider and project links.
- Check Lighthouse on the existing route set to ensure the new dependencies do
  not drag the score below the constitution threshold.
