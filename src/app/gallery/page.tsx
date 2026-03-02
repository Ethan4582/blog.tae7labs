"use client";

import { motion } from "framer-motion";

export default function GalleryPage() {
   return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
         >
            <h1 className="text-6xl font-black text-foreground mb-4 font-serif">Gallery</h1>
            <p className="text-muted-foreground text-lg font-sans">Coming soon. Visual explorations and experiments.</p>
         </motion.div>
      </div>
   );
}
