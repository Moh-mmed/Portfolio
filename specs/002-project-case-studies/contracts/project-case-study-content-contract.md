# Contract: Project Case Study Content and Loaders

## Purpose

Define the local content interface for detailed project pages in the active
high-level projects phase.

## Content Directory Contract

```text
content/
├── README.md
└── projects/
    ├── kidooz.json
    ├── lakesai.json
    └── tutorio.json

public/
└── images/
    ├── placeholder.jpg
    └── projects/
        ├── kidooz/
        ├── lakesai/
        └── tutorio/
```

## Project File Contract

Each project file is named `content/projects/{slug}.json`. The internal `slug`
value must match `{slug}`.

Required fields:

- `slug`
- `title`
- `tagline`
- `featured`
- `order`
- `category`
- `tech`
- `role`
- `timeline`
- `description`
- `problem`
- `solution`
- `images`

Optional fields:

- `company`
- `architecture`
- `impact`
- `links.live`
- `links.github`
- `links.caseStudy`

## Field Behavior Contract

- `description`, `problem`, `solution`, and optional `architecture` are
  Markdown-capable strings rendered as authored content, not hardcoded copy.
- `impact` is a list of public-safe outcome statements. Empty or missing lists
  suppress the impact section rather than rendering placeholders.
- `images` contains one or more filenames relative to
  `public/images/projects/{slug}/`, except for the shared placeholder fallback.
- `links` is optional. Only provided URLs render visible link actions.

## Validation Contract

- Compile-time `Project` typing is declared in `lib/types.ts`.
- Runtime project parsing remains in `lib/content.ts` with zod.
- Invalid project content must fail the build with a clear error that includes
  the file path and failing field.
- Slug mismatch, empty long-form fields, invalid URLs, empty `tech`, and empty
  image filenames are all build-blocking validation failures.

## Loader Function Contract

`lib/content.ts` exposes:

```typescript
export async function getAllProjects(): Promise<Project[]>;
export async function getFeaturedProjects(): Promise<Project[]>;
export async function getProjectBySlug(slug: string): Promise<Project | null>;
```

### Behavior

- Load only from local files under `content/projects/`.
- Validate loaded content before returning it.
- Return fully typed `Project` objects defined in `lib/types.ts`.
- Sort projects by `order`, then `title`.
- Return `null` from `getProjectBySlug` only when no matching slug exists.
- Produce no network requests.

## Documentation Contract

`content/README.md` must document:

- The extended project schema, including `problem`, `solution`,
  `architecture`, `impact`, and image path conventions.
- Which project fields are required versus optional.
- A full example project record with long-form fields.
- Common mistakes, including filename/slug mismatch, broken image references,
  empty required long-form fields, and exposing confidential material.
