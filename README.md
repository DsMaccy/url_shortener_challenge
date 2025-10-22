# Tech Challenge: Typed URL Shortener + Analytics

Build a tiny, cleanly-typed REST API that creates short URLs, redirects by slug, and tracks basic click analytics.

> [!IMPORTANT]
> Timebox: ≤ 2 hours

## Requirements

- Node + Express + TypeScript with "strict": true.
- Use a layered structure (routes → controllers → services → store).
- Validation with a schema library (e.g., zod) and types inferred from schemas (no any).
- Centralized error handler with a typed error shape (see below).
- In-memory store (Map/Record). DB optional.

## Entities

```typescript
interface ShortUrl {
  slug: string; // unique, [a-z0-9-]{3,30}
  target: string; // https://...
  createdAt: string; // ISO
}
```

```typescript
interface ClickEvent {
  slug: string;
  timestamp: string; // ISO
  userAgent?: string;
  ip?: string;
}
```

## Endpoints

1. `POST /urls` → Create short URL
   - Body: `{ target: string; slug?: string }`
   - If slug absent, generate one (`[a-z0-9]{6}`).
   - Validate target is a well-formed URL and slug format if provided.
   - Response: 201 `{ slug, target, createdAt }`
2. `GET /:slug` → Redirect
   - 302 redirect to target.
   - Record a ClickEvent (timestamp, User-Agent, and IP).
   - If not found → `404`.
3. `GET /urls/:slug/stats` → Basic analytics

Response, sort byDay ascending by date.

```typescript
{
  slug: string;
  totalClicks: number;
  byDay: Array<{ date: string; count: number }>; // YYYY-MM-DD
  lastClickAt: string | null;
}
```

4. `GET /urls` → List of all urls

## Middleware & Errors

- Request validation middleware (derive types from zod schemas and pass typed body to handler).
- Rate limit middleware for `POST /urls`: simple in-memory limit, e.g., 5 creates per minute per IP; return 429 when exceeded.
- Central error handler returns:

```json
{
  "error": {
    "code": "VALIDATION_ERROR", // "VALIDATION_ERROR" | "NOT_FOUND" | "RATE_LIMITED" | "INTERNAL"
    "message": "..."
  }
}
```

## What We’re Explicitly Looking For

- TypeScript mastery: inferred types from schemas, narrowings in middleware, no leaky any, typed error objects, typed config/utilities.
- Express fundamentals: clean routing, small handlers, async error propagation, middleware composition (validation, rate limit, errors).
- API ergonomics: consistent status codes, pagination, helpful errors, predictable behavior (idempotency).

## Deliverables

- GitHub repo (or zip) with setup instructions and a few sample curl commands.
- Note any tradeoffs or “what I’d add next” if time ran out.

## Explanation

1.
