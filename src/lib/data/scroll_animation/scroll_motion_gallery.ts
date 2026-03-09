import type { PostContent } from "../../types";
import { assets } from "../../asset_data";


export const scrollGalleryData:PostContent = {
  author: "SinghAshir65848",
  date: "March 10, 2026",
  difficulty: "Short",
  introduction:
    "A dynamic gallery where images rotate and move with scroll using GSAP ScrollTrigger, creating depth and motion. Hover interactions reveal video previews and metadata, enhanced with a subtle Framer Motion parallax effect. ✨",
  liveDemo: "https://example.com/demo",
  sourceCode: "https://github.com/yourname/scroll-gallery",
 gif: assets.tutorials.waterRipple.gif,
  sections: [
    {
      id: "initializing-project",
      title: "Initializing the project",
      content: [
        {
          type: "paragraph",
          text: "Start by creating a new Next.js application and install the required dependencies:",
        },
        {
          type: "code",
          language: "bash",
          code: "npx create-next-app@latest scroll-gallery\ncd scroll-gallery\nnpm install gsap framer-motion",
        },
        {
          type: "paragraph",
          text: "We'll also use Sass for styling if you prefer (optional).",
        },
      ],
    },
    {
      id: "component-structure",
      title: "Component structure",
      content: [
        {
          type: "paragraph",
          text: "The gallery consists of a main `ScrollGallery` component that renders a container with absolute‑positioned `ParallaxImage` components. Each image gets its position and rotation values from a central `layoutData` array.",
        },
        {
          type: "code",
          name: "ScrollGallery.tsx (simplified)",
          language: "tsx",
          code: `"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Each item defines position, size, and rotation angles
type LayoutItem = {
  assetId: string;
  x: number;        // left position in vw
  y: number;        // top position in vh
  w: number;        // width in vw
  h: number;        // height in vh
  rotate: number;   // rotation when entering viewport
  rotateTo: number; // rotation when centered
  mt: number;       // extra top margin
  mb: number;       // extra bottom margin
};

// We'll fill this with actual data later
const layoutData: LayoutItem[] = [ /* … */ ];

function ParallaxImage({ item }) {
  // ... animation logic
  return ( /* JSX */ );
}

export default function ScrollGallery() {
  return (
    <div style={{ paddingTop: "15vh", paddingBottom: "20vh" }}>
      <div style={{ position: "relative", width: "100%", height: "1800vh" }}>
        {layoutData.map((item) => (
          <ParallaxImage key={item.assetId} item={item} />
        ))}
      </div>
    </div>
  );
}`,
        },
      ],
    },
    {
      id: "layout-and-asset-data",
      title: "Layout and asset data",
      content: [
        {
          type: "paragraph",
          text: "Each image is placed using absolute positioning with `vw` and `vh` units. The `layoutData` array defines the coordinates and rotation angles. The rotation smoothly changes from `rotate` (when the image enters) to `rotateTo` (when centered) and then to a fraction of the original as it leaves.",
        },
        {
          type: "code",
          name: "Example layout item",
          language: "ts",
          code: `{
  assetId: "a01",
  x: 8, y: 8,       // 8vw from left, 8vh from top
  w: 40, h: 48,     // 40vw wide, 48vh tall
  rotate: -9,       // starts at -9deg
  rotateTo: -1,     // settles at -1deg when centered
  mt: 0, mb: 5
}`,
        },
        {
          type: "paragraph",
          text: "Asset details (image/video paths, label, duration) are stored in a separate `assetData.ts` file. A helper `getAsset` retrieves the data for a given ID. Here's a minimal example:",
        },
        {
          type: "code",
          name: "lib/assetData.ts (excerpt)",
          language: "ts",
          code: `export type Asset = {
  id: string;
  image?: string;
  video?: string;
  label: string;
  time: string;
};

export const assets: Record<string, Asset> = {
  a01: {
    id: "a01",
    image: "/images/neon-street.jpg",
    video: "/videos/neon-street.mp4",
    label: "NEON STREET DRIP",
    time: "00:03:22"
  },
  // ... more assets
};

export function getAsset(id: string): Asset | undefined {
  return assets[id];
}`,
        },
      ],
    },
    {
      id: "core-animations",
      title: "Core animations",
      content: [
        {
          type: "paragraph",
          text: "Each `ParallaxImage` combines two animation techniques:",
        },
        {
          type: "list",
          items: [
            "**GSAP + ScrollTrigger** for rotation – we create two tweens that update based on scroll position, from entry to center and from center to exit.",
            "**Framer Motion** for parallax – we use `useScroll` and `useTransform` to shift the image vertically based on scroll progress, smoothed with `useSpring`.",
          ],
        },
        {
          type: "code",
          name: "Rotation with GSAP",
          language: "tsx",
          code: `useEffect(() => {
  const el = rotateRef.current;
  if (!el) return;

  // Set initial rotation
  gsap.set(el, { rotation: item.rotate });

  // Tween from entry to center
  const tweenIn = gsap.fromTo(
    el,
    { rotation: item.rotate },
    {
      rotation: item.rotateTo,
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top bottom",
        end: "center center",
        scrub: 1.5,
      },
    }
  );

  // Tween from center to exit
  const tweenOut = gsap.fromTo(
    el,
    { rotation: item.rotateTo },
    {
      rotation: item.rotate * 0.6,
      ease: "none",
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "center center",
        end: "bottom top",
        scrub: 1.5,
      },
    }
  );

  return () => {
    tweenIn.scrollTrigger?.kill();
    tweenOut.scrollTrigger?.kill();
  };
}, [item.rotate, item.rotateTo]);`,
        },
        {
          type: "code",
          name: "Parallax with Framer Motion",
          language: "tsx",
          code: `const { scrollYProgress } = useScroll({
  target: scrollRef,
  offset: ["start end", "end start"],
});
const smoothProgress = useSpring(scrollYProgress, {
  damping: 50,
  stiffness: 80,
  mass: 0.5,
});
const scrollY = useTransform(smoothProgress, [0, 1], [12, -12]);

// Apply to motion.div:
<motion.div style={{ y: scrollY, ... }}>...</motion.div>`,
        },
        {
          type: "paragraph",
          text: "Hover interactions reveal video previews and metadata by toggling opacity and scaling the image. A simple `useState` toggles the hover state, and CSS transitions handle the visuals.",
        },
      ],
    },
    {
      id: "using-the-component",
      title: "Using the component",
      content: [
        {
          type: "paragraph",
          text: "Simply import `ScrollGallery` into any page (make sure it's a client component). The gallery will fill the available width and create a long scrollable area.",
        },
        {
          type: "code",
          name: "app/page.tsx",
          language: "tsx",
          code: `import ScrollGallery from '@/components/ScrollGallery';

export default function Home() {
  return (
    <main>
      <ScrollGallery />
    </main>
  );
}`,
        },
        {
          type: "paragraph",
          text: "You can adjust the `CANVAS_HEIGHT_VH` constant to control how much scrolling space the gallery occupies. The rotation angles and positions can be fine‑tuned in `layoutData` to achieve the desired visual rhythm.",
        },
      ],
    },
  ],
};