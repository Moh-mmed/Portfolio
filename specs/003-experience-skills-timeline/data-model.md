# Data Model: Phase 2 - Experience & Skills Overhaul

## Experience Entry
Represents a professional work history record.

### Schema Details
- **Source**: `content/experience.json` (JSON array of Experience objects)
- **Validation**: `lib/content.ts` -> `experienceSchema` (Zod validation schema)

### Fields
| Field Name | Type | Validation Rules | Description |
|---|---|---|---|
| `company` | string | Minimum 1 character | The name of the organization |
| `role` | string | Minimum 1 character | The professional title/role |
| `location` | string | Minimum 1 character | Location (e.g. "Remote", "Tunis, Tunisia") |
| `type` | string (enum) | Must be `"full-time"`, `"part-time"`, `"contract"`, or `"freelance"` | The employment arrangement |
| `startDate` | string | Format: `YYYY-MM` | Start date |
| `endDate` | string or null | Format: `YYYY-MM` or `null` (optional/nullable) | End date; if `null`, indicates current employment |
| `description` | array of strings | Minimum 1 item, minimum 1 character per item | Markdown-enabled list of technical achievements |
| `tech` | array of strings | Minimum 1 item, minimum 1 character per item | Technology tags/stack associated with this role |
| `logo` | string (optional)| Minimum 1 character | Logo image file name (located in `/public/images/companies/`) |

---

## Skill Category
Represents a collection of skills grouped by technical discipline.

### Schema Details
- **Source**: `content/skills.json` (JSON object containing a `categories` array)
- **Validation**: `lib/content.ts` -> `skillsSchema` (Zod validation schema)

### Fields (Category)
| Field Name | Type | Validation Rules | Description |
|---|---|---|---|
| `name` | string | Minimum 1 character | The name of the skill group (e.g., "Languages", "AI/ML") |
| `skills` | array of Skill | Minimum 1 item | The list of skills within this category |

### Fields (Skill Object)
| Field Name | Type | Validation Rules | Description |
|---|---|---|---|
| `name` | string | Minimum 1 character | The name of the technology or skill |
| `level` | string (enum) | Must be `"expert"`, `"advanced"`, or `"intermediate"` | Proficiency classification |
| `yearsOfExperience` | number | Optional, positive number | Years of delivery experience |
