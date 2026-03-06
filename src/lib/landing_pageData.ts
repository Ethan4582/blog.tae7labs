import { assets } from "./asset_data";

export interface LandingPageItem {
   title: string;
   slug: string;
   date: string;
   description: string;
   image: string;             // Thumbnail for gallery cards
   heroImage?: string;        // Main large image on the dedicated page
   galleryImages?: string[];  // Smaller preview images on the dedicated page
   author?: string;
   updated?: string;
   views?: string;
   categories?: string[];
   previewUrl?: string;       // Link for the preview button
}

export interface LandingPageGroup {
   title: string;
   slug: string;
   pages: LandingPageItem[];
}

export const landingPages: LandingPageGroup[] = [
   {
      title: "Landing Pages",
      slug: "templates",
      pages: [
         {
            title: "ChatFrame",
            slug: "chatframe",
            date: "Mar 01, 2026",
            description: "ChatFrame Template is a unique landing page for SaaS, agencies, startups, and AI businesses, featuring a modern Home page, Contact page, and 404 page. Its sleek design ensures a professional, user-friendly experience that engages visitors instantly.",
            image: assets.tutorials.loaderSplitCounter.image,
            heroImage: assets.tutorials.loaderSplitCounter.image,
            galleryImages: [
               assets.tutorials.loaderSplitCounter.image,
               assets.tutorials.loaderSplitCounter.image,
            ],
            author: "Peter Design",
            updated: "Updated 5 months ago",
            views: "4.6K views",
            categories: ["AI", "Agency", "SaaS"],
            previewUrl: "https://example.com",
         },
         {
            title: "Vitalflow",
            slug: "vitalflow",
            date: "Feb 28, 2026",
            description: "Partner in health and wellness. A minimal landing page tailored for healthcare providers and virtual consultation services.",
            image: assets.tutorials.loaderSplitCounter.image,
            heroImage: assets.tutorials.loaderSplitCounter.image,
            galleryImages: [],
            author: "CodeGrid",
            updated: "Updated 2 months ago",
            views: "2.1K views",
            categories: ["Health", "SaaS"],
            previewUrl: "https://example.com",
         },
         {
            title: "CallClarity",
            slug: "callclarity",
            date: "Feb 15, 2026",
            description: "Automate Smarter. Grow Faster. With AI. A modern, dark-themed landing page template.",
            image: assets.tutorials.loaderSplitCounter.image,
            heroImage: assets.tutorials.loaderSplitCounter.image,
            galleryImages: [],
            author: "Tae7labs",
            updated: "Updated 1 week ago",
            views: "8.3K views",
            categories: ["AI", "SaaS", "Dark Mode"],
            previewUrl: "https://example.com",
         }
      ],
   },
];