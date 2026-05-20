# Implementation Plan: Complete UI Overhaul

**Branch**: `005-ui-overhaul` | **Date**: 2026-05-20 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-ui-overhaul/spec.md`

## Summary

Implement a major visual redesign transforming the website from a standard layout into a premium, Brittany Chiang-inspired, developer-focused portfolio. Establish a solid theme system using CSS variables, enabling real-time switching between a modern dark mode (default deep navy) and a warm light mode. Introduce high-performance, hardware-accelerated animations using Framer Motion, an interactive radial cursor glow on desktop, scroll-spy sidebar navigation highlights, and a clean mobile slide-out drawer menu. Maintain strict compliance with SEO, performance, and accessibility constraints to secure a 95+ (100 SEO) Lighthouse score.

## Technical Context

**Language/Version**: TypeScript (strict mode)

**Primary Dependencies**: Next.js App Router, React, Tailwind CSS, Framer Motion

**Storage**: Browser `localStorage` for theme preference; local Git-tracked files under `content/` for portfolio copy. No database.

**Testing**: Mobile responsiveness emulation, Lighthouse performance/accessibility audits, keyboard navigation validation, and OS prefers-reduced-motion compatibility checks.

**Target Platform**: Static-first web application optimized for modern desktop and mobile browsers.

**Content Source**: Existing JSON and Markdown assets in `content/` loaded via `lib/content.ts`.

**Media Strategy**: Optimized Next.js `Image` components loaded with lazy rendering below the fold.

**Deployment Targets**: Vercel, Netlify, Cloudflare Pages, self-hosted VPS.

**Performance Goals**: Lighthouse 95+ for Performance, Accessibility, and Best Practices; 100 for SEO; LCP < 2.5s; FID < 100ms; CLS < 0.1.

**Constraints**: No external CMS, no database, no hardcoded copy in React components, no unoptimized production `<img>` tags, no `any`, and no unjustified `@ts-ignore`.

**Scale/Scope**: Sitewide layout overhaul. Reorganizes the primary viewport into a fixed-left and scrolling-right two-column structure on desktop, modifies Tailwind and global styles, implements new custom hooks/components, and revises the home and project detail pages.

## Constitution Check

- [x] `spec.md` remains technology-agnostic and contains no frameworks, libraries, component names, architecture patterns, or file paths.
- [x] This plan covers only the active delivery phase and does not promise or scaffold out-of-phase work.
- [x] Content changes are sourced from local files under `content/`, with any required schema and `content/README.md` updates identified.
- [x] Type-safety work is explicit: strict TypeScript, `zod` validation where content contracts change, and explicit return types for content loaders.
- [x] Performance, accessibility, SEO, and metadata work are accounted for, including Lighthouse targets, semantic HTML, keyboard access, and structured data where relevant.
- [x] Image handling, deployment compatibility, and environment-variable needs are documented without introducing an external CMS or database.
- [x] The downstream workflow includes `tasks.md` creation and a successful `/speckit.analyze` pass before implementation starts.

## Project Structure

### Documentation (this feature)

```text
specs/005-ui-overhaul/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── checklists/
    └── requirements.md  # Spec quality checklist
```

### Source Code (repository root)

```text
lib/
├── design-tokens.ts     # NEW: Core theme design token constants
├── theme.ts             # NEW: Client-side theme hook (useTheme)
└── use-scroll-spy.ts    # NEW: Navigation intersection observer hook

components/
├── ui/
│   ├── ThemeToggle.tsx  # NEW: Interactive dark/light switch button
│   ├── CursorGlow.tsx   # NEW: Desktop pointer radial gradient spotlight
│   └── AnimateIn.tsx    # NEW: Viewport entrance animation wrapper
└── layout/
    └── MobileNav.tsx    # NEW: Mobile menu hamburger and sliding drawer

app/
├── globals.css          # MODIFY: Binds colors to theme custom properties
├── layout.tsx           # MODIFY: Layout setup (Inter font, global state)
├── page.tsx             # MODIFY: Re-engineered two-column homepage
└── projects/
    └── [slug]/
        └── page.tsx     # MODIFY: Polished layout and interaction styling
