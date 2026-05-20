# Phase 1: Data Model & State

## Zod Schema: ContactMessage

The contact form inputs will be validated using Zod.

```typescript
import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required'),
  message: z.string().min(1, 'Message is required'),
});

export type ContactMessage = z.infer<typeof contactSchema>;
```

## Application State (Client Component)

The `ContactForm` component manages the following UI state:
- `name`: string
- `email`: string
- `subject`: string
- `message`: string
- `isSubmitting`: boolean
- `submitResult`: { success: true; message: string } | { success: false; error: string } | null

## Rate Limiting Store

In-memory store maps an IP address string to an array of millisecond timestamps.

```typescript
type RateLimitStore = Map<string, number[]>;
```
- Map key: `ip` (string)
- Map value: `timestamps` (number[])
