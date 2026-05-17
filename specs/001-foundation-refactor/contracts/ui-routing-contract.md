# Contract: Public UI, Routing, and Metadata

## Purpose

Define the public portfolio routes, data dependencies, rendering expectations,
and quality checks for the Foundation Refactor.

## Routes

| Route | Source Data | Required Behavior |
|-------|-------------|-------------------|
| `/` | Featured projects, summary identity content | Render hero and featured projects filtered by `featured: true` |
| `/about` | `about.md`, `experience.json`, `skills.json` | Render about narrative, experience timeline, and skills grid |
| `/projects` | All project JSON files | Render lakeSai, tutorio, and kidooz; exclude tutorial project entries |
| `/projects/[slug]` | Matching project JSON file | Render a minimal project detail view or a 404 for unknown slugs |
| `/contact` | Static owner contact content | Render contact information without submission logic in Phase 0 |

## Navigation

- Header includes links to Home, About, Projects, and Contact.
- Desktop navigation is visible at desktop breakpoints.
- Mobile navigation uses a hamburger control with accessible labels and keyboard
  operability.
- Current route should have a visible active state.
- Links must be crawlable Next.js links.

## Image Rendering

- Every public image uses Next.js `Image`.
- Images have explicit width and height or a stable responsive sizing strategy.
- Meaningful images have descriptive alt text.
- Decorative images use empty alt text only when they do not convey content.
- Missing optional project media renders the documented fallback image without
  layout shift.

## Metadata

Every public page provides:

- Unique title.
- Meta description.
- OpenGraph title, description, URL, and image.
- Twitter Card metadata.
- Canonical URL.

Additional SEO outputs:

- Homepage includes `Person` and `WebSite` JSON-LD.
- Project detail pages include `CreativeWork` JSON-LD for the rendered project.
- `app/sitemap.ts` emits public route URLs.
- `app/robots.ts` allows crawling of public pages.

## Responsive Behavior

- Mobile viewport must have no horizontal scrolling caused by layout defects.
- Long titles, role descriptions, and skill labels wrap cleanly.
- Project cards keep stable image and content areas.
- Header navigation remains usable with keyboard and touch input.
- Footer content stacks without overlap.

## Accessibility Behavior

- Pages use semantic landmarks: header, main, footer, nav, section.
- Heading order is logical.
- Interactive controls have visible focus states.
- Icon-only controls have accessible labels.
- Color contrast satisfies WCAG AA for text and interactive states.

## Verification Contract

Phase completion must include evidence from:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Desktop and mobile Playwright smoke checks for the primary routes.
- Accessibility check with no portfolio-caused critical violations.
- Lighthouse audits meeting the constitution targets for primary public pages.

## Non-Goals

The route contract must not introduce:

- Detailed project case-study content.
- Contact form submission logic.
- Admin editing routes.
- Analytics scripts.
- Blog routes.
- Dark mode or complex animation systems.
