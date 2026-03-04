---
name: Component Implementation Rules — How to Build Components Correctly
description: Exact rules for writing components in this project — server vs client decision, animation patterns, content rendering, GIF/video handling, and how to avoid the most common implementation mistakes.
---

# Component Implementation Rules

## Server vs Client Decision

Default: every component is a React Server Component. No directive needed.

Add `"use client"` only when the component requires:
- `useState` or `useReducer`
- `useEffect` or `useRef`
- `usePathname`, `useRouter`, `useSearchParams`
- Browser APIs (`window`, `document`, `navigator`)
- Framer Motion animated components (`motion.*`, `AnimatePresence`)
- Event handlers on interactive elements that need state

If none of the above apply, keep it a server component.

## Props and Type Safety

Every component declares its props as an explicit TypeScript interface at the top of the file, above the component function.

```ts
interface TutorialCardProps {
  title: string;
  date: string;
  tag: string;
  image: string;
  gif?: string;
  href: string;
}
```

Never use `any` for props. Never use implicit `{}` object types.

## Animation Pattern

Animations use Framer Motion. Follow this consistent pattern for list items:

```tsx
<motion.div
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: idx * 0.05, duration: 0.4 }}
>
```

Use `whileInView` with `viewport={{ once: true }}` for elements that animate as they scroll into view. Use `animate` directly only for elements that animate on mount.

Use `AnimatePresence` with `mode="popLayout"` when items enter and exit a list conditionally (e.g., gallery filter changes).

Use `layoutId` on active indicators to get shared layout spring animations between siblings (e.g., sidebar active pill, tab underline).

## GIF and Video Rendering

**Gallery cards — hover-activated GIF:**

Render both the static image and the GIF stacked. Use CSS opacity transitions driven by `group-hover`:

```tsx
<div className="relative overflow-hidden">
  <Image src={t.image} alt={t.title} fill className="object-cover transition-opacity duration-300 group-hover:opacity-0" />
  {t.gif && (
    <Image src={t.gif} alt="" fill unoptimized className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
  )}
</div>
```

**Tutorial hero — autoplay GIF:**

When `post.gif` is set, render it as a plain `<img>` (not `<Image>`) inside the hero container. GIFs autoplay natively. Do not use `<video>` or iframes for GIF content.

```tsx
{post.gif ? (
  <img src={post.gif} alt={`${page.title} demo`} className="w-full h-full object-cover" />
) : (
  <iframe src={post.videoDemo} className="w-full h-full border-0" allowFullScreen />
)}
```

## Content Block Rendering (`PageContent.tsx`)

`PageContent` maps `ContentBlock.type` to JSX. Each type has a fixed render pattern:

**`paragraph`** — renders as `<p>`. Passes through the link parser first to convert `@Name[urlHREF]` tokens into `<a>` tags.

**`code`** — renders as `<CodeBlock>` which handles single-file and multi-tab variants.

**`list`** — renders items as a styled card with `<ArrowRight>` icons.

**`image`** — renders as a rounded container with a full-width `<img>`.

When adding a new block type, add its case in the `section.content.map()` block in `PageContent.tsx` and define the new type in `ContentBlock` in `types.ts`.

## Copy Button in CodeBlock

`CodeBlock` handles its own copy state — never delegate this to the parent.

```tsx
const [copied, setCopied] = useState(false);

const handleCopy = () => {
  if (!content) return;
  navigator.clipboard.writeText(content).then(() => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  });
};
```

The header bar is **always rendered** (even for code blocks without a tab or filename) so the copy button is always visible. When there's no `name` and no `tabs`, show the language as a dim label.

```tsx
{copied ? (
  <><CheckIcon /> Copied</>
) : (
  <><CopyIcon /> Copy</>
)}
```

Turn the button green briefly on success using `text-green-600` and `bg-green-50`.

## Writing Style for Data Files (`.data.ts`)

Keep the language in data files **plain and direct** — not formal, not AI-sounding. Write like you're explaining something to a colleague. Avoid phrases like "In this comprehensive tutorial we explore", "leveraging", "utilizing", or "robust implementation". Short sentences are fine. The meaning matters more than sounding polished.

