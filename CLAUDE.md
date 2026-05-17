# CLAUDE.md — Project Memory

> **This file is read automatically by Claude Code at the start of every session.**
> Do not remove it. Do not let it go stale. Update it only when something genuinely durable changes.

---

## 1. Project identity

**Name:** Mohammed Ben Aoumeur — Portfolio Website
**One-liner:** A professional portfolio showcasing high-level full-stack and AI integration projects for senior software engineering roles.
**Current site:** https://benaoumeur.vercel.app/
**Target audience:** Recruiters, hiring managers, and potential clients looking for experienced full-stack developers with AI/LangChain expertise.

### Owner context

- **Name:** Mohammed Ben Aoumeur
- **Location:** Algiers, Algeria
- **GitHub:** https://github.com/Moh-mmed
- **LinkedIn:** https://www.linkedin.com/in/mohammed-benaoumeur/
- **Current role:** Back-end Developer at Vitafluence.ai (remote, Frankfurt, Germany)
- **Focus:** Full-stack development (React, Next.js, Node.js, TypeScript) + AI integration (Python, LangChain)

---

## 2. Business rules that never change

- **Content philosophy:** Showcase **high-level professional projects only**. Entry-level tutorial projects (Natours, basic weather apps, color pickers) are deprecated and should not appear in the main portfolio.
- **Primary projects to highlight:**
  - **lakeSai** — professional project
  - **tutorio** — company project
  - **kidooz** — e-commerce platform (Algeria)
  - Other professional work only (filter out learning/tutorial projects)
- **No external CMS:** All content lives in local JSON/Markdown files tracked in Git. The owner edits files directly; no database, no Contentful, no Sanity.
- **Deployment flexibility:** Must support multiple free/paid hosting options (Vercel, Netlify, Cloudflare Pages, custom VPS) without code changes.
- **Performance baseline:** Lighthouse score 95+ (Performance, Accessibility, Best Practices, SEO).
- **Professional tone:** Clean, minimal, portfolio-quality design. No flashy animations; focus on content and readability.

---

## 3. Technology stack (locked)

Do not substitute any of these without an explicit constitution amendment.

| Layer           | Choice                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------- |
| Framework       | Next.js 15 (App Router), TypeScript strict                                                      |
| UI              | Tailwind CSS + custom components (no external UI libraries unless explicitly approved)          |
| Content         | Local JSON + Markdown files (in `/content` directory)                                           |
| Image hosting   | Next.js Image Optimization (local images in `/public`) or Cloudinary (for large/dynamic images) |
| Forms           | Server Actions (Next.js) + `zod` validation                                                     |
| Analytics       | Optional: Vercel Analytics or privacy-focused Plausible/Umami                                   |
| Deployment      | Vercel (primary), with support for Netlify/Cloudflare Pages as fallbacks                        |
| Package manager | pnpm (consistent with other projects)                                                           |

---

## 4. Repository layout

```
/app                  → Next.js 15 App Router pages
  /page.tsx           → Homepage
  /about/page.tsx     → About page
  /projects/page.tsx  → Projects listing
  /projects/[slug]/page.tsx → Individual project detail
  /contact/page.tsx   → Contact form
  /(admin)/           → Optional admin route group for content editing
/components           → React components
  /ui/                → Base UI components
  /sections/          → Page sections (Hero, ProjectGrid, etc.)
  /layout/            → Layout components (Header, Footer)
/content              → Content source (Git-tracked)
  /projects/          → Project JSON/MDX files
  /experience.json    → Work experience
  /skills.json        → Skills & technologies
  /about.md           → About page content
/public               → Static assets
  /images/            → Project images, headshot
  /resume.pdf         → Downloadable CV
/lib                  → Utilities
  /content.ts         → Content loader functions
  /types.ts           → TypeScript types
/specs                → Spec-Kit feature specs (one folder per phase)
/.specify             → Spec-Kit machinery
/.claude              → Claude Code config + Spec-Kit slash commands
```

---

## 5. Non-negotiable engineering principles