```

**Structure Decision**:
- `/lib/design-tokens.ts` acts as the single source of truth for raw color specifications.
- `/lib/theme.ts` is a modular custom hook keeping theme state clean and decoupled from layout concerns.
- `/components/ui/CursorGlow.tsx` and `/components/ui/AnimateIn.tsx` contain hardware-accelerated animations using Framer Motion.
- `/lib/use-scroll-spy.ts` isolates the `IntersectionObserver` setup to ensure high-performance list element monitoring.

---

## Proposed Changes

### 1. Design System Foundation

#### [NEW] [design-tokens.ts](file:///Users/mohammedbenaoumeur/Code/Portfolio/lib/design-tokens.ts)
- Define a dictionary mapping theme tokens to Hex codes:
  ```typescript
  export const colors = {
    dark: {
      bg: '#0f172a',
      bgAlt: '#1e293b',
      bgHover: '#334155',
      text: '#e2e8f0',
      textMuted: '#94a3b8',
      accent: '#2dd4bf',
      accentHover: '#5eead4',
      border: '#1e293b',
    },
    light: {
      bg: '#f8fafc',
      bgAlt: '#f1f5f9',
      bgHover: '#e2e8f0',
      text: '#0f172a',
      textMuted: '#475569',
      accent: '#0d9488',
      accentHover: '#0f766e',
      border: '#e2e8f0',
    }
  };
  ```

#### [MODIFY] [tailwind.config.ts](file:///Users/mohammedbenaoumeur/Code/Portfolio/tailwind.config.ts)
- Extend standard configuration colors to bind with theme custom variables:
  ```typescript
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        'bg-hover': 'var(--color-bg-hover)',
        text: 'var(--color-text)',
        muted: 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-hover': 'var(--color-accent-hover)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      }
    }
  }
  ```

#### [MODIFY] [globals.css](file:///Users/mohammedbenaoumeur/Code/Portfolio/app/globals.css)
- Implement color mappings inside `:root` (light) and `[data-theme="dark"]` using hex values from `design-tokens.ts`.
- Set default transition attributes on elements (`transition: background-color 0.3s ease, color 0.2s ease`).
- Setup custom selections utilizing the `--color-accent` variables.
- Force `scroll-behavior: smooth` globally on html.

### 2. Client-Side Theme Engine

#### [NEW] [theme.ts](file:///Users/mohammedbenaoumeur/Code/Portfolio/lib/theme.ts)
- Construct client hooks that check `localStorage` values. Falls back to `window.matchMedia('(prefers-color-scheme: dark)')` on a user's first visit.
- Bind changes directly onto `document.documentElement.setAttribute('data-theme', theme)`.

#### [NEW] [ThemeToggle.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/components/ui/ThemeToggle.tsx)
- Standard button rendering Sun (light mode active) or Moon (dark mode active) SVGs.
- Utilize Framer Motion's `AnimatePresence` to fade and rotate icons on theme toggling.
- Guarantee proper ARIA controls (`aria-label="Toggle dark mode"`).

### 3. Structural Overhaul & Navigation

#### [NEW] [use-scroll-spy.ts](file:///Users/mohammedbenaoumeur/Code/Portfolio/lib/use-scroll-spy.ts)
- Hook accepting a list of element IDs. Set up an `IntersectionObserver` targeting `threshold: 0.3`.
- Returns the currently active section ID string, dynamically updating the active state as sections enter the screen.

#### [NEW] [MobileNav.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/components/layout/MobileNav.tsx)
- Create a header bar sticky to the top on mobile. Includes the name and a hamburger icon.
- Sliding drawer menu controlled by `AnimatePresence`. Fades in a dark backdrop overlay and slides the navigation links panel in from the right.

#### [MODIFY] [page.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/app/page.tsx)
- Re-architect primary homepage:
  - **Desktop (lg+)**: 2-column flex or grid.
    - Left column (40% width, fixed/sticky): Displays Name, Title, 1-2 sentence tagline, social list icons, navigation links with expanding indicators (lines extending on hover/active section match), and theme toggle.
    - Right column (60% width, scrolling content): Renders `#about`, `#experience`, `#projects`, `#skills`, and `#contact` sequentially.
  - **Mobile (< lg)**: Renders a single-column block with a sticky header and mobile slide-out nav.

### 4. Interactive & Visual Polish

#### [NEW] [CursorGlow.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/components/ui/CursorGlow.tsx)
- Renders a pointer glow overlay. Tracks mouse movements on desktop viewports.
- Employs Framer Motion's `useSpring` to smooth absolute coordinate offsets.
- Automatically hide the overlay on devices with touch capability.

#### [NEW] [AnimateIn.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/components/ui/AnimateIn.tsx)
- Viewport entrance wrapper component using Framer Motion's `whileInView` and `viewport: { once: true, margin: '-100px' }`.
- Animates opacity and vertical/horizontal transition.
- Respects browser/system preferences to disable animations instantly for `prefers-reduced-motion`.

#### [MODIFY] [page.tsx / project list](file:///Users/mohammedbenaoumeur/Code/Portfolio/app/page.tsx)
- Wrap individual sections, headings, grid lists, and form buttons in `AnimateIn` blocks to coordinate smooth staggered reveals.
- Redesign project cards to expand slightly, scale, lift (`translateY(-4px)`), and brighten project visual previews on hover.
- Update skill badges to display subtle shadow glows matching the active theme's accent color on hover.

#### [MODIFY] [app/projects/[slug]/page.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/app/projects/%5Bslug%5D/page.tsx)
- Apply the dark/light variables consistently across the project detail page.
- Add an animated back arrow hook (`← Back to projects`) that moves horizontally on hover.
- Integrate a smooth modal lightbox overlay to display zoomed image assets.

#### [MODIFY] [layout.tsx](file:///Users/mohammedbenaoumeur/Code/Portfolio/app/layout.tsx)
- Import Inter font as a standard Next.js variable `inter.variable`.
- Inject `data-theme="dark"` dynamically onto the default `<html>` tag to eliminate flash of unstyled theme on page loading.
- Add `<meta name="theme-color" content="#0f172a" />`.

---

## Verification Plan

### Automated Tests
- Check type compliance across all customized client modules and pages using `npx tsc --noEmit`.
- Run production bundler tests using `pnpm build` to confirm Next.js static asset compiler runs without errors.
- Run Lighthouse audits locally on homepage and dynamic project detail routes using the browser dev tools.

### Manual Verification
- **Theme Switching**: Confirm smooth transitions, persistence inside `localStorage` across reloads, and proper contrast adjustments.
- **Scroll-Spy**: Verify that the navigation line indicators animate correctly matching scroll coordinates.
- **Micro-Animations**: Check section reveals. Verify that turning on prefers-reduced-motion in browser/OS settings disables these animations immediately.
- **Mouse Spotlight**: Confirm the cursor glow tracks pointer movement on desktop, fades out when leaving the viewport, and is fully disabled on touch/mobile devices.
- **Mobile Usability**: Confirm that mobile Hamburger tapping opens the drawer cleanly, overlay blocks body scrolls, and navigation closes automatically on section click.
