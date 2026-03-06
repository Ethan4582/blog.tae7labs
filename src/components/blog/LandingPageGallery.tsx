"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { landingPages } from "@/src/lib/landing_pageData";

export default function LandingPageGallery() {
   return (
      <div className="flex-1 min-w-0 px-10 py-12 font-sans text-foreground">
         <div className="max-w-6xl">
            <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-12 font-serif">
               Landing Page Templates
            </h1>

            <div className="space-y-16">
               {landingPages.map((group) => (
                  <section key={group.slug} id={group.slug} className="scroll-mt-[100px]">
                     <h2 className="text-2xl font-bold font-serif mb-6 text-foreground tracking-tight border-b border-border/10 pb-4">
                        {group.title}
                     </h2>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {group.pages.map((page) => (
                           <motion.div
                              key={page.slug}
                              initial={{ opacity: 0, scale: 0.95 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.4 }}
                              className="group flex flex-col"
                           >
                              <Link href={`/templates/${group.slug}/${page.slug}`}>
                                 <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-6 border border-border/10 bg-muted/20">
                                    <Image
                                       src={page.image}
                                       alt={page.title}
                                       fill
                                       className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                                       unoptimized
                                    />
                                    {page.gif && (
                                       <Image
                                          src={page.gif}
                                          alt={`${page.title} animation`}
                                          fill
                                          className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                          unoptimized
                                       />
                                    )}
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
                     </div>
                  </section>
               ))}
            </div>
         </div>
      </div>
   );
}
