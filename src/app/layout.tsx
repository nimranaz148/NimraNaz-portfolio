import type { Metadata } from "next";
import { fontSans, fontDisplay } from "@/lib/fonts";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://nimranaz.dev"),
  title: {
    default: "NIMRA Naz | Full-Stack Developer",
    template: "%s | NIMRA Naz",
  },
  description:
    "Portfolio of NIMRA Naz — a full-stack developer building high-performance web applications with modern technologies.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Developer",
  ],
  authors: [{ name: "NIMRA Naz", url: "https://nimranaz.dev" }],
  creator: "NIMRA Naz",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nimranaz.dev",
    title: "NIMRA Naz | Full-Stack Developer",
    description: "Building digital experiences that matter.",
    siteName: "NIMRA Naz Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "NIMRA Naz | Full-Stack Developer",
    description: "Building digital experiences that matter.",
    creator: "@NazNimranaz148",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontDisplay.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* Skip to main content link (accessibility) */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>

        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