1. **Type safety end-to-end.** No `any`. Every content loader function is fully typed. Content JSON schemas validated with `zod`.
2. **No stubs, no `TODO` comments, no "will be implemented later" in delivered code.** If it's out of phase scope, don't reference it at all.
3. **Content-first architecture.** Every page pulls from local JSON/Markdown. Never hardcode portfolio content in components.
4. **Image optimization.** All images use Next.js `<Image>` component with proper `width`, `height`, and `alt` attributes.
5. **Accessible by default.** Semantic HTML, proper heading hierarchy, keyboard navigation, ARIA labels where needed.
6. **Mobile-first responsive.** Test every component on mobile viewport first, then scale up.
7. **Git as CMS.** Content changes go through Git commits. Content files have clear schemas documented in `/content/README.md`.
8. **No external API calls in production.** Contact form submissions go through Server Actions; no third-party form services unless explicitly approved.

---

## 6. Spec-Driven workflow (how we work)

This project uses **GitHub Spec-Kit**. You (Claude Code) must follow this workflow for every feature:

1. **Constitution** (`.specify/memory/constitution.md`) is the authoritative source. Read it first, every session. It outranks this file on anything about principles and governance.
2. **Specs live in `specs/NNN-feature-name/`.** Each feature has `spec.md` (what/why), `plan.md` (how), `tasks.md` (do), and possibly `research.md`, `data-model.md`, `contracts/`.
3. **Separation of concerns:**
   - `spec.md` — technology-agnostic. User stories, requirements, success criteria. No frameworks.
   - `plan.md` — engineering perspective. Frameworks, libraries, architecture, file structure.
4. **Slash commands** (Spec-Kit):
   - `/speckit.constitution` — create/update governance
   - `/speckit.specify` — create feature spec
   - `/speckit.clarify` — batch-question to tighten the spec
   - `/speckit.plan` — create technical plan
   - `/speckit.tasks` — break plan into tasks
   - `/speckit.analyze` — cross-check all artifacts for consistency
   - `/speckit.implement` — execute tasks
5. **Never skip ahead.** No coding before `tasks.md` exists and has been approved by the human.
6. **On ambiguity:** stop and ask. Do not infer. Do not proceed.
7. **On drift:** if an instruction contradicts the constitution, the constitution wins.

---

## 7. Refactor roadmap (phased order)

Each phase is one Spec-Kit feature. Complete, verify, merge, then move on.

### **Phase 0: Foundation Refactor**

Migrate to local JSON/Markdown CMS, clean up tech stack, make content fully editable without touching code. Remove entry-level projects from display.

### **Phase 1: High-Level Projects Showcase**

Build detailed project pages for lakeSai, tutorio, kidooz. Rich content: problem statement, tech stack, architecture diagrams, impact metrics, screenshots/videos.

### **Phase 2: Experience & Skills Overhaul**

Structured work experience timeline with company logos, detailed role descriptions, tech stack per role. Skills organized by category (languages, frameworks, tools, AI/ML).

### **Phase 3: Contact & Resume**

Contact form with Server Actions, spam protection, email notifications (dev/prod adapters). Downloadable resume PDF with auto-generated "last updated" date.

### **Phase 4: Admin Panel (Optional)**

Simple password-protected admin area for editing content JSON/Markdown files through a web UI. Saves back to Git (via GitHub API or local file writes).

### **Phase 5: Analytics & SEO**

Integrate privacy-focused analytics (Plausible/Umami), OpenGraph tags, structured data (JSON-LD), sitemap, robots.txt, SEO audit & fixes.

### **Phase 6: UI Polish & Performance**

Design system refinement, smooth page transitions, loading states, skeleton screens, Lighthouse 95+ scores, accessibility audit & fixes.

---

## 8. Content structure (non-negotiable schemas)

### Project schema (`/content/projects/*.json`)

```typescript
{
  slug: string;              // URL slug
  title: string;
  tagline: string;           // One-liner
  featured: boolean;         // Show on homepage?
  order: number;             // Display order
  category: 'web' | 'mobile' | 'ai' | 'ecommerce' | 'saas';
  tech: string[];            // Technologies used
  role: string;              // Your role
  company?: string;          // Company/client name
  timeline: string;          // e.g. "Q3 2024 - Present"
  description: string;       // Long-form markdown
  problem: string;           // Problem statement
  solution: string;          // Solution description
  impact?: string[];         // Metrics/outcomes
  images: string[];          // Image filenames in /public/images/projects/
  links?: {
    live?: string;
    github?: string;
    case_study?: string;
  };
}
```

### Experience schema (`/content/experience.json`)

```typescript
[
  {
    company: string;
    role: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'freelance';
    startDate: string;       // YYYY-MM
    endDate?: string;        // YYYY-MM or null for current
    description: string[];   // Bullet points
    tech: string[];
    logo?: string;           // Company logo filename
  }
]
```

