import { notFound } from "next/navigation";
import { findPageBySlug, blogData } from "@/src/lib/blogData";
import PageContent from "@/src/components/PageContent";
import TableOfContents from "@/src/components/TableOfContents";

interface BlogPageProps {
   params: Promise<{ slug: string[] }>;
}

// Generate all static paths at build time
export async function generateStaticParams() {
   const paths: { slug: string[] }[] = [];
   blogData.forEach((group) => {
      group.pages.forEach((page) => {
         paths.push({ slug: [group.slug, page.slug] });
      });
   });
   return paths;
}

export async function generateMetadata({ params }: BlogPageProps) {
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
   const result = findPageBySlug(slug);

   if (!result) notFound();

   const { group, page } = result;

   return (
      <>
         <PageContent group={group} page={page} />
         {group.title !== "Getting Started" && (
            <TableOfContents sections={page.sections} />
         )}
      </>
   );
}
