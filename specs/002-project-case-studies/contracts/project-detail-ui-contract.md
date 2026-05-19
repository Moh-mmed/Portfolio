# Contract: Project Detail UI, Routing, and Metadata

## Purpose

Define the rendering, interaction, metadata, and quality requirements for the
`/projects/[slug]` case-study experience.

## Route Contract

| Route | Source Data | Required Behavior |
|-------|-------------|-------------------|
| `/projects` | All project records | Links to each project detail page using the existing project grid |
| `/projects/[slug]` | Matching `Project` record | Renders a full case study or 404 for unknown slugs |

## Static Generation Contract

- `generateStaticParams` must enumerate every project slug from local content.
- `generateMetadata` must derive a unique title, description, canonical URL,
  OpenGraph image, and Twitter card details for each project.
- Project detail pages must remain compatible with static generation and local
  content builds.

## Section Rendering Contract

The detail page must render these sections in a professional, readable order:

1. Hero area with title, tagline, timeline, role, and tech badges.
2. Long-form project overview.
3. Problem statement.
4. Solution narrative.
5. Architecture section when `architecture` exists.
6. Impact list when `impact` contains one or more items.
7. Image gallery with responsive grid layout and enlarge interaction.
8. Public links section containing only the actions that exist for the project.

## Component Contract

### `ProjectDetail`

- Server-rendered wrapper for the project case-study layout.
- Accepts one validated `Project`.
- Uses semantic headings and section structure.
- Renders Markdown-authored sections safely.
- Omits optional sections cleanly when data is absent.

### `ImageGallery`

- Displays one or more project images in a responsive grid.
- Uses Next.js `Image` for all thumbnails and enlarged views.
- Supports click-to-enlarge behavior without introducing a third-party gallery
  dependency.
- Provides keyboard-accessible close behavior and visible focus states.
- Avoids layout shift by using stable aspect ratios.

## Image and Fallback Contract

- The gallery must resolve image paths from `public/images/projects/{slug}/`.
- If a project uses `placeholder.jpg`, the UI must still look intentional and
  avoid broken media states.
- Every rendered image must have meaningful alt text derived from project
  context and gallery position.

## Metadata and SEO Contract

Every project detail page provides:

- Unique title.
- Non-empty description.
- Canonical URL.
- OpenGraph title, description, URL, and image.
- Twitter Card metadata.
- `CreativeWork` JSON-LD derived from the project content.

## Responsive and Accessibility Contract

- Mobile viewport must have no horizontal scrolling caused by project layout or
  gallery behavior.
- Long Markdown content, impact bullets, and badges must wrap cleanly.
- Gallery interactions must remain usable by keyboard and touch input.
- The page must preserve semantic landmarks and logical heading order.
- All interactive controls must have accessible names and visible focus styles.

## Verification Contract

Phase completion must include evidence from:

- `pnpm lint`
- `pnpm typecheck`
- `pnpm build`
- Playwright checks covering `/projects`, `/projects/lakesai`,
  `/projects/tutorio`, and `/projects/kidooz`
- axe accessibility checks for project detail pages
- Lighthouse verification that project detail pages still meet constitution
  targets
