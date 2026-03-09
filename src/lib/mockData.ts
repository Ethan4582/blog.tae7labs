import { assets } from "./asset_data";

export interface Section {
   id: string;
   title: string;
}

export interface PageItem {
   title: string;
   slug: string;
   date?: string;
   sections: Section[];
}

export interface ToggleGroup {
   title: string;
   slug: string;
   pages: PageItem[];
}

export interface Product {
   id: string;
   title: string;
   description: string;
   date: string;
   image: string;
}

export interface Tutorial {
   id: string;
   title: string;
   description: string;
   galleryDescription?: string;
   demoInstructions?: string;
   date: string;
   tag: string;
   image: string;
   gif?: string;
   category: string;
   slug?: string; // Adding slug for linking if needed
}

export const recentTutorials: Tutorial[] = [
   {
      id: "1",
      title: "Water Ripple Hover Effect",
      description: "Tutorial rebuilding a water ripple hover effect that fluidly distorts text using Three.js, React, and GLSL shaders.",
      galleryDescription: "Mesmerizing ripples interacting with typography for an organic feel.",
      demoInstructions: "Move your mouse gently over the canvas to see the water ripple effect in action.",
      date: "March 3, 2026",
      tag: "SHADER",
      category: "shader",
      image: assets.tutorials.waterRipple.image,
      gif: assets.tutorials.waterRipple.gif,
      slug: "water-ripple-hover-effect"
   },
   {
      id: "2",
      title: "Loader Split Counter",
      description: "Full-screen animated loading sequence with a rolling digit counter and expanding progress bars using GSAP.",
      galleryDescription: "A high-end mechanical counter loading sequence for premium landing pages.",
      demoInstructions: "Observe the counter roll to 100% while the bars fill up. The loader will automatically reveal the content.",
      date: "March 5, 2026",
      tag: "PAGE REVEAL",
      category: "page-reveal",
      image: assets.tutorials.loaderSplitCounter.image,
      gif: assets.tutorials.loaderSplitCounter.gif,
      slug: "loader-split-counter"
   },
];

export const featuredProducts: Product[] = [
   {
      id: "p1",
      title: "templete.t7labs",
      description: "Free open-source hub offering premium templates for design, portfolios, or startups to help founders and creators",
      date: "February 5, 2026",
      image: assets.products.template,
   },
   {
      id: "p2",
      title: "bg-design.t7labs",
      description: "High-quality AI-generated fresh background images that make your hero section glow.",
      date: "March 1, 2026",
      image: assets.products.bgDesign,
   },
];

export const allTutorials: Partial<Tutorial>[] = [
   { date: "March 3, 2026", title: "Mask Section Transition", category: "Scroll" },
];

export const blogNavigation: ToggleGroup[] = [
   {
      title: "Getting Started",
      slug: "getting-started",
      pages: [
         {
            title: "Introduction",
            slug: "intro",
            date: "Feb 28, 2026",
            sections: [
               { id: "overview", title: "Overview" },
               { id: "installation", title: "Installation" },
               { id: "quick-start", title: "Quick Start" },
            ],
         },
         {
            title: "Gallery",
            slug: "gallery",
            date: "Mar 3, 2026",
            sections: [],
         },
         {
            title: "Landing Page",
            slug: "landing-page",
            date: "Mar 3, 2026",
            sections: [],
         }
      ],
   },
   {
      title: "PAGE REVEAL",
      slug: "page-reveal",
      pages: [
         {
            title: "Loader Split Counter",
            slug: "loader-split-counter",
            date: "March 5, 2026",
            sections: [
               { id: "initializing-project", title: "Initializing the project" },
               { id: "component-structure", title: "Component structure" },
               { id: "counter-digit-arrays", title: "Preparing the counter digits" },
               { id: "core-gsap-animations", title: "Core GSAP animations" },
            ],
         },
      ],
   },
   {
      title: "Scroll Animation",
      slug: "scroll-animation",
      pages: [
         {
            title: "Scroll Motion Gallery",
            slug: "scroll-motion-gallery",
            date: "March 10, 2026",
            sections: [
               { id: "initializing-project", title: "Initializing the project" },
               { id: "component-structure", title: "Component structure" },
               { id: "layout-and-asset-data", title: "Layout and asset data" },
               { id: "core-animations", title: "Core animations" },
               { id: "using-the-component", title: "Using the component" },
            ],
         },
      ],
   },
   {
      title: "Misc",
      slug: "misc",
      pages: [
         {
            title: "Water Ripple Hover Effect ",
            slug: "water-ripple-hover-effect",
            date: "March 3, 2026",
            sections: [
               { id: "initializing-project", title: "Initializing the project" },
               { id: "root-layout", title: "Root Layout Configuration" },
               { id: "ripple-component", title: "Ripple Effect Component & Shaders" },
            ],
         },
      ],
   },
];

export function findPageBySlug(slugPath: string[]): { group: ToggleGroup; page: PageItem } | null {
   if (slugPath.length !== 2) return null;
   const [groupSlug, pageSlug] = slugPath;
   const group = blogNavigation.find((g) => g.slug === groupSlug);
   if (!group) return null;
   const page = group.pages.find((p) => p.slug === pageSlug);
   if (!page) return null;
   return { group, page };
}

export function getFirstPage(): string {
   const firstGroup = blogNavigation[0];
   const firstPage = firstGroup.pages[0];
   return `/blog/${firstGroup.slug}/${firstPage.slug}`;
}
