"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { featuredProducts } from "@/src/lib/mockData";

export default function FeaturedProducts() {
   return (
      <section className="px-10 py-20 pb-20 border-t border-border/10">
         <div className="mb-12">
            <h2 className="text-4xl font-black text-foreground tracking-tight font-serif">
               My Other Alternative Products <span className="text-primary/70">You Might Like</span>
            </h2>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((p, i) => (
               <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group cursor-pointer"
               >
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-xl shadow-black/5 group-hover:shadow-2xl transition-all duration-500 scale-[1] group-hover:scale-[1.02] border border-border/10">
                     <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-105"
                     />
                  </div>

                  <div className="space-y-4">
                     <div className="text-[11px] font-black tracking-widest uppercase text-muted-foreground/60 transition-colors group-hover:text-muted-foreground">
                        {p.date}
                     </div>

                     <h3 className="text-2xl font-black text-foreground group-hover:text-primary transition-colors tracking-tight font-serif leading-tight">
                        {p.title}
                     </h3>

                     <p className="text-foreground/70 text-[15px] leading-relaxed line-clamp-2 transition-colors group-hover:text-foreground/90 font-sans">
                        {p.description}
                     </p>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   );
}
