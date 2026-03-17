"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { recentTutorials } from "@/src/lib/mockData";

export default function RecentTutorials() {
   return (
      <section className="px-10 py-12 pb-12 border-t border-border/10">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black text-foreground tracking-tight font-serif">Recent Tutorials</h2>
            <Link
               href="/gallery"
               className="text-primary hover:text-primary/70 transition-colors text-[13px] font-bold uppercase tracking-widest border-b border-transparent hover:border-primary/30 pb-0.5"
            >
               See All
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {recentTutorials.slice(0, 3).map((t, i) => (
               <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="group"
               >
                  <Link href={`/blog/${t.category}/${t.slug}`} className="cursor-pointer block">
                     <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-border/5 bg-muted/20 transition-all duration-500 group-hover:border-primary/20 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                        <Image
                           src={t.image}
                           alt={t.title}
                           fill
                           className="object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-[10px] font-black tracking-[0.2em] uppercase text-muted-foreground/50">
                           <span>{t.date}</span>
                           <span className="w-1 h-1 rounded-full bg-border/40" />
                           <span className="text-primary/60">{t.tag}</span>
                        </div>

                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                           {t.title}
                        </h3>

                        <p className="text-muted-foreground/80 text-[14px] leading-relaxed line-clamp-2 font-sans">
                           {t.description}
                        </p>
                     </div>
                  </Link>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
