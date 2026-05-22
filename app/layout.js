import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
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
  title: "Aryan Portfolio",
  description: "Full-Stack Developer Portfolio",
};

export default function RootLayout({ children }) {
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
