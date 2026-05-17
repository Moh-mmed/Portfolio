# Quickstart: Foundation Refactor

## Prerequisites

- Node.js compatible with Next.js 15.
- pnpm installed.
- Git working tree on branch `001-foundation-refactor`.

## Install

```bash
pnpm install
```

## Develop

```bash
pnpm dev
```

Open `http://localhost:3000` and verify:

- Homepage renders the hero and featured projects.
- About page renders Markdown, experience, and skills from `content/`.
- Projects page renders only lakeSai, tutorio, and kidooz.
- Contact page renders without form submission behavior.
- Mobile navigation opens, closes, and remains keyboard accessible.

## Content Editing Check

1. Edit one project JSON file under `content/projects/`.
2. Edit one entry in `content/experience.json`.
3. Edit one skill category in `content/skills.json`.
4. Edit one paragraph in `content/about.md`.
5. Restart or refresh the local dev server and confirm public pages update
   without presentation code changes.

## Static Quality Checks

```bash
pnpm lint
pnpm typecheck
pnpm build
```

Expected result:

- No TypeScript errors.
- No lint errors.
- Invalid content fails with a clear validation message.
- Production build completes successfully.

## Browser and Accessibility Checks

```bash
pnpm test:e2e
pnpm test:a11y
```

Expected coverage:

- `/`
- `/about`
- `/projects`
- `/projects/lakesai`
- `/projects/tutorio`
- `/projects/kidooz`
- `/contact`

Run checks at mobile and desktop viewport sizes. Confirm no overlapping text,
layout-caused horizontal scrolling, broken navigation, or portfolio-caused
console errors.

## Lighthouse Checks

```bash
pnpm lighthouse
```

Required constitution targets:

- Performance: 95+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
- LCP: under 2.5s
- CLS: under 0.1
- Interaction responsiveness: under 100ms target

## Deployment Documentation Check

Review `docs/DEPLOYMENT.md` and confirm it includes:

- Vercel deployment steps.
- Netlify deployment steps.
- Cloudflare Pages deployment steps.
- Self-hosted VPS deployment with Docker and Caddy.
- Environment variable table matching `.env.example`.

## Phase Completion Gate

Before implementation is considered complete:

- `tasks.md` must exist.
- `/speckit.analyze` must pass on `spec.md`, `plan.md`, and `tasks.md`.
- All verification commands above must pass.
- The site must not expose deprecated tutorial projects in public listings.
