# Data Model: Foundation Refactor

## Project

Professional portfolio item displayed on the homepage, project listing, and
minimal project detail route.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `slug` | `string` | Yes | Lowercase URL slug; must match the JSON filename without extension |
| `title` | `string` | Yes | Non-empty; shown as the project display name |
| `tagline` | `string` | Yes | Non-empty one-line summary |
| `featured` | `boolean` | Yes | Controls homepage inclusion |
| `order` | `number` | Yes | Integer; lower values render earlier |
| `category` | `'web' \| 'mobile' \| 'ai' \| 'ecommerce' \| 'saas'` | Yes | One of the allowed portfolio categories |
| `tech` | `string[]` | Yes | At least one non-empty technology label |
| `role` | `string` | Yes | Non-empty owner role |
| `company` | `string` | No | Optional organization or client label |
| `timeline` | `string` | Yes | Non-empty display date range |
| `description` | `string` | Yes | Non-empty Markdown-capable summary |
| `problem` | `string` | No | Reserved for later detailed project phase |
| `solution` | `string` | No | Reserved for later detailed project phase |
| `impact` | `string[]` | No | Optional outcome bullets |
| `images` | `string[]` | Yes | Image filenames; may use a documented fallback image |
| `links` | object | No | Optional `live`, `github`, and `caseStudy` URL fields |

### Relationships

- Project files live in `content/projects/{slug}.json`.
- Project media lives in `public/images/projects/{slug}/` or uses
  `public/images/placeholder.jpg`.
- Featured projects are a filtered subset of all projects.

### Phase 0 Seed Records

- `lakesai`
- `tutorio`
- `kidooz`

Legacy tutorial projects such as Natours, weather apps, color generators, and
basic task apps are not valid public project records for this phase.

## Experience Entry

Work history item displayed in the experience timeline.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `company` | `string` | Yes | Non-empty organization name |
| `role` | `string` | Yes | Non-empty role title |
| `location` | `string` | Yes | Non-empty location or remote context |
| `type` | `'full-time' \| 'part-time' \| 'contract' \| 'freelance'` | Yes | One allowed engagement type |
| `startDate` | `string` | Yes | `YYYY-MM` format |
| `endDate` | `string \| null` | No | `YYYY-MM` or `null` for current |
| `description` | `string[]` | Yes | At least one contribution-oriented bullet |
| `tech` | `string[]` | Yes | Technologies used in the role |
| `logo` | `string` | No | Filename under `public/images/companies/` |

### Relationships

- Experience records live in `content/experience.json` as an ordered array.
- Company logos are optional; missing logos render a text fallback.

### Phase 0 Seed Records

- Vitafluence.ai
- Upwork Freelancer
- Extramus internship
- Prodexo internship

## Skill

Individual capability shown inside a skill category.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | `string` | Yes | Non-empty skill label |
| `level` | `'expert' \| 'advanced' \| 'intermediate'` | Yes | One allowed proficiency level |
| `yearsOfExperience` | `number` | No | Positive number when present |

## Skill Category

Group of related skills displayed in the skills grid.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `name` | `string` | Yes | Non-empty category name |
| `skills` | `Skill[]` | Yes | At least one skill |

### Phase 0 Categories

- Languages
- Frameworks
- AI/ML
- Tools

## Skills

Top-level object in `content/skills.json`.

### Fields

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `categories` | `SkillCategory[]` | Yes | At least one category |

## About Content

Markdown narrative content displayed on the about page and reusable about
sections.

### Frontmatter

| Field | Type | Required | Validation |
|-------|------|----------|------------|
| `title` | `string` | Yes | Non-empty page or section title |
| `description` | `string` | Yes | Non-empty SEO and summary description |

### Body

Markdown content after frontmatter. The body must be non-empty and should avoid
implementation-specific details.

## Deployment Guide

Owner-facing documentation for deployment and verification.

### Sections

| Section | Required Content |
|---------|------------------|
| Vercel | Prerequisites, GitHub connection, build command, verification |
| Netlify | Build command, publish/output settings, verification |
| Cloudflare Pages | Framework preset, build/output settings, verification |
| VPS | Docker setup, Caddy reverse proxy, SSL, process verification |
| Environment | Variable name, purpose, required or optional status |

## Loader Contracts

All loader functions live in `lib/content.ts`, validate with zod, and expose
explicit return types:

```typescript
export async function getAllProjects(): Promise<Project[]>;
export async function getFeaturedProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project | null>;
export async function getExperience(): Promise<Experience[]>;
export async function getSkills(): Promise<Skills>;
export async function getAbout(): Promise<{
  title: string;
  description: string;
  content: string;
}>;
```

## State and Ordering Rules

- Projects sort by `order` ascending, then `title` ascending for deterministic
  rendering.
- Featured projects are projects where `featured` is `true`; if none exist, the
  homepage renders a polished empty state.
- Current experience entries have `endDate: null` or omit `endDate`; current
  entries sort before completed entries when dates are otherwise comparable.
- Malformed content fails validation during build and reports the content file
  path plus the invalid field.
