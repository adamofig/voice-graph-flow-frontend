# API Documentation Guide

This guide explains how to document new API routes in this project using `next-rest-framework` and Zod.

## 🚀 Quick Summary

1. **Refactor/Create Route**: Use `route` and `routeOperation` instead of the standard `NextResponse`.
2. **Define Schemas**: Use Zod to define input and output shapes.
3. **Generate Spec**: Run `npm run generate` to update `public/openapi.json`.
4. **View Docs**: Visit `/api/docs` in your browser.

---

## 🛠️ Step-by-Step: Documenting a New API

### 1. Basic Structure
Import the necessary utilities from `next-rest-framework` and `zod`.

```typescript
import { route, routeOperation, TypedNextResponse } from 'next-rest-framework';
import { z } from 'zod';
```

### 2. Define your Zod Schemas
Define your data structures. This provides both runtime validation and automatic documentation.

```typescript
const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
});
```

### 3. Create the Route Configuration
Wrap your handlers in `route()`. This exports the standard Next.js HTTP methods (`GET`, `POST`, etc.).

```typescript
export const { GET, POST } = route({
  // Operation ID should be unique across your API
  getUsers: routeOperation({
    method: 'GET',
  })
    .outputs([
      {
        status: 200,
        contentType: 'application/json',
        body: z.array(userSchema),
      },
    ])
    .handler(async () => {
      const users = await fetchUsers();
      return TypedNextResponse.json(users, { status: 200 });
    }),
});
```

### 4. Input Validation (Optional)
You can validate query parameters, path parameters, and request bodies.

```typescript
createUser: routeOperation({
  method: 'POST',
})
  .input({
    contentType: 'application/json',
    body: z.object({
      name: z.string(),
      email: z.string().email(),
    }),
  })
  .outputs([{ status: 201, contentType: 'application/json', body: userSchema }])
  .handler(async (req) => {
    const body = await req.json(); // Typed as { name: string, email: string }
    const newUser = await db.save(body);
    return TypedNextResponse.json(newUser, { status: 201 });
  }),
```

---

## 📄 Generating the OpenAPI JSON

To update `public/openapi.json`, run:

```bash
npm run generate
```

> [!IMPORTANT]
> Because your project connects to MongoDB, the `generate` command requires your `.env` variables. I've configured it to look for them, but usually `npm run generate` is enough if your environment is set up.

---

## 💡 Advices & Best Practices

### 1. Use `bodySchema` for Complex Objects
Sometimes Zod conversion to JSON Schema fails (especially with complex nested objects or recursive types). If you see a warning during `npm run generate`, provide a manual fallback:

```typescript
.outputs([
  {
    status: 200,
    contentType: 'application/json',
    body: myComplexZodSchema,
    bodySchema: {
      type: 'object',
      properties: { ... manual JSON schema ... }
    }
  }
])
```

### 2. Update `deniedPaths`
In `app/api/docs/route.ts`, there is a `deniedPaths` list. I added `/api/chat`, `/api/posts`, etc., there to prevent errors while you refactor your project. 
**When you refactor a route to use `next-rest-framework`, remember to remove it from `deniedPaths`.**

### 3. Operation IDs
Always give descriptive `operationId`s (like `getVectorData`, `createPost`). These are used as function names in generated clients and identifiers in the documentation.

### 4. Consistent Error Responses
Define a standard error schema and use it across all your API routes for a professional feel.

```typescript
const errorSchema = z.object({
  success: z.literal(false),
  error: z.string(),
});
```

### 5. Type Safety
Use `TypedNextResponse.json` instead of `NextResponse.json`. It will warn you if the status code or body doesn't match what you defined in `.outputs()`.
