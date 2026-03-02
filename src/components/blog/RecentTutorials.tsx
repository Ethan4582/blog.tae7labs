"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { recentTutorials } from "@/src/lib/mockData";

export default function RecentTutorials() {
   return (
      <section className="px-10 py-20 pb-20 border-t border-border/10">
         <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-black text-foreground tracking-tight font-serif">Recent Tutorials</h2>
            <Link
               href="/gallery"
               className="text-primary hover:text-primary/70 transition-colors text-[13px] font-bold uppercase tracking-widest border-b border-transparent hover:border-primary/30 pb-0.5"
            >
               See All
            </Link>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {recentTutorials.map((t, i) => (
               <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
               >
                  <div className="relative aspect-video rounded-xl overflow-hidden mb-6 shadow-xl shadow-black/5 group-hover:shadow-2xl transition-all duration-500 scale-[1] group-hover:scale-[1.02]">
                     <Image
                        src={t.image}
                        alt={t.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                     />
                  </div>

                  <div className="space-y-4">
                     <div className="flex items-center gap-4 text-[11px] font-black tracking-widest uppercase text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                        <span>{t.date}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-border/20" />
                        <span className="bg-muted px-2 py-0.5 rounded text-[10px] text-foreground/50 border border-border/40 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                           {t.tag}
                        </span>
                     </div>

                     <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                        {t.title}
                     </h3>

                     <p className="text-foreground/70 text-[15px] leading-relaxed line-clamp-2 transition-colors group-hover:text-foreground/90 font-sans">
                        {t.description}
                     </p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
