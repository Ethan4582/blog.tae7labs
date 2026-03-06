import LandingPageSidebar from "@/src/components/navbar/LandingPageSidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
   title: "Landing Page Templates | Tae7labs",
   description: "Explore free and premium landing page templates.",
};

export default function LandingPagesLayout({ children }: { children: React.ReactNode }) {
   return (
      <div className="min-h-screen bg-background text-foreground">
         <div className="flex pt-[65px]">
            {/* Left sidebar configured specifically for landing pages */}
            <LandingPageSidebar />
            {/* Main content area */}
            <main className="flex flex-1 min-w-0">
               {children}
            </main>
         </div>
      </div>
   );
}
