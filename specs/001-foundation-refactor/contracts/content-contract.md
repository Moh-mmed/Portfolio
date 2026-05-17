# Contract: Content Sources and Loaders

## Purpose

Define the local content interface that presentation components consume. The
contract is file-based because the portfolio has no external CMS, database, or
runtime authoring service in Phase 0.

## Content Directory Contract

```text
content/
├── README.md
├── about.md
├── experience.json
├── projects/
│   ├── kidooz.json
│   ├── lakesai.json
│   └── tutorio.json
└── skills.json
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
- `images`

Optional fields:

- `company`
- `problem`
- `solution`
- `impact`
- `links.live`
- `links.github`
- `links.caseStudy`

Invalid project content must stop the build with a clear error that includes
the file path and failing field.

## Experience File Contract

`content/experience.json` contains an array of experience entries. Required
fields are `company`, `role`, `location`, `type`, `startDate`, `description`,
and `tech`. `endDate` may be omitted or set to `null` for the current role.

## Skills File Contract

`content/skills.json` contains a top-level `categories` array. Every category
has a non-empty `name` and at least one skill. Every skill has a `name` and
`level`.

## About File Contract

`content/about.md` uses frontmatter followed by Markdown body content.

Required frontmatter:

- `title`
- `description`

The Markdown body must be non-empty.

## Loader Function Contract

`lib/content.ts` exposes these functions:

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

### Behavior

- Load only from local files under `content/`.
- Validate loaded content with zod before returning it.
- Return fully typed data defined in `lib/types.ts`.
- Sort projects deterministically by `order`, then `title`.
- Exclude malformed entries by failing the build, not by silently dropping data.
- Return `null` from `getProjectBySlug` only when the slug is well formed but no
  matching project exists.
- Produce no network requests.

## Documentation Contract

`content/README.md` must document:

- Purpose of each content file.
- Required and optional fields for every content type.
- Valid examples for project, experience, skills, and about content.
- Common mistakes, including filename/slug mismatch, invalid date format,
  missing image fallback, empty skill groups, and tutorial projects added as
  public portfolio work.
