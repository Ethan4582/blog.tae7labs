interface Tutorial {
   id: string;
   title: string;
   description: string;
   date: string;
   tag: string;
   image: string;
   category: string;
}

interface Product {
   id: string;
   title: string;
   description: string;
   date: string;
   image: string;
}

export const recentTutorials: Tutorial[] = [
   {
      id: "1",
      title: "Mask Section Transition",
      description: "A website tutorial featuring a scroll animation using an SVG Mask to create a section transition, made with React, Framer Motion.",
      date: "June 3, 2024",
      tag: "SCROLL",
      category: "Scroll",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
   },
   {
      id: "2",
      title: "Mouse Image Distortion",
      description: "A website animation featuring an image distortion in a curved, using the sin function, React, React Three Fiber and Framer Motion.",
      date: "June 3, 2024",
      tag: "MOUSE",
      category: "Mouse",
      image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800",
   },
   {
      id: "3",
      title: "Background Image Parallax",
      description: "A website animation featuring a background image moving on scroll in a parallax motion, made with Next.js app.",
      date: "May 25, 2024",
      tag: "SCROLL",
      category: "Scroll",
      image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800",
   },
];

export const featuredProducts: Product[] = [
   {
      id: "p1",
      title: "Web Animation Course",
      description: "A Front End Animation Course featuring animations built with Next.js, Framer Motion, GSAP and more.",
      date: "Sept 15, 2023",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?auto=format&fit=crop&q=80&w=800",
   },
   {
      id: "p2",
      title: "UI Design Kit",
      description: "High-quality dashboard UI Kit with hundreds of components for Figma and Framer.",
      date: "August 20, 2023",
      image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800",
   },
];

export const allTutorials: Partial<Tutorial>[] = [
   { date: "June 3, 2024", title: "Mask Section Transition", category: "Scroll" },
   { date: "May 25, 2024", title: "Background Image Parallax", category: "Scroll" },
   { date: "May 25, 2024", title: "Text Parallax", category: "Scroll" },
   { date: "May 21, 2024", title: "Sticky Footer", category: "Scroll" },
   { date: "May 13, 2024", title: "Perspective Section Transition", category: "Scroll" },
   { date: "February 23, 2024", title: "Text Along Path", category: "Mouse" },
   { date: "January 31, 2024", title: "SVG Path On Scroll", category: "Scroll" },
];
