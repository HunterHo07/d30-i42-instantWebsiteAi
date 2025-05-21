import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import Notification from "@/components/common/Notification";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { AppProvider } from "@/lib/AppContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata = {
  title: "instantWebsiteAi - Instant Websites, Zero Effort",
  description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop. Just enter your business name and logo, and instantly see your site on a free subdomain.",
  keywords: "website builder, instant website, AI website, no-code website, quick website",
  authors: [{ name: "instantWebsiteAi Team" }],
  creator: "instantWebsiteAi",
  publisher: "instantWebsiteAi",
  openGraph: {
    title: "instantWebsiteAi - Instant Websites, Zero Effort",
    description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop.",
    url: "https://instantwebsite.ai",
    siteName: "instantWebsiteAi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "instantWebsiteAi",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "instantWebsiteAi - Instant Websites, Zero Effort",
    description: "Launch a polished, functional website in seconds—no learning curve, no building, no drag-and-drop.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} font-sans antialiased`}
      >
        <AppProvider>
          <Notification />
          <LoadingSpinner fullScreen message="Processing your request..." />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