**Bad:**
```ts
introduction: "A comprehensive tutorial leveraging GSAP to implement a robust animated loader sequence."
```

**Good:**
```ts
introduction: "Build a full-screen GSAP loader with a rolling three-digit counter and dual progress bars."
```

## Author Mention Rendering


The author block in `PageContent` renders as a clickable mention pill:

```tsx
<a href={`https://twitter.com/${post.author?.replace(/\s+/g, '')}`} target="_blank" rel="noopener noreferrer" className="...pill styles...">
  <img src={`https://unavatar.io/twitter/${handle}`} className="w-6 h-6 rounded-full" />
  <span>@{handle}</span>
</a>
```

The avatar is fetched from `unavatar.io` using the author name as the Twitter handle (spaces stripped). This requires no extra configuration.

## Link Parser for Paragraph Content

Paragraphs in `.data.ts` files support inline hyperlinks using the syntax:

```
@Name[urlHREF]
```

Example:

```ts
{ type: "paragraph", text: "Special thanks to @CodeGrid[urlhttps://www.youtube.com/@codegrid]. Happy coding!" }
```

The `parseLinks` function in `PageContent` splits the string by this pattern and maps each token to an `<a>` tag. The URL is the HREF; the name is the visible text. The raw URL is never shown.

## Sidebar Active State

`Sidebar.tsx` uses `usePathname()` to determine the active page. The `href` for each link is computed as:

```ts
const isIntro = group.slug === "getting-started" && page.slug === "intro";
const href = isIntro ? "/blog" : `/blog/${group.slug}/${page.slug}`;
const isActive = pathname === href;
```

The active visual is a `motion.div` with `layoutId="sidebar-active"` that springs between entries. Only one entry is active at a time.

## Table of Contents Scroll Spy

`TableOfContents` receives `sections: Section[]` and uses `getBoundingClientRect()` on each section's DOM element (matched by `section.id`) to determine which is currently in view.

Pass sections from the tutorial's rich content, not from the nav:

```tsx
<TableOfContents sections={post ? post.sections : page.sections} />
```

The `post.sections` array has `PostSection` objects with `id` and `title`. The `page.sections` array has lightweight `Section` objects with `id` and `title`. The shapes are compatible but the IDs must match the actual DOM element IDs in `PageContent`.

## BlogGallery Filters

`BlogGallery.tsx` is a client component. Filters are stored in `useState`. The filter list is a static array defined at the top of the file — not in `mockData.ts`, since it is purely a UI concern.

```ts
const filters = ["RECENT", "PAGE REVEAL", "SCROLL", "GSAP", "MISC", "SHADER", "LANDING PAGE"];
```

Filter logic:

```ts
const filtered = recentTutorials.filter((t) => {
  if (activeFilter === "RECENT" || activeFilter === "POPULAR") return true;
  return t.category === activeFilter || t.tag === activeFilter;
});
```

The grid uses `motion.div` with `layout` to animate reflows when filters change.

## Common Implementation Mistakes

**Passing `page.sections` to `TableOfContents` instead of `post.sections`**
Results in the scroll spy tracking the wrong set of IDs. The progress indicator only reaches as far as the nav sections go, not the actual content.

**Adding a `"use client"` directive to a data file**
Data files in `src/lib/` must never use client hooks. They are pure TypeScript modules. Moving any hook or effect logic into them breaks the build.

**Using `next/image` for GIFs without `unoptimized`**
Next.js does not optimize animated GIFs. Always add `unoptimized` to `<Image>` when the `src` is a `.gif` URL.

**Hardcoding navigation slugs in multiple files**
If the slug in `blogNavigation` changes, every hardcoded reference breaks. Always derive hrefs from `group.slug` and `page.slug` dynamically.

**Creating client components when server components suffice**
Client components cannot be used inside layout files that wrap server content without care. Keep layouts as server components. Move interactivity down the tree.

**Forgetting to register a new tutorial in `data/index.ts`**
Adding the `.data.ts` file and the `blogNavigation` entry is not enough. The slug must also be added to the `tutorialsData` record in `index.ts`. Without this, `getTutorialData` returns `null` and the page renders in fallback mode.
