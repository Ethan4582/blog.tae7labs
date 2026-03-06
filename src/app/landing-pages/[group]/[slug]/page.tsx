import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { landingPages } from "@/src/lib/landing_pageData";
import { ArrowUpRight, Eye, Calendar, User, LayoutTemplate } from "lucide-react";

interface LandingPageProps {
   params: Promise<{ group: string; slug: string }>;
}

export async function generateStaticParams() {
   const paths: { group: string; slug: string }[] = [];
   landingPages.forEach((group) => {
      group.pages.forEach((page) => {
         paths.push({ group: group.slug, slug: page.slug });
      });
   });
   return paths;
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
   const { group, slug } = await params;
   const groupData = landingPages.find((g) => g.slug === group);
   const page = groupData?.pages.find((p) => p.slug === slug);
   if (!page) return { title: "Not Found" };
   return {
      title: `${page.title} — Landing Page Template | Tae7labs`,
      description: page.description,
   };
}

export default async function LandingPageSlugPage({ params }: LandingPageProps) {
   const { group, slug } = await params;
   const groupData = landingPages.find((g) => g.slug === group);
   const pageData = groupData?.pages.find((p) => p.slug === slug);

   if (!pageData) notFound();

   // Get related templates (other templates not this one)
   const allPages = landingPages.flatMap((g) => g.pages.map(p => ({ ...p, groupSlug: g.slug })));
   const relatedTemplates = allPages.filter((p) => p.slug !== slug).slice(0, 4);

   return (
      <div className="flex-1 min-w-0 bg-background overflow-y-auto custom-scrollbar px-6 md:px-10 py-10">
         <div className="max-w-[1400px] mx-auto space-y-12">

            {/* Header: Title & Action Buttons */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border/10">
               <div>
                  <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground font-serif">
                     {pageData.title} <span className="text-muted-foreground/50 font-sans font-light hidden sm:inline-block">— Landing Page</span>
                  </h1>
               </div>
               <div className="flex items-center gap-3 shrink-0">
                  {pageData.previewUrl && (
                     <a
                        href={pageData.previewUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 rounded-full bg-muted/40 hover:bg-muted/80 text-foreground text-[14px] font-semibold tracking-wide transition-colors border border-border/30"
                     >
                        Preview
                     </a>
                  )}
                  <a
                     href="#"
                     className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-[14px] font-bold tracking-wide transition-colors border border-transparent flex items-center gap-2"
                  >
                     Use for Free
                  </a>
               </div>
            </header>

            {/* Dynamic Images Grid (2 PER ROW) */}
            {(() => {
               const allImages = pageData.images || [];

               return (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-muted/10 p-4 md:p-8 rounded-[32px] border border-border/10">
                     {allImages.map((img, i) => (
                        <div key={i} className="relative aspect-[4/3] rounded-[24px] overflow-hidden border border-border/10 bg-background/50 shadow-lg group">
                           <Image
                              src={img}
                              alt={`${pageData.title} Image ${i + 1}`}
                              fill
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                              unoptimized
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent mix-blend-multiply pointer-events-none" />
                        </div>
                     ))}
                  </div>
               );
            })()}

            {/* Content Section: Description & Metadata */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 pt-8 px-4">
               {/* Left: About */}
               <div className="lg:col-span-8 space-y-6">
                  <h2 className="text-2xl font-bold font-sans tracking-tight">About this Template</h2>
                  <p className="text-lg text-muted-foreground leading-relaxed font-sans max-w-3xl">
                     {pageData.description}
                  </p>
               </div>

               {/* Right: Details & Categories */}
               <div className="lg:col-span-4 space-y-12">
                  <div className="space-y-6">
                     <h3 className="text-[14px] font-black uppercase tracking-widest text-muted-foreground/70">Credits</h3>
                     <ul className="space-y-4 font-sans">
                        {pageData.author && (
                           <li className="flex items-center gap-3 text-muted-foreground">
                              <User className="w-4 h-4 text-primary shrink-0" />
                              <a href={pageData.creatorUrl || "#"} target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground/90 hover:text-primary transition-colors hover:underline">
                                 {pageData.author}
                              </a>
                           </li>
                        )}
                        {pageData.frameworkName && (
                           <li className="flex items-center gap-3 text-muted-foreground">
                              <LayoutTemplate className="w-4 h-4 shrink-0" />
                              <a href={pageData.frameworkUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-foreground transition-colors hover:underline">
                                 {pageData.frameworkName}
                              </a>
                           </li>
                        )}
                        {pageData.twitterHandle && (
                           <li className="flex items-center gap-3 text-muted-foreground">
                              <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                              <a href={pageData.twitterUrl || "#"} target="_blank" rel="noopener noreferrer" className="text-[14px] hover:text-foreground transition-colors hover:underline">
                                 {pageData.twitterHandle}
                              </a>
                           </li>
                        )}
                     </ul>
                  </div>

                  {pageData.categories && pageData.categories.length > 0 && (
                     <div className="space-y-6">
                        <h3 className="text-[14px] font-black uppercase tracking-widest text-muted-foreground/70">Categories</h3>
                        <div className="flex flex-wrap gap-2">
                           {pageData.categories.map((cat, idx) => (
                              <a href={`/landing-pages#${group}`} key={idx} className="px-3 py-1.5 rounded-md bg-muted/40 border border-border/30 text-[13px] font-semibold tracking-wide text-foreground/80 flex items-center gap-2 hover:bg-muted/60 transition-colors">
                                 <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                                 {cat}
                              </a>
                           ))}
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Disclaimer block mapping to the user's specific text string */}
            {!pageData.hasPermission && (
               <div className="pt-8 mb-4 border-t border-border/10">
                  <p className="text-[13px] text-muted-foreground/70 leading-relaxed max-w-4xl">
                     <strong>Note:</strong> This design is not my original design. I have been inspired from the original creator's design. I have not bought the original design or I am reselling it. I built it myself for my practice to show proof of work. If you need to remove the template, please contact me on Twitter. Anyone using this template should properly credit the original user.
                  </p>
               </div>
            )}

            {/* Related Templates Layout */}
            {relatedTemplates.length > 0 && (
               <div className="pt-20 border-t border-border/10">
                  <div className="flex items-center justify-between mb-8 px-2">
                     <h2 className="text-2xl font-bold text-foreground font-sans">Related Templates</h2>
                     <Link href="/landing-pages/gallery" className="text-sm font-semibold hover:text-primary transition-colors flex items-center gap-1">
                        See All <ArrowUpRight className="w-4 h-4" />
                     </Link>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {relatedTemplates.map((template) => (
                        <Link
                           key={template.slug}
                           href={`/landing-pages/${template.groupSlug}/${template.slug}`}
                           className="group block space-y-4"
                        >
                           <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-border/10 bg-muted/20">
                              <Image
                                 src={template.image}
                                 alt={template.title}
                                 fill
                                 className="object-cover transition-opacity duration-300 group-hover:opacity-0"
                                 unoptimized
                              />
                              {template.gif && (
                                 <Image
                                    src={template.gif}
                                    alt={`${template.title} animation`}
                                    fill
                                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                    unoptimized
                                 />
                              )}
                           </div>
                           <div className="px-2">
                              <h4 className="font-bold text-foreground group-hover:text-primary transition-colors tracking-tight">
                                 {template.title}
                              </h4>
                              <p className="text-[13px] text-muted-foreground mt-1">Free</p>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>
            )}
         </div>
      </div>
   );
}
