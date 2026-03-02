import { Metadata } from "next";
import BlogHero from "@/src/components/blog/BlogHero";
import RecentTutorials from "@/src/components/blog/RecentTutorials";
import FeaturedProducts from "@/src/components/blog/FeaturedProducts";
import TutorialList from "@/src/components/blog/TutorialList";

export const metadata: Metadata = {
   title: "Tae7labs Dashboard",
   description: "Explore my latest blog posts, tutorials, and alternative products.",
};

export default function BlogIndexPage() {
   return (
      <div className="flex-1 min-w-0 bg-background overflow-y-auto custom-scrollbar">
         <BlogHero />
         <RecentTutorials />
         <FeaturedProducts />
         <TutorialList />
      </div>
   );
}
