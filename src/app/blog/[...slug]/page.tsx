import { Metadata } from "next";
import { notFound } from "next/navigation";
import { findPageBySlug, blogNavigation } from "@/src/lib/mockData";
import { getTutorialData } from "@/src/lib/blogData";
import PageContent from "@/src/components/PageContent";
import TableOfContents from "@/src/components/TableOfContents";
import BlogGallery from "@/src/components/blog/BlogGallery";

interface BlogPageProps {
   params: Promise<{ slug: string[] }>;
}

// Generate all static paths at build time.
// NOTE: getting-started/intro is intentionally excluded because it redirects
// to /blog and is NOT a real page — including it causes a static export error.
export async function generateStaticParams() {
   const paths: { slug: string[] }[] = [];
   blogNavigation.forEach((group: any) => {
      group.pages.forEach((page: any) => {
         const isIntroRedirect =
            group.slug === "getting-started" && page.slug === "intro";
         const isLandingPageRedirect =
            group.slug === "getting-started" && page.slug === "landing-page";

         if (!isIntroRedirect && !isLandingPageRedirect) {
            paths.push({ slug: [group.slug, page.slug] });
         }
      });
   });
   return paths;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
   const { slug } = await params;
   const result = findPageBySlug(slug);
   if (!result) return { title: "Not Found" };
   return {
      title: `${result.page.title} — ${result.group.title} | tae7labs`,
      description: `Read about ${result.page.title} in the ${result.group.title} section.`,
   };
}

export default async function BlogSlugPage({ params }: BlogPageProps) {
   const { slug } = await params;

   if (slug.join("/") === "getting-started/gallery") {
      return <BlogGallery />;
   }

   const result = findPageBySlug(slug);

   if (!result) notFound();

   const { group, page } = result;
   const post = getTutorialData(page.slug);

   return (
      <>
         <PageContent group={group} page={page} post={post} />
         {group.title !== "Getting Started" && (
            <TableOfContents sections={post ? post.sections : page.sections} />
         )}
      </>
   );
}

