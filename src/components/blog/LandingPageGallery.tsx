"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { landingPages } from "@/src/lib/landing_pageData";

export default function LandingPageGallery() {
   const allPages = landingPages.flatMap((group) => group.pages);

   return (
      <div className="flex-1 min-w-0 px-10 py-12 font-sans text-foreground">
         <div className="max-w-6xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-12 font-serif">
               Landing Page Templates
            </h1>

            {/* Gallery Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               <AnimatePresence mode="popLayout">
                  {allPages.map((page) => (
                     <motion.div
                        key={page.slug}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group flex flex-col"
                     >
                        <Link href={`/landing-pages/${landingPages[0].slug}/${page.slug}`}>
                           <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border/10 bg-muted/20">
                              <Image
                                 src={page.image}
                                 alt={page.title}
                                 fill
                                 className="object-cover transition-transform duration-700 group-hover:scale-105"
                                 unoptimized
                              />
                           </div>

                           <div className="space-y-3">
                              <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/50">
                                 <span>{page.date}</span>
                                 {page.categories && page.categories.length > 0 && (
                                    <>
                                       <span className="w-1 h-1 rounded-full bg-border/40" />
                                       <span className="px-2 py-0.5 rounded-md bg-muted border border-border/40 text-foreground/50">{page.categories[0]}</span>
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
               </AnimatePresence>
            </motion.div>
         </div>
      </div>
   );
}
