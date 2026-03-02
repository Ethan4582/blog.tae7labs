import type { Metadata } from "next";
import { Inter, Libre_Baskerville, Roboto_Slab } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/src/components/LenisProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-libre-baskerville",
  display: "swap",
});

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  variable: "--font-roboto-slab",
  display: "swap",
});

import Navbar from "@/src/components/Navbar";

export const metadata: Metadata = {
  title: "Tae7labs Dashboard",
  description: "Explore beautifully crafted components and patterns by Tae7labs.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${libreBaskerville.variable} ${robotoSlab.variable}`}>
      <body className="antialiased font-sans">
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
