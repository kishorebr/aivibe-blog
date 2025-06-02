import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AIVibe - Where AI Meets Everyday Life",
  description: "Your daily dose of AI insights and automation trends that matter. Fresh content curated automatically from trusted sources.",
  keywords: "AI, artificial intelligence, automation, smart home, productivity, daily life, technology, AIVibe",
  authors: [{ name: "AIVibe" }],
  openGraph: {
    title: "AIVibe - Where AI Meets Everyday Life",
    description: "Your daily dose of AI insights and automation trends that matter.",
    url: "https://aivibe.vercel.app",
    siteName: "AIVibe",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIVibe - Where AI Meets Everyday Life",
    description: "Your daily dose of AI insights and automation trends that matter.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
