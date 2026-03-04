"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BlogHero() {
   const buttons = [
      { label: "GALLERY", href: "/blog/getting-started/gallery" },
      { label: "DEMOS", href: "https://t7labs-demo.pages.dev/" },
      { label: "ABOUT ME", href: "https://ash-cv.vercel.app/" },
   ];

   return (
      <section className="pt-20 pb-20 px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
         >
            <h1 className="text-xl md:text-2xl font-bold text-foreground/90 mb-8 tracking-tight leading-relaxed font-serif line-clamp-2 max-w-full">
               Welcome to my blog <span className="inline-block scale-75 opacity-70">🔴</span> I'm Ashirwad and here I document my latest explorations.
            </h1>

            <div className="flex flex-wrap gap-3">
               {buttons.map((btn) => (
                  <Link
                     key={btn.label}
                     href={btn.href}
                     className="px-6 py-2.5 rounded-lg bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary text-[11px] font-black tracking-widest transition-all duration-300 flex items-center gap-2 group shadow-sm hover:shadow-md"
                  >
                     {btn.label}
                     <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
               ))}
            </div>
         </motion.div>
      </section>
   );
}
