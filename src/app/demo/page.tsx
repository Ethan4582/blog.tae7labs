"use client";

import { motion } from "framer-motion";

export default function DemoPage() {
   return (
      <div className="flex-1 min-h-screen flex items-center justify-center bg-background px-10">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
         >
            <h1 className="text-6xl font-black text-foreground mb-4 font-serif">Demos</h1>
            <p className="text-muted-foreground text-lg font-sans">Coming soon. Interactive demonstrations and prototypes.</p>
         </motion.div>
      </div>
   );
}
