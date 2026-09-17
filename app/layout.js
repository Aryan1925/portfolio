import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import IntroLoader from "@/components/IntroLoaderClient";
import { siteConfig, buildPersonJsonLd, buildWebsiteJsonLd } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.nameShort} — ${siteConfig.role}`,
  },
  description: siteConfig.description,
  applicationName: `${siteConfig.name} Portfolio`,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: `${siteConfig.name} Portfolio`,
    title: siteConfig.title,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.image,
        width: 1122,
        height: 1182,
        alt: siteConfig.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.image],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "ESNsd5DkfwK0Fm7vNKRrocOBDkM8-XlOlEaiWA2dok4",
  },
  category: "technology",
};

export default function RootLayout({ children }) {
  const jsonLd = [buildPersonJsonLd(), buildWebsiteJsonLd()];

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const savedTheme = localStorage.getItem('theme');
                  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </head>
      <body
        className="bg-white dark:bg-black
              text-black dark:text-white
               transition-colors duration-300
                    overflow-x-hidden"
      >

{/* WORKING GLOW - Fixed z-index */}
<div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
  
  {/* PURPLE GLOW - Top Left */}
  <div
    className="absolute top-[-200px] left-[-200px] w-[800px] h-[800px] rounded-full
               bg-purple-600/20 dark:bg-purple-500/20 blur-[120px] animate-pulse-slow"
  />

  {/* BLUE GLOW - Bottom Right */}
  <div
    className="absolute bottom-[-250px] right-[-200px] w-[800px] h-[800px] rounded-full
               bg-blue-600/15 dark:bg-blue-500/20 blur-[120px] animate-pulse-slow"
    style={{ animationDelay: '2s' }}
  />

  {/* PINK GLOW - Center */}
  <div
    className="absolute top-[30%] left-[25%] w-[600px] h-[600px] rounded-full
               bg-pink-500/20 dark:bg-pink-400/30 blur-[100px] animate-pulse-slow"
    style={{ animationDelay: '4s' }}
  />
  
  {/* CYAN GLOW - Additional pop */}
  <div
    className="absolute top-[60%] right-[20%] w-[500px] h-[500px] rounded-full
               bg-cyan-500/15 dark:bg-cyan-400/25 blur-[100px] animate-pulse-slow"
    style={{ animationDelay: '1s' }}
  />
</div>
        {children}

        {/* Static splash — always in server HTML so the Hero never flashes */}
        <div id="init-splash" className="fixed inset-0 z-[999] bg-black pointer-events-none" />

        <IntroLoader />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#111",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}