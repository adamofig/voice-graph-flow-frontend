# Routing in Next.js (App Router)

Next.js uses a file-system based router where folders are used to define routes. Each folder in the `app` directory represents a route segment that maps to a URL segment.

## 1. Creating a Basic Route

To create a new route, simply create a new folder inside the `app` directory and add a `page.tsx` file inside it.

**Example Structure:**
```text
app/
├── layout.tsx
├── page.tsx          // Route: /
└── dashboard/
    └── page.tsx      // Route: /dashboard
```

## 2. Dynamic Routes

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use dynamic segments that are filled in at request time or prerendered at build time.

A dynamic segment can be created by wrapping a folder's name in square brackets: `[segmentName]`.

**Example:**
`app/blog/[slug]/page.tsx` will match `/blog/hello-world` or `/blog/nextjs-guide`.

## 3. Nested Routes

You can create nested routes by nesting folders inside each other.

**Example:**
`app/dashboard/settings/page.tsx` will map to `/dashboard/settings`.

## 4. Special Files

- `page.tsx`: The UI unique to a route and makes the path publicly accessible.
- `layout.tsx`: Shared UI for a segment and its children.
- `loading.tsx`: Loading UI for a segment and its children.
- `error.tsx`: Error UI for a segment and its children.
- `not-found.tsx`: UI for when a route is not found.

## 5. API Routes (Backend Logic)

You can create backend endpoints using `route.ts` files. These are equivalent to Node.js Express handlers. Any folder that contains a `route.ts` instead of a `page.tsx` becomes an API endpoint.

**Example Structure:**
`app/api/user/route.ts` -> maps to `GET http://localhost:3000/api/user`

```ts
// app/api/user/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ name: 'John Doe' });
}
```

## 6. Metadata

You can define metadata (like titles and descriptions) by exporting a `metadata` object from a `layout.tsx` or `page.tsx`.

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Page Title',
  description: 'A description for SEO',
}
```

---

### Implementation Example: Dashboard Route

I have created a new route at `/data` that demonstrates fetching from a dummy API. Check out `flow-video/app/data/page.tsx` to see it in action!