### Skills schema (`/content/skills.json`)

```typescript
{
  categories: [
    {
      name: string;          // e.g. "Languages", "Frameworks", "AI/ML"
      skills: [
        {
          name: string;
          level: 'expert' | 'advanced' | 'intermediate';
          yearsOfExperience?: number;
        }
      ]
    }
  ]
}
```

---

## 9. Projects to highlight (priority order)

### Tier 1 — Featured (homepage + detailed pages)

1. **lakeSai** — full details TBD by owner
2. **tutorio** — company project, full details TBD by owner
3. **kidooz** — Algerian e-commerce platform (kids' clothing)

### Tier 2 — Additional professional work (projects page only)

- Any other production projects from Vitafluence.ai, Extramus, Prodexo, or Upwork clients
- Filter: must be production code with real users/business impact

### Deprecated (do NOT show)

- Natours (tutorial project)
- PHP e-commerce tutorial
- Color palette generator (learning project)
- Weather app (basic tutorial)
- Any other tutorial/learning projects from courses

---

## 10. Hosting strategy

### Primary: Vercel

- Zero-config Next.js deployment
- Automatic HTTPS, CDN, image optimization
- Free tier sufficient for portfolio (non-commercial)
- Custom domain support

### Fallback options (must support without code changes)

- **Netlify** — similar to Vercel, good Next.js support
- **Cloudflare Pages** — free, fast CDN, good for static exports
- **Self-hosted VPS** — Hetzner/Contabo EU, Docker + Caddy reverse proxy (for full control)

Document deployment instructions for each option in `/docs/DEPLOYMENT.md` during Phase 0.

---

## 11. Communication preferences

- Ask clarifying questions when a decision would meaningfully change the output. Otherwise make a sensible choice and note it in a comment.
- When producing code, always show the full file path as a header, then the complete file. No fragments unless I explicitly ask for a diff.
- Commit message style: `<type>(<scope>): <subject>` (e.g. `feat(projects): add lakeSai project page`).
- Always end a unit of work with: what was built, what was intentionally left out, how to verify it works.
- When implementing: focus on one task at a time, commit after each task, show progress clearly.

---

## 12. Design direction

### Visual style

- **Clean & minimal** — whitespace, clear typography, subtle shadows
- **Professional** — not flashy, not overly creative (this is a developer portfolio, not a designer portfolio)
- **Dark mode optional** — light mode is primary; dark mode is a Phase 6 nice-to-have
- **Typography** — Inter or similar modern sans-serif for UI, Georgia/Lora for long-form content
- **Color palette** — neutral grays + one accent color (blue or teal, to be locked during Phase 0)

### Components to avoid

- Carousels/sliders (bad UX, accessibility issues)
- Auto-playing videos (annoying, performance hit)
- Complex animations (distracting, maintenance burden)
- Hamburger menus on desktop (unnecessary)

### Components to use

- Clear navigation (sticky header)
- Grid layouts for projects
- Cards with hover states
- Simple fade/slide transitions
- Contact form with validation states
- Loading skeletons for async content

---

## 13. SEO & metadata requirements

Every page must have:

- Unique `<title>` tag (50-60 chars)
- Meta description (150-160 chars)
- OpenGraph tags (title, description, image)
- Twitter Card tags
- Canonical URL
- Structured data (JSON-LD) for Person, WebSite, and Project markup

Homepage meta:

```
Title: Mohammed Ben Aoumeur — Full-Stack Engineer & AI Integration Specialist
Description: Software engineer specializing in React, Next.js, Node.js, TypeScript, and AI integration with LangChain. Building scalable web applications and AI-powered back-end systems.
```

---

## 14. Performance budget

Target Lighthouse scores (minimum):

- **Performance:** 95+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

Hard limits:

- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms
- Cumulative Layout Shift (CLS): < 0.1

---

## 15. Glossary (domain terms)

- **lakeSai** — professional project (details TBD by owner)
- **tutorio** — company project (details TBD by owner)
- **kidooz** — Algerian e-commerce platform for kids' clothing
- **Vitafluence.ai** — current employer (remote, Frankfurt, Germany)
- **LangChain** — AI framework for building LLM-powered applications
- **Server Actions** — Next.js feature for server-side form handling without API routes

---

_Last reviewed: on initial setup. Bump this line when you revise the file._
