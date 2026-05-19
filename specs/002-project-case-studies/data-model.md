# Data Model: Detailed Project Case Studies

## Project

Professional portfolio case study displayed in the featured grid, project
listing, sitemap, and detailed project page.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `slug` | `string` | Yes | Lowercase URL slug; must match the JSON filename without extension |
| `title` | `string` | Yes | Non-empty display name |
| `tagline` | `string` | Yes | Non-empty one-line positioning statement |
| `featured` | `boolean` | Yes | Controls homepage inclusion |
| `order` | `number` | Yes | Integer; lower values render earlier |
| `category` | `'web' \| 'mobile' \| 'ai' \| 'ecommerce' \| 'saas'` | Yes | One allowed portfolio category |
| `tech` | `string[]` | Yes | At least one non-empty technology label |
| `role` | `string` | Yes | Non-empty owner role |
| `company` | `string` | No | Optional client, employer, or product label |
| `timeline` | `string` | Yes | Non-empty human-readable date range |
| `description` | `string` | Yes | Non-empty Markdown-capable long-form summary |
| `problem` | `string` | Yes | Non-empty Markdown-capable problem statement |
| `solution` | `string` | Yes | Non-empty Markdown-capable solution narrative |
| `architecture` | `string` | No | Optional Markdown-capable architecture explanation |
| `impact` | `string[]` | No | Zero or more non-empty outcome statements; when present, items must be specific and user-safe for public sharing |
| `images` | `string[]` | Yes | At least one image filename relative to `public/images/projects/{slug}/`, with `placeholder.jpg` allowed only as the documented fallback |
| `links` | `ProjectLinks` | No | Optional public URLs for live site, source, or related case study |

### Relationships

- Project files live at `content/projects/{slug}.json`.
- Project detail pages render at `/projects/{slug}`.
- Project images live in `public/images/projects/{slug}/` unless the entry uses
  the shared placeholder fallback.
- The first resolved project image is the default preview for cards, metadata,
  and social sharing.

### Derived Presentation Fields

- **Primary image URL**: Derived from `images[0]` through `resolveProjectImage`.
- **Visible impact list**: Derived from `impact`, omitted entirely when empty.
- **Case-study sections**: `problem`, `solution`, and optional `architecture`
  render as dedicated sections on the detail page.

### Ordering Rules

- Projects sort by `order` ascending, then `title` ascending for deterministic
  listing behavior.
- Featured projects are the subset where `featured` is `true`.

## ProjectLinks

Optional public destinations associated with a project.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `live` | `string` | No | Absolute HTTPS URL when present |
| `github` | `string` | No | Absolute HTTPS URL when present |
| `caseStudy` | `string` | No | Absolute HTTPS URL when present |

### Rules

- At least zero links are allowed; empty objects are permitted but do not render
  visible actions.
- Only publicly safe links may be included.

## ProjectImageAsset

Local visual asset referenced by a project.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `projectSlug` | `string` | Yes | Must match an existing project `slug` |
| `fileName` | `string` | Yes | Non-empty image filename referenced by the project record |
| `altContext` | derived | Yes | Alt text is derived from project title plus gallery context in the UI layer |

### Rules

- Assets must resolve to a local path before build completion.
- If an asset is missing, the implementation must either use the documented
  placeholder fallback or fail validation explicitly rather than silently render
  a broken image.

## Route Metadata Payload

Derived public metadata generated from a `Project` record for its detail page.

### Fields

| Field | Source | Required Behavior |
|-------|--------|-------------------|
| `title` | `project.title` | Unique page title including site context |
| `description` | `project.tagline` or summary excerpt | Non-empty metadata description |
| `canonicalUrl` | `project.slug` | Absolute canonical URL for `/projects/{slug}` |
| `openGraphImage` | first resolved project image | Uses a valid share image URL |
| `structuredData` | project content fields | Emits `CreativeWork` JSON-LD for the rendered project |

## Loader Contracts

Runtime validation remains centralized in `lib/content.ts`, while compile-time
types remain in `lib/types.ts`.

```typescript
export async function getAllProjects(): Promise<Project[]>;
export async function getFeaturedProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project | null>;
```

### Loader Rules

- Validate every project file with zod before returning it.
- Fail on missing required long-form fields (`problem`, `solution`) for this
  phase's flagship projects.
- Keep filename and slug matching enforced.
- Preserve deterministic sorting and explicit `Promise` return types.

## Seed Records for This Phase

- `lakesai`: professional AI case study with sanitized long-form content and at
  least placeholder-safe imagery.
- `tutorio`: professional product/web case study with sanitized long-form
  content and at least placeholder-safe imagery.
- `kidooz`: production ecommerce case study with supplied project-specific
  content and image references.
