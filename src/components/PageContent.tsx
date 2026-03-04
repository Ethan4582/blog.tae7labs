"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { PageItem, ToggleGroup } from "@/src/lib/mockData";
import type { PostContent, ContentBlock } from "@/src/lib/types";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import clsx from "clsx";

interface PageContentProps {
   group: ToggleGroup;
   page: PageItem;
   post: PostContent | null;
}

const containerVariants = {
   hidden: {},
   visible: { transition: { staggerChildren: 0.1 } },
};

const sectionVariants = {
   hidden: { opacity: 0, y: 28 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
   },
};

function CodeBlock({ block }: { block: ContentBlock }) {
   const [activeTab, setActiveTab] = useState(0);
   const [copied, setCopied] = useState(false);

   const hasTabs = block.tabs && block.tabs.length > 0;
   const content = hasTabs ? block.tabs![activeTab].code : block.code;
   const activeLanguage = hasTabs ? block.tabs![activeTab].language : block.language;

   const handleCopy = () => {
      if (!content) return;
      navigator.clipboard.writeText(content).then(() => {
         setCopied(true);
         setTimeout(() => setCopied(false), 2000);
      });
   };

   const CopyIcon = () => (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M1 9.5C1 8.67157 1.67157 8 2.5 8H4V6.5C4 5.67157 4.67157 5 5.5 5H7V3.5C7 2.67157 7.67157 2 8.5 2H12.5C13.3284 2 14 2.67157 14 3.5V7.5C14 8.32843 13.3284 9 12.5 9H11V10.5C11 11.3284 10.3284 12 9.5 12H8V13.5C8 14.3284 7.32843 15 6.5 15H2.5C1.67157 15 1 14.3284 1 13.5V9.5ZM2.5 9C2.22386 9 2 9.22386 2 9.5V13.5C2 13.7761 2.22386 14 2.5 14H6.5C6.77614 14 7 13.7761 7 13.5V12H5.5C4.67157 12 4 11.3284 4 10.5V9H2.5ZM5 10.5C5 10.7761 5.22386 11 5.5 11H9.5C9.77614 11 10 10.7761 10 10.5V6.5C10 6.22386 9.77614 6 9.5 6H8V7.5C8 8.32843 7.32843 9 6.5 9H5V10.5ZM6.5 8C6.22386 8 6 7.77614 6 7.5V3.5C6 3.22386 6.22386 3 6.5 3H10.5C10.7761 3 11 3.22386 11 3.5V7.5C11 7.77614 10.7761 8 10.5 8H6.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </svg>
   );

   const CheckIcon = () => (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </svg>
   );

   return (
      <div className="mt-8 mb-10 overflow-hidden rounded-xl border border-border/40 bg-[#f8f9fa] dark:bg-muted/30 shadow-sm font-sans mx-auto max-w-full">
         {/* Header — always rendered so copy button is always visible */}
         <div className="flex items-center gap-1 border-b border-border/30 bg-[#f1f3f5] dark:bg-muted/50 px-2 pt-2 overflow-x-auto overflow-y-hidden custom-scrollbar">
            {hasTabs ? (
               block.tabs!.map((tab, idx) => (
                  <button
                     key={tab.name}
                     onClick={() => setActiveTab(idx)}
                     className={clsx(
                        "px-4 py-2 text-sm transition-colors rounded-t-lg font-mono relative",
                        activeTab === idx
                           ? "text-primary bg-[#f8f9fa] dark:bg-muted/30"
                           : "text-muted-foreground hover:text-foreground"
                     )}
                  >
                     {tab.name}
                     {activeTab === idx && (
                        <motion.div
                           layoutId="activeTabIndicator"
                           className="absolute top-0 left-0 right-0 h-0.5 bg-blue-500 rounded-t-lg"
                        />
                     )}
                  </button>
               ))
            ) : block.name ? (
               <div className="px-4 py-2 text-sm font-mono text-muted-foreground bg-[#f8f9fa] dark:bg-muted/30 rounded-t-lg border-t-2 border-transparent">
                  {block.name}
               </div>
            ) : (
               <div className="px-4 py-2 text-sm font-mono text-muted-foreground/40">
                  {activeLanguage ?? "code"}
               </div>
            )}
            {/* Copy button — always visible */}
            <button
               onClick={handleCopy}
               title={copied ? "Copied!" : "Copy"}
               className={clsx(
                  "ml-auto px-3 py-1.5 mb-1.5 flex items-center gap-1.5 text-xs font-medium rounded-md transition-all duration-200",
                  copied
                     ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10"
                     : "text-muted-foreground/50 hover:text-foreground hover:bg-border/20"
               )}
            >
               {copied ? (
                  <>
                     <CheckIcon />
                     Copied
                  </>
               ) : (
                  <>
                     <CopyIcon />
                     Copy
                  </>
               )}
            </button>
         </div>
         <div className="p-4 px-5 text-[13px] font-mono leading-relaxed overflow-x-auto custom-scrollbar">
            <pre className="text-foreground/80 break-words whitespace-pre-wrap">
               {content}
            </pre>
         </div>
      </div>
   );
}


