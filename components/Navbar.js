"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { FiMenu, FiX } from "react-icons/fi";

// 🔥 Disable SSR for ThemeToggle (fix hydration issue)
const ThemeToggle = dynamic(() => import("./ThemeToggle"), {
  ssr: false,
});

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeUrl, setResumeUrl] = useState("");

  // Fetch resume URL
  useEffect(() => {
    const loadResume = async () => {
      try {
        const res = await fetch("/api/resume", {
          cache: "no-store",
        });
        const data = await res.json();
        if (data.success && data.data?.fileUrl) {
          setResumeUrl(data.data.fileUrl);
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadResume();
  }, []);

  // Custom download function with proper filename
  const downloadResume = async (url, fileName) => {
    if (!url) return;
    
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      
      const link = document.createElement("a");
      const blobUrl = URL.createObjectURL(blob);
      link.href = blobUrl;
      link.download = fileName || "Aryan-Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // 🔥 Active section on scroll & navbar background change
  useEffect(() => {
    const sections = document.querySelectorAll("section");

    const handleScroll = () => {
      let current = "home";

      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100;

        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      setActive(current);
      
      // Change navbar background on scroll
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? "backdrop-blur-xl bg-white/80 dark:bg-black/80 border-b border-gray-200 dark:border-gray-800 shadow-lg" 
          : "backdrop-blur-md bg-white/60 dark:bg-black/40 border-b border-black/10 dark:border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex justify-between items-center py-4">
          
          {/* LOGO - Premium Version */}
          <a href="#home" className="flex items-center gap-2 group">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                        flex items-center justify-center shadow-lg shadow-purple-500/25
                        group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300"
            >
              <span className="text-white text-sm font-bold">A</span>
            </motion.div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 
                             bg-clip-text text-transparent leading-tight">
                Aryan
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block -mt-1">
                Developer
              </span>
            </div>
          </a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="relative px-4 py-2 text-sm font-medium rounded-xl
                           transition-all duration-300
                           hover:text-purple-500 dark:hover:text-purple-400
                           hover:bg-purple-50 dark:hover:bg-purple-500/10"
              >
                {link.label}
                {/* Animated underline */}
                {active === link.id && (
                  <motion.span
                    layoutId="activeUnderline"
                    className="absolute left-4 right-4 -bottom-0.5 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    exit={{ opacity: 0, scaleX: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                )}
              </a>
            ))}

            {/* Resume Button - Premium with custom download */}
            <motion.button
              onClick={() => downloadResume(resumeUrl, "Aryan-Resume.pdf")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-5 py-2 rounded-xl font-medium text-sm
                         bg-gradient-to-r from-purple-600 to-blue-600 
                         hover:from-purple-700 hover:to-blue-700
                         text-white shadow-md shadow-purple-500/25
                         hover:shadow-lg hover:shadow-purple-500/40
                         transition-all duration-300 cursor-pointer"
            >
              Resume
            </motion.button>

            {/* 🌗 Theme Toggle */}
            <div className="ml-2">
              <ThemeToggle />
            </div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            
            <motion.button 
              onClick={() => setMenuOpen(!menuOpen)} 
              whileTap={{ scale: 0.95 }}
              className="relative w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10
                         flex items-center justify-center text-xl
                         border border-gray-200 dark:border-gray-700
                         hover:bg-purple-500/20 transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {menuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU - Premium Version */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-5 py-6 space-y-3 bg-white/95 dark:bg-black/95 backdrop-blur-xl">
{navLinks.map((link, index) => (
  <motion.button
    key={link.id}
    type="button"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05 }}
    onClick={() => {
      setMenuOpen(false);
      setActive(link.id);

      setTimeout(() => {
        const element = document.getElementById(link.id);

        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 200);
    }}
    className={`relative block w-full text-left px-4 py-3 text-base font-medium rounded-xl
               transition-all duration-300
               ${active === link.id 
                 ? "bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-purple-600 dark:text-purple-400" 
                 : "hover:bg-gray-100 dark:hover:bg-white/5"
               }`}
  >
    {link.label}

    {active === link.id && (
      <motion.div
        layoutId="mobileActiveBg"
        className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    )}
  </motion.button>
))}
              
              {/* Mobile Resume Button - with custom download */}
              <motion.button
                onClick={() => {
                  downloadResume(resumeUrl, "Aryan-Resume.pdf");
                  setMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="block w-full px-4 py-3 rounded-xl font-medium text-center
                           bg-gradient-to-r from-purple-600 to-blue-600 
                           text-white shadow-md cursor-pointer"
              >
                Download Resume
              </motion.button>
            </div>
          </motion.div>
        )}  
      </AnimatePresence>
    </motion.nav>
  );
}