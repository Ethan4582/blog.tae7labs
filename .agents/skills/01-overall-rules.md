---
name: Overall Rules — Code Quality, Static Export & Data Principles
description: Non-negotiable rules for every file touched in this project. Covers code quality standards, static-first constraints, and how to separate data from logic.
---

# Overall Rules

## Code Quality

No comments anywhere in the codebase — no `//`, no `/* */`, no `{/* */}` inside JSX. Names, types, and file structure are the documentation.

No inline styles. All styling is done with Tailwind utility classes only.

No magic numbers or hardcoded strings scattered through components. All static content — text, URLs, image paths, labels, dates — lives in a `.data.ts` file or in `mockData.ts`. Components only receive and render.

No `any` types. Always use the correct TypeScript interface. If one does not exist yet, define it in `src/lib/types.ts`.

No unused imports. No dead code. No commented-out blocks.

Every exported function and component has a name that makes its role obvious. Avoid generic names like `Component`, `Handler`, `Data`, `Item`.

## Static Export Constraint

This project runs as `output: 'export'` in `next.config.ts`. That means:

- No server-side rendering. No `getServerSideProps`. No API routes.
- No `redirects()` or `rewrites()` in `next.config.ts` — they are server features.
- Every dynamic route segment must declare `generateStaticParams()` or the build fails.
- All Next.js `<Image>` usage requires `unoptimized: true` in `next.config.ts` or directly on the component for external URLs.
- Never add a server-only Next.js feature without first checking that it works under static export.

Redirects are handled client-side via a small `useEffect` + `router.replace()` in a `"use client"` page component, not in config.

## Data File Principle

Every piece of static content — image URLs, text, labels, descriptions, GIF paths, dates, slugs — belongs in a data file, never hard-coded inside a component.

Rule: if a value could ever change, or if a component would need to be opened just to update text, that value is in the wrong place.

Where data lives:

| Content type | File |
|---|---|
| Navigation groups, page slugs, section IDs | `src/lib/mockData.ts` |
| Centralized asset URLs (images, videos, gifs) | `src/lib/asset_data.ts` |
| Tutorial cards (metadata) | `src/lib/mockData.ts` — `recentTutorials` |
| Full tutorial content (rich text, code) | `src/lib/data/<category>/<slug>.data.ts` |
| Shared TypeScript interfaces | `src/lib/types.ts` |

A `.data.ts` file exports one single const of its declared type. No logic. No conditionals. No React imports. Pure data only.

## Development Principles

**Server components by default.** Add `"use client"` only when the component uses `useState`, `useEffect`, `useRef`, event handlers, browser APIs, or Framer Motion animation components. If unsure, check if removing `"use client"` causes a build error — if not, it doesn't need it.

**One concern per file.** A component renders UI. A data file holds data. A utility file holds pure functions. Never mix these responsibilities.

**Single source of truth.** `blogNavigation` in `mockData.ts` is the only place navigation is defined. The sidebar, the static path generator, and the tutorial list all read from it. Never duplicate nav entries elsewhere.

**Slug consistency.** The `page.slug` in `blogNavigation`, the key in `tutorialsData`, and the `slug` field in `recentTutorials` must be the exact same kebab-case string. A mismatch silently breaks linking, routing, and content lookup.

**Uppercase categories and tags.** The `category` and `tag` fields on `Tutorial` objects must be uppercase strings (e.g., `"SCROLL"`, `"THREE.JS"`). Gallery filter matching compares against uppercase strings.

**Section IDs are DOM IDs.** Every `PostSection.id` and `Section.id` must be unique within its tutorial, kebab-case, and must match between the lightweight `PageItem.sections[]` in `mockData.ts` and the full `PostSection[]` in the data file. The `TableOfContents` scroll spy breaks if they differ.

**GIFs over video embeds for demos.** Hosted `.gif` URLs render with a plain `<img>` tag and autoplay without iframe sandboxing. This is the correct approach for static export demos.

**No placeholder data in production files.** Remove lorem ipsum, `TODO`, placeholder URLs, and example slugs before committing. Every field must contain real, intended content.
