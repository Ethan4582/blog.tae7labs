"use client";

import { motion } from "framer-motion";
import { allTutorials } from "@/src/lib/mockData";

export default function TutorialList() {
   const categories = Array.from(new Set(allTutorials.map(t => t.category)));

   return (
      <section className="px-10 py-20 pb-40 border-t border-border/10">
         <h2 className="text-6xl font-black text-foreground mb-20 tracking-tight leading-tight font-serif text-center">
            All Tutorials
         </h2>

         <div className="max-w-4xl mx-auto space-y-24">
            {categories.map((cat) => (
               <div key={cat} className="space-y-10">
                  <h3 className="text-3xl font-black text-primary/80 tracking-tight font-serif">{cat}</h3>

                  <div className="space-y-2 transition-all duration-500">
                     {allTutorials
                        .filter(t => t.category === cat)
                        .map((tutorial, idx) => (
                           <motion.div
                              key={`${cat}-${idx}`}
                              initial={{ opacity: 0, x: -10 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-10%" }}
                              transition={{ delay: idx * 0.05 }}
                              className="group flex items-center justify-between py-5 border-b border-border/10 relative overflow-hidden cursor-pointer"
                           >
                              <span className="text-[14px] text-muted-foreground/60 group-hover:text-muted-foreground font-mono transition-colors">
                                 {tutorial.date}
                              </span>

                              <span className="text-2xl font-black text-foreground/80 group-hover:text-primary transition-all duration-300 font-serif tracking-tight pr-4">
                                 {tutorial.title}
                              </span>

                              {/* Scroll Underline Animation */}
                              <motion.div
                                 initial={{ width: 0 }}
                                 whileInView={{ width: "100%" }}
                                 viewport={{ once: true, margin: "-10%" }}
                                 transition={{ duration: 0.8, ease: "easeOut" }}
                                 className="absolute bottom-0 left-0 h-[2px] bg-primary/20"
                              />
                           </motion.div>
                        ))}
                  </div>
               </div>
            ))}
         </div>
      </section>
   );
}
