import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { PageItem } from "@/src/lib/mockData";
import type { PostContent } from "@/src/lib/types";

interface PostHeroProps {
   post: PostContent;
   page: PageItem;
}

const sectionVariants = {
   hidden: { opacity: 0, y: 28 },
   visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as any },
   },
};

export default function PostHero({ post, page }: PostHeroProps) {
   const handle = post.author?.replace(/\s+/g, "") || "tae7labs";

   return (
      <motion.div variants={sectionVariants} className="mb-16">
         {/* Meta row: author, date, difficulty */}
         <div className="flex flex-wrap items-center gap-4 text-sm text-foreground/70 mb-8 font-medium">
            <a
               href={`https://twitter.com/${handle}`}
               target="_blank"
               rel="noopener noreferrer"
               className="flex items-center gap-2 pr-4 pl-1.5 py-1.5 rounded-full bg-border/40 hover:bg-primary/10 transition-colors border border-border/40 hover:border-primary/20 group cursor-pointer"
            >
               <div className="w-6 h-6 rounded-full overflow-hidden bg-background">
                  <img
                     src={`https://unavatar.io/twitter/${handle}?fallback=https://api.dicebear.com/7.x/notionists/svg?seed=${post.author}`}
                     alt={post.author || "Author"}
                     className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
               </div>
               <span className="text-[13px] font-bold text-foreground/80 group-hover:text-primary transition-colors">
                  @{handle}
               </span>
            </a>

            <span className="text-border">/</span>
            <span>{post.date}</span>
            <span className="text-border">/</span>

            {post.difficulty && (
               <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                  {post.difficulty}
               </span>
            )}



         </div>

         <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground mb-3 font-sans">
            {page.title}
         </h1>

         {post.introduction && (
            <p className="text-foreground/75 leading-relaxed text-lg mb-8 max-w-3xl">
               {post.introduction}
            </p>
         )}

         {/* Action links */}
         <div className="flex flex-wrap items-center gap-4">
            {post.liveDemo && (
               <a
                  href={post.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary dark:text-primary dark:bg-primary/20 rounded-lg text-sm font-semibold transition hover:bg-primary/20 dark:hover:bg-primary/30"
               >
                  Live Demo <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
               </a>
            )}
            {post.sourceCode && (
               <a
                  href={post.sourceCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-4 py-2 bg-primary/10 text-primary dark:text-primary dark:bg-primary/20 rounded-lg text-sm font-semibold transition hover:bg-primary/20 dark:hover:bg-primary/30"
               >
                  Source code <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
               </a>
            )}
         </div>
         {/* Image / GIF / video */}
         {(post.gif || post.videoDemo || post.image) && (
            <div className="mt-12 rounded-2xl overflow-hidden border border-border/40 bg-card/40 backdrop-blur-sm shadow-2xl aspect-video lg:max-w-4xl mx-auto w-full group relative">
               {post.gif ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                     src={post.gif}
                     alt={`${page.title} autoplaying demo`}
                     className="w-full h-full object-cover"
                  />
               ) : post.videoDemo ? (
                   post.videoDemo.endsWith(".mp4") ? (
                      <video
                         src={post.videoDemo}
                         className="w-full h-full object-cover"
                         autoPlay
                         muted
                         loop
                         playsInline
                         controls
                      />
                   ) : (
                      <iframe
                         src={post.videoDemo}
                         className="w-full h-full border-0"
                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                         allowFullScreen
                         title="Video Demo"
                      />
                   )
                ) : (
                  <img
                     src={post.image}
                     alt={`${page.title} hero`}
                     className="w-full h-full object-cover"
                  />
               )}
               <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-white/10 rounded-2xl" />
            </div>
         )}

         {/* Notes / Highlights (Now below the media) */}
         {post.notes && (
            <div className="mt-12 px-5 py-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4 backdrop-blur-sm">
               <div className="mt-0.5 w-6 h-6 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                     <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
               </div>
               <p className="text-[15px] text-foreground/80 leading-relaxed font-medium">
                  {post.notes}
               </p>
            </div>
         )}
      </motion.div>
   );
}
