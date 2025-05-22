import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "instantWebsiteAi - From name to website in 30 seconds",
  description: "AI-powered, human-refined websites for everyone. No builders, no code, no drag-and-drop.",
  keywords: "website builder, AI website, instant website, no-code website, website generator",
  authors: [{ name: "instantWebsiteAi Team" }],
  creator: "instantWebsiteAi",
  publisher: "instantWebsiteAi",
  openGraph: {
    title: "instantWebsiteAi - From name to website in 30 seconds",
    description: "AI-powered, human-refined websites for everyone. No builders, no code, no drag-and-drop.",
    url: "https://instantwebsite.ai",
    siteName: "instantWebsiteAi",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "instantWebsiteAi - From name to website in 30 seconds",
    description: "AI-powered, human-refined websites for everyone. No builders, no code, no drag-and-drop.",
    creator: "@instantWebsiteAi",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.webp" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-950 text-white`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
