# Content Schema Guide

All portfolio content is maintained in local files inside `content/`. Update
these files to change public content without editing React components.

## Files

- `content/projects/*.json`: individual professional projects
- `content/experience.json`: work history timeline
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

Example:

```json
{
  "slug": "lakesai",
  "title": "lakeSai",
  "tagline": "Operational AI tooling for a private product environment",
  "featured": true,
  "order": 1,
  "category": "ai",
  "tech": ["Next.js", "TypeScript", "Node.js"],
  "role": "Full-Stack Developer",
  "timeline": "2024",
  "description": "A private professional engagement focused on shipping polished internal tooling.",
  "images": ["placeholder.jpg"]
}
```

Common mistakes:

- Filename and `slug` do not match
- `category` is not one of the allowed values
- `tech` is empty
- Tutorial projects are added to public listings
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
