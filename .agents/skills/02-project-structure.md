---
name: Project & Component Structure — File Organization and Routing
description: Exact rules for where every file lives, how directories are named, how routing works, and how to extend the project without breaking its structure.
---

# Project & Component Structure

## Directory Map

```
src/
  app/                        Next.js App Router pages
    layout.tsx                Root shell — fonts, Navbar, LenisProvider, global metadata
    page.tsx                  Root redirect to /blog
    globals.css               Design tokens, base styles, dark mode, custom scrollbar
    blog/
      layout.tsx              Blog shell — Sidebar + <main> wrapper
      page.tsx                /blog landing — assembles BlogHero, RecentTutorials, FeaturedProducts, TutorialList
      [...slug]/
        page.tsx              Dynamic tutorial renderer — all tutorials route here
    gallery/
      page.tsx                Standalone /gallery route (not the in-blog gallery)
    demo/
      page.tsx                Standalone /demo route
    about/
      page.tsx                About page

  components/
    Navbar.tsx                Global top bar
    Sidebar.tsx               Blog left nav — reads blogNavigation
    PageContent.tsx           Tutorial page renderer — hero, sections, code blocks
    TableOfContents.tsx       Right sticky sidebar — scroll spy on section IDs
    LenisProvider.tsx         Wraps app for smooth scroll
    ThemeToggle.tsx           Dark/light toggle
    HamburgerMenu.tsx         Mobile menu drawer
    blog/                     Components used only on the /blog landing page
      BlogHero.tsx
      RecentTutorials.tsx
      FeaturedProducts.tsx
      TutorialList.tsx
      BlogGallery.tsx

  lib/
    types.ts                  Shared interfaces: ContentBlock, PostSection, PostContent
    mockData.ts               UI metadata: navigation, tutorial cards, product cards
    blogData.ts               Re-export shim for getTutorialData and PostContent
    data/
      index.ts                Registry: slug → PostContent map + getTutorialData()
      <category>/
        <slug>.data.ts        Full rich content for one tutorial
```

## Naming Conventions

| What | Convention | Example |
|---|---|---|
| Page files | lowercase, Next.js App Router | `page.tsx`, `layout.tsx` |
| React components | PascalCase | `BlogHero.tsx`, `PageContent.tsx` |
| Data files | `<slug>.data.ts` kebab-case | `water-ripple.data.ts` |
| Data category folders | kebab-case | `threejs/`, `scroll/`, `mouse/` |
| Page slugs | kebab-case | `water-ripple-hover-effect` |
| Group slugs | kebab-case | `Three.js`, `getting-started` |
| Section IDs | kebab-case | `initializing-project`, `root-layout` |
| Exported data consts | camelCase + `Data` suffix | `waterRippleData`, `maskTransitionData` |

## Where to Put a New Tutorial

```
src/lib/data/<category>/<slug>.data.ts    ← rich content
src/lib/data/index.ts                     ← register the slug
src/lib/mockData.ts → blogNavigation      ← add PageItem to the right group
src/lib/mockData.ts → recentTutorials     ← add Tutorial card (optional)
```

Never create a new `app/` page for a tutorial. All tutorials route through `blog/[...slug]/page.tsx`.

## Where to Put a New Landing Section

Blog landing sections live in `src/components/blog/`. Each section is its own file. They are assembled in `src/app/blog/page.tsx`.

## Where to Put a Standalone Page

If the page is not a tutorial (e.g., `/about`, `/contact`, `/gallery`), create a folder under `src/app/` with a `page.tsx` inside.

## Routing Model

All tutorial pages are served from `src/app/blog/[...slug]/page.tsx`. The slug is a two-segment array: `[groupSlug, pageSlug]`.

`generateStaticParams()` reads `blogNavigation` and produces the full list of paths at build time. Every entry in `blogNavigation` that is not the intro redirect must appear in this list.

Special slugs that need a different layout are intercepted at the top of `BlogSlugPage` before the standard `findPageBySlug` call:

```ts
if (slug.join("/") === "getting-started/gallery") {
  return <BlogGallery />;
}
```

The intro redirect: `getting-started/intro` is not a real page. The sidebar links it to `/blog`. It is explicitly excluded from `generateStaticParams`. Do not include it.

## Data Registry Pattern

`src/lib/data/index.ts` is the single file that knows about all tutorial data files. It exports `tutorialsData` and `getTutorialData`. Nothing else imports data files directly — all lookups go through `getTutorialData(slug)`.

`src/lib/blogData.ts` is a thin re-export shim so the rest of the app imports from `@/src/lib/blogData` rather than reaching into `data/index.ts`.

## Component Folder Rules

- A component goes in `src/components/` if it is used across multiple pages.
- A component goes in `src/components/blog/` if it is only used on the `/blog` landing page.
- A component stays inside the same `app/` folder as its page only if it is a one-off layout piece used nowhere else.
- Never create a `components/` subfolder just for one component.

## What Never Goes Where

- Rich tutorial content (paragraphs, code blocks) never goes in `mockData.ts`.
- Navigation slugs never go in a `.data.ts` file.
- Shared TypeScript interfaces never go in `mockData.ts` — they go in `types.ts`.
- Page-level logic never goes in a data file.
- Anything that causes `"use client"` never goes in `src/lib/`.
