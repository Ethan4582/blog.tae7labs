import type { PostContent } from "../../types";


export const loaderSplitCounterData: PostContent = {
   author: "SinghAshir65848",
   date: "March 5, 2026",
   difficulty: "short",
   introduction:
      "Create a full-screen GSAP loader with a rolling three-digit counter and dual progress bars.",
   liveDemo: "https://t7labs-demo.pages.dev/gallery/loader-split-counter",
   sourceCode: "https://github.com/Ethan4582/demo-t7labs/tree/master/src/components/Loader_Split_Counter",
   gif: "https://res.cloudinary.com/dbgee370f/image/upload/v1772658902/split_loader_comp_qra2tg.gif", 
   sections: [
      {
         id: "initializing-project",
         title: "Initializing the project",
         content: [
            {
               type: "paragraph",
               text: "Let's start by creating a new Next.js application. Run the following command in your terminal:",
            },
            {
               type: "code",
               language: "bash",
               code: "npx create-next-app@latest loader-app\ncd loader-app",
            },
            {
               type: "paragraph",
               text: "Install GSAP for animations and Sass for styling (optional):",
            },
            {
               type: "code",
               language: "bash",
               code: "npm install gsap sass",
            },
         ],
      },
      {
         id: "component-structure",
         title: "Component structure",
         content: [
            {
               type: "paragraph",
               text: "Create a folder `components/LoaderSplitCounter` with two files: `index.tsx` and `style.module.scss`. Below is the basic JSX structure – note the refs that will be used for animations.",
            },
            {
               type: "code",
               name: "components/LoaderSplitCounter/index.tsx (simplified)",
               language: "tsx",
               code: `'use client';

import { useEffect, useRef, useMemo, useCallback } from 'react';
import gsap from 'gsap';
import styles from './style.module.scss';

export default function LoaderSplitCounter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const counter1Ref = useRef<HTMLDivElement>(null);
  const counter2Ref = useRef<HTMLDivElement>(null);
  const counter3Ref = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const loader1Ref = useRef<HTMLDivElement>(null);
  const loader2Ref = useRef<HTMLDivElement>(null);
  const loadingScreenRef = useRef<HTMLDivElement>(null);
  const digitsRef = useRef<HTMLDivElement[]>([]);
  const h1Refs = useRef<HTMLHeadingElement[]>([]);

  // Helper ref callbacks
  const addDigitRef = useCallback((el) => { if (el) digitsRef.current.push(el); }, []);
  const addH1Ref = useCallback((el) => { if (el) h1Refs.current.push(el); }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Website content (revealed after loader) */}
      <div className={styles.websiteContent}>
        <img src="..." alt="" className={styles.revealedImage} />
        <div className={styles.header}>
          <h1 className={styles.h1Text} ref={addH1Ref}>Hi There</h1>
        </div>
      </div>

      {/* Loading screen overlay */}
      <div className={styles.loadingScreen} ref={loadingScreenRef}>
        <img src="..." alt="" className={styles.loadingImage} />
        <div className={styles.loader} ref={loaderRef}>
          <div className={\`\${styles.loader1} \${styles.bar}\`} ref={loader1Ref} />
          <div className={\`\${styles.loader2} \${styles.bar}\`} ref={loader2Ref} />
        </div>
        <div className={styles.counter}>
          {/* Three digit columns – we'll fill them next */}
          <div className={styles.digit} ref={counter1Ref}>...</div>
          <div className={styles.digit} ref={counter2Ref}>...</div>
          <div className={styles.digit} ref={counter3Ref}>...</div>
        </div>
      </div>
    </div>
  );
}`,
            },
         ],
      },
      {
         id: "counter-digit-arrays",
         title: "Preparing the counter digits",
         content: [
            {
               type: "paragraph",
               text: "Each column needs a list of digits to scroll through. The first column goes from 0 to 1 (two digits). The second column cycles 0-9 twice and ends at 0. The third column rolls through 0-9 twice plus a final 0.",
            },
            {
               type: "code",
               name: "Digit generation helpers",
               language: "tsx",
               code: `const COUNTER_2_DIGITS = [0, 1, 2, 3, 4, 5, 6, 6, 8, 9, 0];

function generateCounter3Digits(): number[] {
  const digits: number[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 10; j++) digits.push(j);
  }
  digits.push(0);
  return digits;
}`,
            },
            {
               type: "paragraph",
               text: "Inside the component, generate the third array using `useMemo` and render the digits inside each `.digit` container. Remember to apply the offset classes for proper alignment of certain digits.",
            },
            {
               type: "code",
               name: "Rendering the digit columns",
               language: "tsx",
               code: `const counter3Digits = useMemo(() => generateCounter3Digits(), []);

return (
  ...
  <div className={styles.counter}>
    {/* Counter 1: 0 → 1 */}
    <div className={styles.digit} ref={counter1Ref}>
      <div>0</div>
      <div className={styles.num1offset}>1</div>
    </div>

    {/* Counter 2: 0 → 9 → 0 */}
    <div className={styles.digit} ref={counter2Ref}>
      {COUNTER_2_DIGITS.map((n, i) => (
        <div key={i} className={i === 1 ? styles.num1offset2 : undefined}>{n}</div>
      ))}
    </div>

    {/* Counter 3: 0-9 x2 + 0 */}
    <div className={styles.digit} ref={counter3Ref}>
      {counter3Digits.map((n, i) => (
        <div key={i}>{n}</div>
      ))}
    </div>
  </div>
  ...
);`,
            },
         ],
      },
      {
         id: "core-gsap-animations",
         title: "Core GSAP animations",
         content: [
            {
               type: "paragraph",
               text: "All animations are orchestrated inside a `useEffect` using GSAP's context to easily clean up. We'll break them into logical groups: counter scroll, loader growth, loader transformation, and final reveal.",
            },
            {
               type: "code",
               name: "Animation timeline inside useEffect",
               language: "tsx",
               code: `useEffect(() => {
  const ctx = gsap.context(() => {
    // 1. Counter scroll animations
    animateCounter(counter3Ref.current, 5);
    animateCounter(counter2Ref.current, 6);
    animateCounter(counter1Ref.current, 2, 4);

    // 2. Digits fly up after counter finishes
    gsap.to(digitsRef.current, {
      top: '-150px',
      stagger: { amount: 0.25 },
      delay: 6,
      duration: 1,
      ease: 'power4.inOut',
    });

    // 3. Loader bars grow
    gsap.from(loader1Ref.current, { width: 0, duration: 6, ease: 'power2.inOut' });
    gsap.from(loader2Ref.current, { width: 0, delay: 1.9, duration: 2, ease: 'power2.inOut' });

    // 4. Loader transformation
    gsap.to(loaderRef.current, { background: 'none', delay: 6, duration: 0.1 });
    gsap.to(loader1Ref.current, { rotate: 90, y: -50, duration: 0.5, delay: 6 });
    gsap.to(loader2Ref.current, { x: -75, y: 70, duration: 0.2, delay: 6 });

    // 5. Loader explosion (scale and move)
    gsap.to(loaderRef.current, {
      scale: 40,
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: 'power2.inOut',
    });

    // 6. Loading screen fades out
    gsap.to(loadingScreenRef.current, {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: 'power1.inOut',
    });

    // 7. Header text slides up
    gsap.to(h1Refs.current, {
      y: -80,
      duration: 1.5,
      delay: 7,
      ease: 'power4.inOut',
      stagger: { amount: 0.1 },
    });
  }, containerRef);

  return () => ctx.revert();
}, []);`,
            },
            {
               type: "paragraph",
               text: "The `animateCounter` helper scrolls a digit container by calculating the total height based on its children:",
            },
            {
               type: "code",
               language: "tsx",
               code: `function animateCounter(el: HTMLDivElement | null, duration: number, delay = 0) {
  if (!el?.children.length) return;
  const numHeight = (el.children[0] as HTMLElement).clientHeight;
  const totalDistance = (el.children.length - 1) * numHeight;
  gsap.to(el, { y: -totalDistance, duration, delay, ease: 'power2.inOut' });
}`,
            },
         ],
      },
      {
         id: "using-the-component",
         title: "Using the component",
         content: [
            {
               type: "paragraph",
               text: "Place the `LoaderSplitCounter` component in your root layout or any page where you want the loading screen to appear. Make sure to use `'use client'` because of the GSAP animations.",
            },
            {
               type: "code",
               name: "app/layout.tsx",
               language: "tsx",
               code: `import LoaderSplitCounter from '@/components/LoaderSplitCounter';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LoaderSplitCounter />
        {children}
      </body>
    </html>
  );
}`,
            },
            {
               type: "paragraph",
               text: "You can customize the images, text, and animation timings by tweaking the delay and duration values in the GSAP timeline. For example, change the loader explosion distance or the counter scroll speed to match your brand.",
            },
         ],
      },
       {
      id: "wrapping-up",
      title: "Wrapping Up",
      content: [
        {
          type: "paragraph",
          text: "Special thanks to the original inspiration and the @CodeGrid[urlhttps://www.youtube.com/@codegrid] . Happy coding!",
        },
      ],
    },
   ],
};