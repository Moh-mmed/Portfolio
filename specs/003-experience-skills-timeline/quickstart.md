# Developer Quickstart: Phase 2 - Experience & Skills Overhaul

This guide outlines how to load, modify, and verify experience and skills content in this project.

## 1. Running the Development Server
To launch the project locally:
```bash
pnpm dev
```
Open [http://localhost:3000/about](http://localhost:3000/about) in your browser to view the Experience and Skills sections.

## 2. Modifying Content
Content is stored as local JSON files.

- To edit your employment history: modify `content/experience.json`
- To edit your tools or languages: modify `content/skills.json`

Both files are automatically watched by Next.js. Any changes will immediately hot-reload in the browser.

## 3. Schema Documentation
Refer to `content/README.md` for schemas and types. All edits are validated by Zod at runtime during page rendering. Invalid fields will raise an error in the development server console.

## 4. Verification & Testing

### Typecheck
Ensure all TypeScript definitions are correct:
```bash
pnpm typecheck
```

### E2E and Accessibility Tests
Run Playwright tests to verify the UI layout and accessibility metrics:
```bash
pnpm test:e2e
pnpm test:a11y
```

### Lighthouse Audit
To verify performance and best practices metrics locally:
```bash
pnpm lighthouse
```
Lighthouse targets: >= 95 for Performance, Accessibility, Best Practices, and 100 for SEO.
