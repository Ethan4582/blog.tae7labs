"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function BlogHero() {
   const buttons = [
      { label: "GALLERY", href: "/gallery" },
      { label: "DEMOS", href: "/demo" },
      { label: "ABOUT ME", href: "/about" },
   ];

   return (
      <section className="pt-20 pb-20 px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
         >
            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-12 tracking-tight leading-[1.1] font-serif">
               Welcome to my blog <span className="inline-block animate-pulse">🔴</span> I'm Ashirvad and here I document my latest explorations.
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
