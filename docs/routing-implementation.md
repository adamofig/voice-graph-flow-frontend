# Routing and Navigation Documentation

This document explains the implementation of the multi-route structure and the shared navigation menu in the **Flow App**.

## Project Structure Changes

The application has been migrated from a single-page structure to a multi-route architecture using Next.js App Router.

### Directory Mapping
- `app/page.tsx`: Now handles the root redirect.
- `app/todo/page.tsx`: Contains the Todo application logic (formerly root).
- `app/llm/page.tsx`: Placeholder for LLM Assistant features.
- `app/audio/page.tsx`: Placeholder for Audio Processing features.
- `components/Navbar.tsx`: Shared navigation component.

## Shared Navigation Menu (`Navbar.tsx`)

A global navigation menu was implemented in `components/Navbar.tsx` and integrated into the root `layout.tsx`.

### Core Features:
1.  **Dynamic Links**: Uses Next.js `Link` component for fast, client-side navigation.
2.  **Active State Detection**: Utilizes the `usePathname()` hook to determine which tab is currently active.
3.  **Sticky Positioning**: The menu stays fixed at the top of the viewport during scrolling.
4.  **Responsive Design**: Built with Tailwind CSS for a dark-themed, premium aesthetic.

```tsx
// Example of active state logic in Navbar.tsx
const pathname = usePathname();
const isActive = pathname === item.path;
```

## Routing Logic

### Root Redirect
To ensure a smooth user experience, the home page (`/`) automatically redirects to the Todo section. This is handled on the server side (or client side depending on the specific Next.js config) via the `redirect` function in `app/page.tsx`.

```tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  redirect('/todo');
}
```

### Layout Integration
By placing the `<Navbar />` inside `app/layout.tsx`, it remains persistent across all route transitions, providing a consistent UI and preventing unnecessary re-renders of the navigation bar.

## Summary of Routes

| Route | Description | Component Path |
| :--- | :--- | :--- |
| `/` | Automatic redirect to `/todo` | `app/page.tsx` |
| `/todo` | Task management application | `app/todo/page.tsx` |
| `/llm` | AI/LLM Assistant interface | `app/llm/page.tsx` |
| `/files` | Manage uploaded files | `app/files/page.tsx` |
| `/search` | Search interface | `app/search/page.tsx` |
| `/live-talk` | Real-time AI voice conversation with reactive orb | `app/live-talk/page.tsx` |

## Future Extensibility
The routing system is designed to be easily expandable. To add a new tab:
1. Create a new folder in `app/` (e.g., `app/settings/page.tsx`).
2. Add the path and name to the `navItems` array in `components/Sidebar.tsx`.

## LiveTalk Implementation
The LiveTalk section implements a real-time voice conversation interface using the Gemini Live API. It features a reactive 2D orb visualizer that synchronizes with both the user's voice and the AI's response.
