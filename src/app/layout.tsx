import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const reckless = localFont({
  src: [
    { path: "../../public/font/RecklessStandardXL-TRIAL-RegularItalic.otf", weight: "400", style: "normal" },
    { path: "../../public/font/RecklessStandardXL-TRIAL-MediumItalic.otf", weight: "500", style: "normal" },
  ],
  variable: "--font-reckless",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lina Ralph",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${reckless.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Navbar />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}