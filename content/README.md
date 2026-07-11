# Content Schema Guide

All portfolio content is maintained in local files inside `content/`. Update
these files to change public content without editing React components.

## Files

- `content/projects/*.json`: individual project entries
- `content/experience.json`: work history timeline
- `content/education.json`: academic history timeline
- `content/skills.json`: categorized skills
- `content/about.md`: about page frontmatter plus markdown body

## Project schema

Required fields:

- `slug`
- `title`
- `tagline`
- `featured`
- `order`
- `category`
- `difficulty` (optional)
- `tech`
- `role`
- `timeline`
- `description` (Markdown)
- `images`

Optional fields:

- `company`
- `visible`
- `links.live`
- `links.github`
- `links.other`

Example:

```json
{
  "slug": "lakesai",
  "title": "lakeSai",
  "tagline": "Operational AI tooling for a private product environment",
  "featured": true,
  "order": 1,
  "category": "ai",
  "difficulty": "difficult",
  "tech": ["Next.js", "TypeScript", "Node.js"],
  "role": "Full-Stack Developer",
  "timeline": "2024",
  "description": "Long-form project overview written in Markdown.",
  "images": ["placeholder.jpg"],
  "links": {
    "live": "https://example.com",
    "github": "https://github.com/example/project",
    "other": [
      {
        "title": "API docs",
        "url": "https://example.com/docs"
      }
    ]
  }
}
```

Common mistakes:

- Filename and `slug` do not match
- `category` is not one of the allowed values
- `tech` is empty
- A missing project image is referenced without falling back to `placeholder.jpg`

## Experience schema

Required fields:

- `company`
- `role`
- `location`
- `type`
- `startDate`
- `description`
- `tech`

Optional fields:

- `endDate`
- `logo`

`startDate` and `endDate` use `YYYY-MM`.

## Education schema

Required fields:

- `institution`
- `degree`
- `location`
- `startDate`
- `endDate`

Optional fields:

- `logo`
- `highlights`

`startDate` and `endDate` use `YYYY-MM`.
Education logos are loaded from `public/images/institutions/`.

## Skills schema

`skills.json` stores a top-level `categories` array. Each category needs:

- `name`
- `skills`

Each skill needs:

- `name`
- `level`

Optional:

- `yearsOfExperience`

## About schema

`about.md` must contain frontmatter:

```md
---
title: About Mohammed Ben Aoumeur
description: Short summary for the about page and metadata.
---
```

The markdown body must not be empty.
