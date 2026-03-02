"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import clsx from "clsx";

export default function ThemeToggle() {
   const [theme, setTheme] = useState<"light" | "dark">("dark");

   useEffect(() => {
      // Check initial preference from localStorage or default to dark
      const stored = localStorage.getItem("theme") as "light" | "dark" | null;
      const initial = stored || "dark";
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
   }, []);

   const toggleTheme = () => {
      const next = theme === "dark" ? "light" : "dark";
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
   };

   return (
      <button
         onClick={toggleTheme}
         className={clsx(
            "relative w-[56px] h-[30px] rounded-full p-1 transition-all duration-300 flex items-center cursor-pointer border shadow-inner",
            theme === "dark"
               ? "bg-primary/20 border-primary/30"
               : "bg-black/10 border-black/10 hover:bg-black/15"
         )}
         aria-label="Toggle theme"
      >
         <motion.div
            animate={{ x: theme === "dark" ? 26 : 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className={clsx(
               "w-[20px] h-[20px] rounded-full flex items-center justify-center transition-colors shadow-md border",
               theme === "dark"
                  ? "bg-primary text-primary-foreground border-transparent"
                  : "bg-white text-foreground border-black/5"
            )}
         >
            {theme === "dark" ? (
               <Moon className="w-3 h-3" />
            ) : (
               <Sun className="w-3 h-3 stroke-[2.5]" />
            )}
         </motion.div>
      </button>
   );
}
