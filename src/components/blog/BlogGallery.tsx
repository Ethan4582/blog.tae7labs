"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { recentTutorials } from "@/src/lib/mockData";
import clsx from "clsx";

const filters = ["RECENT", "SCROLL", "SHADER", "PAGE REVEAL", "GSAP", "LANDING PAGE"];

export default function BlogGallery() {
   const [activeFilter, setActiveFilter] = useState("RECENT");

   // Filter logic based on category/tags
   const filteredTutorials = recentTutorials.filter((t) => {
      if (activeFilter === "RECENT" || activeFilter === "POPULAR") return true; // Show all for now for these 
      return t.category.toUpperCase() === activeFilter.toUpperCase() || t.tag.toUpperCase() === activeFilter.toUpperCase();
   });

   return (
      <div className="flex-1 min-w-0 px-10 py-12 font-sans text-foreground">
         <div className="max-w-6xl">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 mb-12">
               {filters.map((filter) => (
                  <button
                     key={filter}
                     onClick={() => setActiveFilter(filter)}
                     className={clsx(
                        "px-4 py-1.5 rounded-full text-[11px] font-black tracking-widest uppercase transition-all duration-300 border",
                        activeFilter === filter
                           ? "bg-primary text-primary-foreground border-primary"
                           : "bg-transparent text-foreground/60 border-border hover:border-primary/50 hover:text-foreground/90"
                     )}
                  >
                     {filter}
                  </button>
               ))}
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-12 font-serif">
               All Tutorials
            </h1>

            {/* Gallery Grid */}
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               <AnimatePresence mode="popLayout">
                  {filteredTutorials.map((t, i) => (
                     <motion.div
                        key={t.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4 }}
                        className="group flex flex-col"
                     >
                        <Link href={t.slug ? `/blog/${t.category.toLowerCase()}/${t.slug}` : "#"}>
                           <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border/10 bg-muted/20">
                              {/* Static Image (now scales on hover) */}
                              <Image
                                 src={t.image}
                                 alt={t.title}
                                 fill
                                 className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                           </div>

                           <div className="space-y-3">
                              <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/50">
                                 <span>{t.date}</span>
                                 <span className="w-1 h-1 rounded-full bg-border/40" />
                                 <span className="px-2 py-0.5 rounded-md bg-muted border border-border/40 text-foreground/50">{t.tag}</span>
                              </div>

                              <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                                 {t.title}
                              </h3>

                              <p className="text-muted-foreground/80 text-[14px] leading-relaxed line-clamp-2 font-sans">
                                 {t.galleryDescription}
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
