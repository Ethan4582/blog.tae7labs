"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ContentBlock } from "@/src/lib/types";
import { icons } from "@/src/lib/asset_data";
import clsx from "clsx";

// ─── Tiny icon components ────────────────────────────────────────────────────

function CopyIcon() {
   return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d={icons.copy} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </svg>
   );
}

function CheckIcon() {
   return (
      <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d={icons.check} fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      </svg>
   );
}



function parseLinks(text: string) {
   const parts = text.split(/(@[^\[]+\[url[^\]]+\])/g);
   return parts.map((part, i) => {
      const match = part.match(/@([^\[]+?)[\s]*\[url([^\]]+)\]/);
      if (match) {
         return (
            <a
               key={i}
               href={match[2]}
               target="_blank"
               rel="noopener noreferrer"
               className="text-primary hover:text-primary/80 underline font-medium underline-offset-4"
            >
               {match[1].trim()}
            </a>
         );
      }
      return part;
   });
}

// ─── CodeBlock ───────────────────────────────────────────────────────────────

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

   return (
      <div className="mt-8 mb-10 overflow-hidden rounded-xl border border-border/40 bg-card shadow-sm font-sans mx-auto max-w-full">
         {/* Header — always visible so copy button is always there */}
         <div className="flex items-center gap-1 border-b border-border/30 bg-muted px-2 pt-2 overflow-x-auto overflow-y-hidden custom-scrollbar">
            {hasTabs ? (
               block.tabs!.map((tab, idx) => (
                  <button
                     key={tab.name}
                     onClick={() => setActiveTab(idx)}
                     className={clsx(
                        "px-4 py-2 text-sm transition-colors rounded-t-lg font-mono relative",
                        activeTab === idx
                           ? "text-primary bg-card"
                           : "text-muted-foreground hover:text-foreground"
                     )}
                  >
                     {tab.name}
                     {activeTab === idx && (
                        <motion.div
                           layoutId="activeTabIndicator"
                           className="absolute top-0 left-0 right-0 h-0.5 bg-primary rounded-t-lg shadow-[0_-2px_8px_rgba(59,130,246,0.3)]"
                        />
                     )}
                  </button>
               ))
            ) : block.name ? (
               <div className="px-4 py-2 text-sm font-mono text-muted-foreground bg-card rounded-t-lg border-t-2 border-transparent">
                  {block.name}
               </div>
            ) : (
               <div className="px-4 py-2 text-sm font-mono text-muted-foreground/40">
                  {activeLanguage ?? "code"}
               </div>
            )}

            <button
               onClick={handleCopy}
               title={copied ? "Copied!" : "Copy"}
               className={clsx(
                  "ml-auto px-3 py-1.5 mb-1.5 flex items-center gap-1.5 text-xs font-medium rounded-md transition-all duration-200",
                  copied
                     ? "text-green-600 dark:text-green-400 bg-green-500/10"
                     : "text-muted-foreground/50 hover:text-foreground hover:bg-border/20"
               )}
            >
               {copied ? <><CheckIcon /> Copied</> : <><CopyIcon /> Copy</>}
            </button>
         </div>

         <div className="p-4 px-5 text-[13px] font-mono leading-relaxed overflow-auto max-h-[500px] custom-scrollbar">
            <pre className="text-foreground/80 break-words whitespace-pre-wrap">
               {content}
            </pre>
         </div>
      </div>
   );
}

// ─── RichSection ─────────────────────────────────────────────────────────────
// Renders the array of ContentBlocks inside a section

export function RichSection({ content }: { content: ContentBlock[] }) {
   return (
      <div className="space-y-6">
         {content.map((block, idx) => {
            if (block.type === "paragraph") {
               return (
                  <p key={idx} className="text-foreground/75 leading-7 text-[16px]">
                     {parseLinks(block.text!)}
                  </p>
               );
            }

            if (block.type === "code") {
               return <CodeBlock key={idx} block={block} />;
            }

            if (block.type === "list") {
               return (
                  <div key={idx} className="bg-card border border-border/40 rounded-xl p-6 my-8 space-y-4">
                     {block.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-3">
                           <ArrowRight className="w-4 h-4 text-primary mt-1 shrink-0" />
                           <p className="text-foreground/80 leading-relaxed text-[15px]">{item}</p>
                        </div>
                     ))}
                  </div>
               );
            }

            if (block.type === "image") {
               return (
                  <div key={idx} className="my-10 rounded-2xl overflow-hidden border border-border/40 bg-muted/20 shadow-sm">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                     <img src={block.src} alt={block.alt || "Section asset"} className="w-full h-auto object-cover" />
                  </div>
               );
            }

            return null;
         })}
      </div>
   );
}
