import { assets } from "./asset_data";

export interface LandingPageItem {
   title: string;
   slug: string;
   date: string;
   description: string;
   image: string;             // Thumbnail for gallery cards
   gif?: string;              // GIF/video for hover preview
   images: string[];          // All images for the dedicated template page

   author?: string;
   creatorUrl?: string;
   frameworkName?: string;
   frameworkUrl?: string;
   twitterHandle?: string;
   twitterUrl?: string;

   categories?: string[];
   previewUrl?: string;       // Link for the preview button
   hasPermission?: boolean;   // If false or undefined, show disclaimer at the bottom
}

export interface LandingPageGroup {
   title: string;
   slug: string;
   pages: LandingPageItem[];
}

export const landingPages: LandingPageGroup[] = [
   {
      title: "AI",
      slug: "ai",
      pages: [
         {
            title: "ChatFrame",
            slug: "chatframe",
            date: "Mar 01, 2026",
            description: "ChatFrame Template is a unique landing page for SaaS, agencies, startups, and AI businesses, featuring a modern Home page... Its sleek design ensures a professional, user-friendly experience that engages visitors instantly.",
            image: assets.tutorials.loaderSplitCounter.image,
            gif: assets.tutorials.loaderSplitCounter.gif,
            images: [
               assets.tutorials.loaderSplitCounter.image,
               assets.tutorials.loaderSplitCounter.image,
               assets.tutorials.loaderSplitCounter.image,
               assets.tutorials.loaderSplitCounter.image,
            ],
            author: "Peter Design",
            creatorUrl: "https://example.com/peter-design",
            frameworkName: "Framer",
            frameworkUrl: "https://framer.com",
            twitterHandle: "@peterdesign",
            twitterUrl: "https://twitter.com/peterdesign",
            categories: ["AI", "Agency", "SaaS"],
            previewUrl: "https://example.com",
            hasPermission: false,
         },
         {
            title: "CallClarity",
            slug: "callclarity",
            date: "Feb 15, 2026",
            description: "Automate Smarter. Grow Faster. With AI. A modern, dark-themed landing page template.",
            image: assets.tutorials.loaderSplitCounter.image,
            gif: assets.tutorials.waterRipple.gif,
            images: [
               assets.tutorials.loaderSplitCounter.image,
               assets.tutorials.waterRipple.image,
               assets.tutorials.waterRipple.image,
            ],
            author: "Tae7labs",
            creatorUrl: "https://github.com/Ethan4582",
            frameworkName: "Next.js",
            frameworkUrl: "https://nextjs.org",
            twitterHandle: "@SinghAshir65848",
            twitterUrl: "https://x.com/SinghAshir65848",
            categories: ["AI", "SaaS", "Dark Mode"],
            previewUrl: "https://example.com",
            hasPermission: true,
         }
      ],
   },
   {
      title: "Health & Wellness",
      slug: "health",
      pages: [
         {
            title: "Vitalflow",
            slug: "vitalflow",
            date: "Feb 28, 2026",
            description: "Partner in health and wellness. A minimal landing page tailored for healthcare providers and virtual consultation services.",
            image: assets.tutorials.loaderSplitCounter.image,
            images: [
               assets.tutorials.loaderSplitCounter.image,
            ],
            author: "CodeGrid",
            creatorUrl: "https://codegrid.com",
            frameworkName: "React",
            frameworkUrl: "https://react.dev",
            twitterHandle: "@codegrid",
            twitterUrl: "https://twitter.com/codegrid",
            categories: ["Health", "SaaS"],
            previewUrl: "https://example.com",
            hasPermission: false,
         },
      ]
   }
];