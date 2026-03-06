"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { landingPages } from "@/src/lib/landing_pageData";

export default function LandingPageSection() {
   // Flat map to get all landing page items
   const allPages = landingPages.flatMap(group => group.pages);

   return (
      <section className="px-10 py-12 pb-12 border-t border-border/10">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-foreground tracking-tight font-serif">Landing Page Templates</h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {allPages.map((page, i) => (
               <motion.div
                  key={page.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
               >
                  <Link href={`/landing-pages/${landingPages[0].slug}/${page.slug}`} className="cursor-pointer block">
                     <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-border/5 bg-muted/20 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                        <Image
                           src={page.image}
                           alt={page.title}
                           fill
                           className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/50">
                           <span>{page.date}</span>
                           {page.categories && page.categories.length > 0 && (
                              <>
                                 <span className="w-1 h-1 rounded-full bg-border/40" />
                                 <span className="text-primary/60">{page.categories[0]}</span>
                              </>
                           )}
                        </div>

                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                           {page.title}
                        </h3>

                        <p className="text-muted-foreground/80 text-[14px] leading-relaxed line-clamp-2 font-sans">
                           {page.description}
                        </p>
                     </div>
                  </Link>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
