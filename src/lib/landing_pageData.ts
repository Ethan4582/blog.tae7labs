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
   sourceCodeUrl?: string;    // Link for the "Use for Free" button
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
      slug: "AI",
      pages: [
         {
           title: "CallClarity",
         slug: "callclarity",
         date: "Feb 28, 2026",
         description: "A modern SaaS landing page for an AI call intelligence platform.",
            image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_1.png",

            images: [
               "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_1.png",
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_3.png',
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_4.png',
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_5.png',
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_6.png',
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/callcarity/callcarity_7.png'
            ],
            author: "Peter Design",
   creatorUrl: "https://x.com/ItsPeterDesign",

            frameworkName: "Framer",
            frameworkUrl: "https://www.framer.com/marketplace/templates/chatframe/",

            twitterHandle: "@ItsPeterDesign",
            twitterUrl: "https://x.com/ItsPeterDesign",

            categories: ["Agency", "AI"],
            previewUrl: "https://callclarity.vercel.app/",
            sourceCodeUrl: "https://github.com/Ethan4582/callclarity",
            hasPermission: false,
         },
         {
         title: "Mindly AI",
         slug: "mindly-ai",
         date: "Aug 25, 2025",
         description: "A landing page template for selling AI courses.",
         image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly1.png",

         images: [
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly1.png",
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly2.png",
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly3.png",
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly4.png",
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly5.png",
            "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/mindly/Mindly6.png"
         ],

         author: "Omakase",
         creatorUrl: "https://x.com/omakasedesign",

         frameworkName: "Framer",
         frameworkUrl: "https://www.framer.com/marketplace/templates/ai-uni/",

         twitterHandle: "@omakasedesign",
         twitterUrl: "https://x.com/omakasedesign",

         categories: ["AI", "Agency","Portfolio"],
         previewUrl: "https://mindly-one.vercel.app/",

         hasPermission: false
      },
      {
   title: "Cluster",
   slug: "cluster",
   date: "Dec 25, 2026",
   description: "A modern Kanban app template with authentication and task management.",
   image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster1.png",

   images: [
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster1.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster2.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster3.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster4.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/cluster/cluster5.png",
     
   ],

   author: "Ashirwad Singh",
   creatorUrl: "https://github.com/Ethan4582",

   frameworkName: "Figma",
   frameworkUrl: "https://github.com/Ethan4582/Cluster",

   twitterHandle: "@SinghAshir65848",
   twitterUrl: "https://x.com/SinghAshir65848",

   categories: ["AI", "Minimal","SAAS"],
   previewUrl: "https://clusterflow.vercel.app/",
   sourceCodeUrl: "https://github.com/Ethan4582/Cluster",

   hasPermission: true
}
      ],
   },
   {
      title: "Portfolio/Agency",
      slug: "Portfolio",
      pages: [

         {
            title: "Amber-Media",
            slug: "amber-media",
            date: "Aug 15, 2025",
            description: "A cinematic studio website for showcasing film projects and creative work.",
            image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber_hero.png",

            images: [
               "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber_hero.png",
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(5).png',
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(4).png',
              'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(1).png',
               'https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/amber/amber-5%20(2).png'
            ],
            author: "Thaer Swailem",
   creatorUrl: "https://x.com/ThaerSwailem",

            frameworkName: "Framer",
            frameworkUrl: "https://www.framer.com/marketplace/templates/amber/",

            twitterHandle: "@ThaerSwailem",
            twitterUrl: "https://x.com/ThaerSwailem",

            categories: ["Agency", "AI" , "Portfolio"],
            previewUrl: "https://amber-media.vercel.app/",
            sourceCodeUrl: "https://github.com/Ethan4582",
            hasPermission: true,
         },
         {
   title: "BuilderSignal",
   slug: "builder-signal",
   date: "Jan 25, 2025",
   description: "A premium personal brand template for founders building and sharing SaaS.",
   image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal1.png",

   images: [
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal1.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal2.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal3.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal4.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/builder_signal/builderSignal5.png",
   ],

   author: "Ashirwad Singh",
   creatorUrl: "https://github.com/Ethan4582",

   frameworkName: "Github",
   frameworkUrl: "https://github.com/Ethan4582/BuilderSignal",

   twitterHandle: "@SinghAshir65848",
   twitterUrl: "https://x.com/SinghAshir65848",

   categories: ["SaaS", "Minimal", "Personal Brand"],
   previewUrl: "https://builder-signalhq.vercel.app/",
   sourceCodeUrl: "https://github.com/Ethan4582/BuilderSignal",

   hasPermission: true
},
         {
   title: "Astra",
   slug: "astra",
   date: "Mar 02, 2026",
   description: "A minimal Next.js agency portfolio template.",
   image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra1.png",

   images: [
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra1.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra2.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra3.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra4.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/astra/Astra5.png"
   ],

   author: "Ashirwad Singh",
   creatorUrl: "https://x.com/SinghAshir65848",

   frameworkName: "Figma",
   frameworkUrl: "https://github.com/Ethan4582/Astra",

   twitterHandle: "@SinghAshir65848",
   twitterUrl: "https://x.com/SinghAshir65848",

   categories: ["Portfolio", "Agency"],
   previewUrl: "https://ast-ra.vercel.app/",
   sourceCodeUrl: "https://github.com/Ethan4582/Astra",

   hasPermission: true
},{
   title: "Portfolio",
   slug: "portfolio",
   date: "Aug 10, 2025",
   description: "Minimal portfolio template with GSAP and Framer Motion featuring smooth text reveal animations.",
   image: "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/portfolio_/port1.png",

   images: [
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/portfolio_/port1.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/portfolio_/port2.png",
      "https://pub-4b0a8f18a97e4b44914872dd0d22870b.r2.dev/portfolio_/port3.png",
   ],

   author: "Ashirwad Singh",
   creatorUrl: "https://x.com/SinghAshir65848",

   frameworkName: "Github",
   frameworkUrl: "https://github.com/Ethan4582/portfolio",

   twitterHandle: "@SinghAshir65848",
   twitterUrl: "https://x.com/SinghAshir65848",

   categories: ["Portfolio"],
   previewUrl: "https://portfolio-rose-iota-29.vercel.app/",
   sourceCodeUrl: "https://github.com/Ethan4582/portfolio",

   hasPermission: true
}
      ],
   },
   
];