export default function PageContent({ group, page, post }: PageContentProps) {
   const ref = useRef<HTMLDivElement>(null);

   useEffect(() => {
      window.scrollTo({ top: 0 });
   }, [page.slug]);

   const hasPost = !!post;

   return (
      <motion.div
         ref={ref}
         key={page.slug}
         variants={containerVariants}
         initial="hidden"
         animate="visible"
         className="flex-1 min-w-0 px-10 py-12 font-sans text-foreground"
      >
         <div className="max-w-4xl">
            {/* 1) HERO SECTION */}
            {hasPost && (
               <motion.div variants={sectionVariants} className="mb-16">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70 mb-8 font-medium">
                     {/* Beautiful Mention */}
                     <a
                        href={`https://twitter.com/${post.author?.replace(/\s+/g, '') || 'tae7labs'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 pr-4 pl-1.5 py-1.5 rounded-full bg-border/40 hover:bg-primary/10 transition-colors border border-border/40 hover:border-primary/20 group cursor-pointer"
                     >
                        <div className="w-6 h-6 rounded-full overflow-hidden bg-background">
                           <img
                              src={`https://unavatar.io/twitter/${post.author?.replace(/\s+/g, '') || 'tae7labs'}?fallback=https://api.dicebear.com/7.x/notionists/svg?seed=${post.author}`}
                              alt={post.author || "Author"}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                           />
                        </div>
                        <span className="text-[13px] font-bold text-foreground/80 group-hover:text-primary transition-colors">
                           @{post.author?.replace(/\s+/g, '') || "Tae7labs"}
                        </span>
                     </a>

                     <span className="text-border">/</span>
                     <span>{post.date}</span>
                     <span className="text-border">/</span>
                     {post.difficulty && (
                        <span className="flex items-center gap-1.5">
                           <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
                           {post.difficulty}
                        </span>
                     )}
                     <span className="text-border">/</span>
                     <span className="flex items-center gap-1.5">
                        <svg width="14" height="14" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.5 1.5C4.18629 1.5 1.5 4.18629 1.5 7.5C1.5 10.8137 4.18629 13.5 7.5 13.5C10.8137 13.5 13.5 10.8137 13.5 7.5C13.5 4.18629 10.8137 1.5 7.5 1.5ZM0.5 7.5C0.5 3.63401 3.63401 0.5 7.5 0.5C11.366 0.5 14.5 3.63401 14.5 7.5C14.5 11.366 11.366 14.5 7.5 14.5C3.63401 14.5 0.5 11.366 0.5 7.5ZM7.5 2.5V12.5C10.2614 12.5 12.5 10.2614 12.5 7.5C12.5 4.73858 10.2614 2.5 7.5 2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                        Medium
                     </span>
                  </div>

                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-3 font-sans">
                     {page.title}
                  </h1>



                  {post.introduction && (
                     <p className="text-foreground/75 leading-relaxed text-lg mb-8 max-w-3xl">
                        {post.introduction}
                     </p>
                  )}

                  <div className="flex flex-wrap items-center gap-4">
                     {post.liveDemo && (
                        <a href={post.liveDemo} className="flex items-center gap-1 px-4 py-2 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold transition hover:bg-blue-100/50 dark:hover:bg-blue-500/20">
                           Live Demo <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </a>
                     )}
                     {post.sourceCode && (
                        <a href={post.sourceCode} className="flex items-center gap-1 px-4 py-2 bg-blue-50/50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg text-sm font-semibold transition hover:bg-blue-100/50 dark:hover:bg-blue-500/20">
                           Source code <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                        </a>
                     )}

                  </div>

                  {/* Video/GIF Demo Section */}
                  {(post.gif || post.videoDemo) && (
                     <div className="mt-12 rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm shadow-2xl aspect-video lg:max-w-4xl mx-auto w-full group relative">
                        {post.gif ? (
                           // eslint-disable-next-line @next/next/no-img-element
                           <img
                              src={post.gif}
                              alt={`${page.title} autoplaying demo`}
                              className="w-full h-full object-cover"
                           />
                        ) : (
                           <iframe
                              src={post.videoDemo}
                              className="w-full h-full border-0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              title="Video Demo"
                           />
                        )}
                        {/* Shadow over top/bottom edges for premium look */}
                        <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
                     </div>
                  )}
               </motion.div>
            )}

            {/* Fallback if no post data found, renders basic title mapping old behavior */}
            {!hasPost && (
               <motion.div variants={sectionVariants} className="mb-14">
                  <h1 className="text-4xl md:text-6xl font-black text-foreground mb-4 tracking-tight leading-tight font-serif">
                     {page.title}
                  </h1>
                  <p className="text-foreground/80 text-lg mb-8 leading-relaxed max-w-2xl font-sans">
                     Placeholder overview for {page.title} under {group.title}.
                  </p>
                  <div className="h-px bg-gradient-to-r from-primary/30 via-primary/5 to-transparent shadow-[0_1px_0_0_rgba(255,255,255,0.1)]" />
               </motion.div>
            )}
         </div>

         {/* 2) SECTIONS  */}
         <div className="max-w-4xl">
            {(hasPost ? post.sections : page.sections).map((section, index) => (
               <motion.section
                  key={section.id}
                  id={section.id}
                  variants={sectionVariants}
                  className="mb-20 scroll-mt-24"
               >
                  {/* Section Title matching the clean layout from image 2 */}
                  <h2 className="text-2xl tracking-tight font-semibold text-foreground mb-6 font-sans">
                     {section.title || `Section ${index + 1}`}
                  </h2>

                  {/* Render Rich Content if available */}
                  {hasPost && 'content' in section && Array.isArray(section.content) ? (
                     <div className="space-y-6">
                        {section.content.map((block, blockIdx) => {
                           // PARAGRAPH
                           if (block.type === "paragraph") {
                              // Link parser: converts @Name[urlURL] to <a href="URL">Name</a>
                              const parseLinks = (text: string) => {
                                 const parts = text.split(/(@\w+\[url[^\]]+\])/g);
                                 return parts.map((part, i) => {
                                    const match = part.match(/@(\w+)\[url([^\]]+)\]/);
                                    if (match) {
                                       return (
                                          <a
                                             key={i}
                                             href={match[2]}
                                             target="_blank"
                                             rel="noopener noreferrer"
                                             className="text-blue-500 hover:text-blue-600 underline font-medium"
                                          >
                                             {match[1]}
                                          </a>
                                       );
                                    }
                                    return part;
                                 });
                              };
                              return (
                                 <p key={blockIdx} className="text-foreground/75 leading-7 text-[16px]">
                                    {parseLinks(block.text)}
                                 </p>
                              );
                           }
                           // CODE / TABS
                           if (block.type === "code") {
                              return <CodeBlock key={blockIdx} block={block} />;
                           }
                           // LIST
                           if (block.type === "list") {
                              return (
                                 <div key={blockIdx} className="bg-[#f8f9fa] dark:bg-muted/20 border border-border/40 rounded-xl p-6 my-8 ml-0 space-y-4">
                                    {block.items?.map((item: string, i: number) => (
                                       <div key={i} className="flex items-start gap-3">
                                          <ArrowRight className="w-4 h-4 text-blue-500 mt-1 shrink-0" />
                                          <p className="text-foreground/80 leading-relaxed text-[15px]">{item}</p>
                                       </div>
                                    ))}
                                 </div>
                              );
                           }
                           // IMAGE
                           if (block.type === "image") {
                              return (
                                 <div key={blockIdx} className="my-10 rounded-2xl overflow-hidden border border-border/40 bg-muted/20 shadow-sm">
                                    {/* This could be Next/Image, using standard img for now */}
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={block.src} alt={block.alt || "Section asset"} className="w-full h-auto object-cover" />
                                 </div>
                              );
                           }
                           return null;
                        })}
                     </div>
                  ) : (
                     // Fallback for empty/mocked section
                     <div className="rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm p-8 mb-8">
                        <div className="flex items-start gap-5">
                           <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-primary-foreground font-bold">{index + 1}</span>
                           </div>
                           <div>
                              <p className="text-sm font-bold text-foreground mb-1.5">{section.title}</p>
                              <p className="text-sm text-foreground/75 leading-relaxed max-w-lg">
                                 This section has no rich content defined in data yet.
                              </p>
                           </div>
                        </div>
                     </div>
                  )}
               </motion.section>
            ))}
         </div >
      </motion.div >
   );
}
