import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const reckless = localFont({
  src: [
    {
      path: "../../public/font/RecklessStandardXL-TRIAL-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/RecklessStandardXL-TRIAL-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
  ],
  variable: "--font-reckless",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const DESCRIPTION =
  "Hypnotherapy with Lina Ralph. Understand the pattern underneath anxiety, overthinking, habits and sleep, and book a free, no-pressure consultation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://lina-ralph.vercel.app"),

  title: {
    default: "Lina Ralph | Hypnotherapist",
    template: "%s | Lina Ralph",
  },

  description: DESCRIPTION,

  openGraph: {
    title: "Lina Ralph | Hypnotherapist",
    description: DESCRIPTION,
    url: "https://lina-ralph.vercel.app",
    siteName: "Lina Ralph",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Lina Ralph | Hypnotherapist",
    description: DESCRIPTION,
  },

  robots: {
    index: true,
    follow: true,
  },
};


export const viewport: Viewport = {
  themeColor: "#2E3C20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${reckless.variable}`}>
      <body className="font-sans antialiased">
        <SmoothScrollProvider>
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}