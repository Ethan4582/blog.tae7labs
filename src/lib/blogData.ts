export interface PageItem {
  title: string;
  slug: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
}

export interface ToggleGroup {
  title: string;
  slug: string;
  pages: PageItem[];
}

export const blogData: ToggleGroup[] = [
  {
    title: "Getting Started",
    slug: "getting-started",
    pages: [
      {
        title: "Gallery",
        slug: "gallery",
        sections: [
          { id: "image-grid", title: "Image Grid" },
          { id: "lightbox", title: "Lightbox" },
          { id: "custom-styles", title: "Custom Styles" },
        ],
      },
    ],
  },
  {
    title: "Product",
    slug: "product",
    pages: [
      {
        title: "Background",
        slug: "background",
        sections: [
          { id: "history", title: "History" },
          { id: "motivation", title: "Motivation" },
          { id: "architecture", title: "Architecture" },
        ],
      },
      {
        title: "Template",
        slug: "template",
        sections: [
          { id: "basic-template", title: "Basic Template" },
          { id: "advanced-template", title: "Advanced Template" },
          { id: "customization", title: "Customization" },
        ],
      },
    ],
  },
  {
    title: "Scroll",
    slug: "scroll",
    pages: [
      {
        title: "Page 1",
        slug: "page-1",
        sections: [
          { id: "smooth-scroll", title: "Smooth Scroll" },
          { id: "parallax-effects", title: "Parallax Effects" },
          { id: "scroll-triggers", title: "Scroll Triggers" },
        ],
      },
      {
        title: "Page 2",
        slug: "page-2",
        sections: [
          { id: "infinite-scroll", title: "Infinite Scroll" },
          { id: "snap-scroll", title: "Snap Scroll" },
          { id: "scroll-animations", title: "Scroll Animations" },
        ],
      },
    ],
  },
  {
    title: "Footer",
    slug: "footer",
    pages: [
      {
        title: "Footer 1",
        slug: "footer-1",
        sections: [
          { id: "layout", title: "Layout" },
          { id: "links-section", title: "Links Section" },
          { id: "social-media", title: "Social Media" },
        ],
      },
      {
        title: "Footer 2",
        slug: "footer-2",
        sections: [
          { id: "minimal-footer", title: "Minimal Footer" },
          { id: "newsletter", title: "Newsletter" },
          { id: "copyright", title: "Copyright" },
        ],
      },
    ],
  },
];

// Helper to find a page by its slug path (e.g., "getting-started/intro")
export function findPageBySlug(slugPath: string[]): { group: ToggleGroup; page: PageItem } | null {
  if (slugPath.length !== 2) return null;
  const [groupSlug, pageSlug] = slugPath;
  const group = blogData.find((g) => g.slug === groupSlug);
  if (!group) return null;
  const page = group.pages.find((p) => p.slug === pageSlug);
  if (!page) return null;
  return { group, page };
}

// Get the first page for default redirect
export function getFirstPage(): string {
  const firstGroup = blogData[0];
  const firstPage = firstGroup.pages[0];
  return `/blog/${firstGroup.slug}/${firstPage.slug}`;
}
