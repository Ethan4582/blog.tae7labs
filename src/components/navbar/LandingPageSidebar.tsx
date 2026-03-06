"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { landingPages } from "@/src/lib/landing_pageData";
import clsx from "clsx";

export default function LandingPageSidebar() {
   const pathname = usePathname();

   const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
      const initial: Record<string, boolean> = {};
      landingPages.forEach((group) => {
         initial[group.slug] = true;
      });
      return initial;
   });

   const toggleGroup = (slug: string) => {
      setOpenGroups((prev) => ({ ...prev, [slug]: !prev[slug] }));
   };

   return (
      <aside className="hidden md:block w-[260px] min-w-[260px] h-[calc(100vh-65px)] sticky top-[65px] overflow-y-auto border-r border-border/40 bg-background/50 backdrop-blur-md custom-scrollbar">
         <nav className="py-5 px-4">
            <div className="space-y-1">
               {landingPages.map((group, groupIndex) => (
                  <motion.div
                     key={group.slug}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: groupIndex * 0.05, duration: 0.3 }}
                     className="mb-1"
                  >
                     <button
                        onClick={() => toggleGroup(group.slug)}
                        className={clsx(
                           "w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] font-bold tracking-wide transition-all duration-200 cursor-pointer group font-sans capitalize",
                           openGroups[group.slug]
                              ? "text-foreground/90 font-black"
                              : "text-foreground/70 hover:text-foreground/90 hover:bg-muted/40 font-semibold"
                        )}
                     >
                        <span>{group.title}</span>
                        <motion.div
                           animate={{ rotate: openGroups[group.slug] ? 180 : 0 }}
                           transition={{ duration: 0.25, ease: "easeInOut" }}
                        >
                           <ChevronDown className="w-3.5 h-3.5 text-foreground/30 group-hover:text-foreground/50 transition-colors" />
                        </motion.div>
                     </button>

                     <AnimatePresence initial={false}>
                        {openGroups[group.slug] && (
                           <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                              className="overflow-hidden"
                           >
                              <div className="ml-2 mt-0.5 border-l border-border/20 pl-2">
                                 {group.pages.map((page) => {
                                    const href = `/landing-pages/${group.slug}/${page.slug}`;
                                    const isActive = pathname === href || pathname === `/landing-pages/${page.slug}`; // Fallback

                                    return (
                                       <Link
                                          key={page.slug}
                                          href={href}
                                          className="relative block px-2 py-1 font-sans group/link"
                                       >
                                          {isActive && (
                                             <motion.div
                                                layoutId="sidebar-active-landing"
                                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[8px] w-[3px] h-4 bg-primary rounded-full"
                                                transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                             />
                                          )}
                                          <span className={clsx(
                                             "inline-block px-2 py-1 rounded-md text-[13px] transition-colors w-fit",
                                             isActive
                                                ? "text-primary bg-primary/10 font-bold"
                                                : "text-foreground/70 group-hover/link:text-foreground group-hover/link:bg-muted/40 font-medium"
                                          )}>
                                             {page.title}
                                          </span>
                                       </Link>
                                    );
                                 })}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>
                  </motion.div>
               ))}
            </div>
         </nav>
      </aside>
   );
}
